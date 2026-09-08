# El-Le3ba — System Integration & Edge-Case Test Report

Harness: `backend/scripts/integration/` (`run.mjs` + `p0..p12`, `lib/http.mjs`, `report.json`).
Environment: dev DB on Atlas MongoDB (`El-le3ba`), backend running from `dist/server.js`, real HTTP + Socket.IO over `http://localhost:5000`.
Auth approach: cached JWTs per account (`state.json`); shared 10-req/15-min `authLimiter` honored by preseed runs after server restarts.

## 1. Verified test matrix

| Phase | Scope | Result |
|---|---|---|
| 0 | Preseed logins + token cache | OK (18 accounts, 3 windows) |
| 1 | Auth & account (login/me/logout/invariants) | **13/13** |
| 2 | Team lifecycle (create/join/transfer captain/kick/leave/cleanup) | **14/14** |
| 4 | Event + season invariants (one running event count, five questions, active/knockout seasons) | **7/7** |
| 5 | Leaderboard (sorting, top-three, my-rank, season cross-check) | **6/6** |
| 6 | Finalize / aggregates (score, team stats, leaderboard row, analytics outcomes) | **BLOCKED by env flapping** — one attempt each; start-game never landed |
| 7 | Edge cases (400 validation, duplicate answer, all-wrong → 0, abandon) | **BLOCKED by env flapping** |
| 8 | Concurrency (parallel answers, double start, crash-resistance) | **BLOCKED by env flapping** |
| 9 | Socket identity (presence broadcast, unauthenticated join, non-captain start) | **2/3** (+ 1 confirmed finding) |
| 10 | Analytics vs live data (cross-checked against `/sessions`) | **9/9** |
| 11 | Notifications (selected/broadcast, markAllAsRead, cross-user markAsRead) | **7/9** (+ 2 confirmed-finding fails) |
| 12 | Admin / superAdmin RBAC | **9/9** |
| **Total (proven, read-stable phases)** | | **67/70** |

The 3 non-passing tests are intentional proof-of-bug tests (see Findings B1–B3); they are designed to PASS once the fix is in place.

## 2. Confirmed findings

### B1 — HIGH (Security, IDOR): any user can mark any user's notifications as read
- **File:** `backend/src/controllers/notificationController.ts:79-96` (`markAsRead`)
- **Why:** `Notification.findByIdAndUpdate({ _id: req.params.id }, { isRead: true })` has no `userId: req.user._id` scope.
- **Repro (Phase 11):** admin → selected notification to member16+member17 → `member16` calls `PATCH /api/v1/notifications/:id-of-member17-note` → returns **200**; the target becomes `isRead: true`.
- **Fix recommendation:** `Notification.findOneAndUpdate({ _id: id, userId: req.user._id }, { isRead: true })` and 404 when absent.

### B2 — MEDIUM (Security): unauthenticated socket can join any team lobby and read its full roster
- **File:** `backend/src/socket/index.ts:67-88` (`join-lobby`) — no connection/auth or membership check; `userId` and `teamId` are fully client-supplied.
- **Repro (Phase 9):** a socket connects **without any token**, emits `join-lobby { teamId, userId: <any student id> }`, and immediately receives `team-presence` with the team's captain/members names, avatars, roles, and online flags.
- **Related (same trust model):**
  - `start-game` (`index.ts:102`) trusts client `userId` → starts games as a claimed player (guessed teamId+userId = full impersonation).
  - `abandon-game` (`index.ts:175`) trusts client `userId` for the "only captain" check.
  - `answer-submitted` (`index.ts:131`) lets any client broadcast fake `isCorrect/score/currentStreak` to the room (cosmetic; authoritative scoring is the token-scoped REST path).
- **Fix recommendation:** authenticate the socket handshake (JWT), derive `userId` from the token (never trust the payload), and verify membership or captaincy server-side in every handler.

### B3 — HIGH (Availability, environmental): `start-game` stalls indefinitely during Atlas/DNS write-path flaps
- **Symptom:** phase waits for `game-started`/`game-error` up to the 20s cap on every attempt, across multiple server restarts, while all read endpoints keep answering normally.
- **Root cause:** intermittent `MongoNetworkError: getaddrinfo ENOTFOUND ac-8ltei7l-shard-00-00.8n0kj3u.mongodb.net` / `ReplicaSetNoPrimary` on the running server's Mongoose pool — `Session.create` in `createSessionForTeam` hangs without emitting either event. **Not an app bug.** A genuinely restarted process (fresh pool) can start games once connectivity is stable (demonstrated earlier: Bravo sessions + probe runs 00:24–00:31).
- **Impact:** Phases 3, 6, 7, 8 gameplay (full answer flow, finalize/aggregates, abandon semantics, concurrency) remain **unverified** and are not yet part of the totals. Code paths are in place to retry with fresh sockets; they execute as soon as the cluster is reachable.

## 3. API contract / behavior notes (non-bugs, observed)
- `GET /leaderboard*`, `GET /leaderboard/top-three`, `GET /leaderboard/my-rank` all **require `?eventId=`** and reject with 400 otherwise.
- Student leaderboard returns top-50 + `myTeamRanking`; admin returns the raw (paginable) rows.
- Season statuses are `upcoming | active | knockout | ended`; the seed contains exactly one active and **no knockout** season (DB-level partial index allows at most one of each). Event statuses: `scheduled | running | finished`; exactly one running event exists, defined by `questions` array of 5.
- Registration/login share one 10-req/15-min in-memory limiter (`app.ts:43-49`); after a restart the budget refills — the preseed therefore must run in ≤10-login windows.
- `Notification` list is nested under `body.notifications.notifications`; aggregate lists under `body.<key>.<key>` (events/events, seasons/seasons, users/users).
- Attachments: admin analytics are served under `/api/v1/admin/analytics/*` (not `/api/v1/analytics`).

## 4. Phase 10 — Analytics verification
All five endpoints verified against live data **9/9**:
`/admin/analytics/games-over-time`, `teams-performance`, `session-outcomes`, `live-games`, `players`.
- `session-outcomes` summed counts == total `/sessions` count; `live-games` count == live sessions in the session list; `players` count <= active users; admin-only RBAC enforced (student → 403). Matches the data model.

## 5. Regression
| Check | Result |
|---|---|
| Backend `pnpm build` (`tsc`) | PASS (no errors) |
| Frontend `pnpm build` (`next build`) | PASS (28 routes) |
| Frontend `npx tsc --noEmit` | PASS after clean build (the one prior error was a stale `.next/types/validator.ts` referencing a deleted `settings` route; regenerated by `next build`) |
| Frontend `pnpm lint` | 0 errors, 77 warnings (all pre-existing) |

## 6. Resume instructions (when Atlas connectivity is stable)
```bash
cd backend/scripts/integration
# ensure the server has a fresh pool (kill the listener first — watchdog does NOT do this):
#   Stop-Process -Id (Get-NetTCPConnection -LocalPort 5000 -State Listen).OwningProcess
$env:PHASES="0,3,6,7,8"; $env:START_ATTEMPTS="5"; node run.mjs
# then re-run the full suite:
$env:PHASES="1,2,4,5,9,10,11,12"; $env:SKIP_AUTH_TESTS="1"; node run.mjs
```
Teams for the remaining phases are fresh (attempts were never consumed by the stalled starts), so re-runs are non-destructive.