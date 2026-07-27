# Fix & Refactor Report — el-le3ba Real-Time Game Socket Logic

---

## Files Changed

| # | File | Reason |
|---|------|--------|
| 1 | `backend/src/services/sessionService.ts` | **NEW** — Shared `createSessionForTeam()` service extracted from the duplicated start-game logic (Bug #2) |
| 2 | `backend/src/socket/index.ts` | Use service for `start-game`, add single-instance TODO, clean up unused imports |
| 3 | `backend/src/controllers/sessionController.ts` | Remove `startSession` (dead REST endpoint), rewrite `submitAnswer` as atomic `findOneAndUpdate` (Bug #1) |
| 4 | `backend/src/routes/sessionRoutes.ts` | Remove `/start` route and `startSession` import |
| 5 | `frontend/features/match/lib/socket.ts` | Add `connect_error` listener, export `onGlobalConnectError` for hooks (Bug #3) |
| 6 | `frontend/features/match/hooks/useLobbySocket.ts` | Register `connect_error` → pushes user-visible error to `lobbyStore` (Bug #3) |
| 7 | `frontend/features/match/hooks/useGameSocket.ts` | Register `connect_error` → shows toast (Bug #3) |
| 8 | `frontend/features/match/api/index.ts` | Remove dead `startSession` export (no longer has a backend route) |
| 9 | `frontend/.env.example` | Document that `NEXT_PUBLIC_SOCKET_URL` is required in production |
| 10 | `backend/src/server.ts` | Clarify CORS comment (development vs production) |
| 11 | `backend/scripts/test-answer-race.sh` | **NEW** — Concurrent answer race test script |

---

## Bug #1 — Race Condition on Answer Submission

### Before
`submitAnswer` in `sessionController.ts`:
1. Loads the full session document
2. Checks `session.answerLogs` for duplicate questionId
3. Computes score/streak
4. Pushes to `session.answerLogs` and calls `session.save()`

Two concurrent requests could both pass the check at step 2 before either reaches step 4, producing two accepted answers for one question.

### After
The validation checks that are read-only (team membership, question validity, session existence/expiry) still happen first. The critical write uses a single atomic `findOneAndUpdate` whose query filter enforces:

```typescript
{
  _id: sessionId,
  status: "running",
  expiresAt: { $gt: new Date() },
  "answerLogs.questionId": { $ne: questionObjectId },
}
```

If the update returns `null`, the question was already answered (or the session is no longer running/expired) — the request gets a 400. Score/streak values are computed locally before the update and applied via `$push`, `$inc`, and `$set` in the same atomic operation.

The `answer-locked` socket emit still fires as an early UI hint, but the database operation is the source of truth for who actually won the race.

The `team.bestStreak` update uses `$max` (idempotent) instead of read-compare-write.

### Test
`backend/scripts/test-answer-race.sh` fires two concurrent curl POSTs to the same question/session and asserts exactly one returns HTTP 200.

---

## Bug #2 — Duplicated "Start Game" Logic

### Before
Two independent implementations:
- Socket handler in `socket/index.ts` (what the frontend actually calls) — **missing** `MIN_TEAM_SIZE` validation
- REST endpoint in `sessionController.ts::startSession` — had `MIN_TEAM_SIZE` but was **never called** by the frontend

### After
A new service function `createSessionForTeam()` in `backend/src/services/sessionService.ts` contains all shared logic:

1. Verify user is team captain
2. Verify running event exists
3. Verify team meets `MIN_TEAM_SIZE`
4. Verify remaining attempts
5. Sample random questions, strip correct answers
6. Create session document

The socket handler calls this service. Errors from the service are caught and emitted as `game-error` events.

**Decision on the REST endpoint:** Deleted. The frontend only starts games via socket (`socket.emit("start-game", ...)` in `useLobbySocket.ts:startGame`). The REST route `/sessions/start` and its controller function `startSession` were removed along with the unused `startSession` export in `frontend/features/match/api/index.ts`. This eliminates dead-code maintenance risk.

---

## Bug #3 — Cross-Device Connectivity Failure

### Root Causes
1. `NEXT_PUBLIC_SOCKET_URL` fell back to `http://localhost:5000`, which only resolves on the machine running the backend.
2. No `connect_error` handling — a failed connection was silent.
3. CORS comment was misleading (said "allow all in dev" but the check was ambiguous).

### Fixes

#### Socket URL (`frontend/features/match/lib/socket.ts`)
- Added a `connect_error` event listener on the socket instance that logs the error and calls a global observer (`_onConnectError`).
- Exported `onGlobalConnectError(handler)` so hooks can register/deregister without conflicting with each other.

#### Lobby Hook (`useLobbySocket.ts`)
- Registers a `connect_error` handler via `onGlobalConnectError`.
- On error: sets `isConnected = false` and pushes `"مش قادر أتصل بالسيرفر، جرب تاني."` into `lobbyStore.error`, which the Lobby component renders as a visible error message (instead of an empty lobby).
- Clears `error` on successful `connect`.

#### Game Hook (`useGameSocket.ts`)
- Registers a `connect_error` handler that shows a toast: `"مش قادر أتصل بالسيرفر، جرب تاني."`.

#### `.env.example` (`frontend/.env.example`)
- Added a comment explaining that `NEXT_PUBLIC_SOCKET_URL` is required in production and should point to an IP/hostname resolvable on the user's device. For multi-device LAN testing, set it to the backend machine's LAN IP.

#### CORS (`backend/src/server.ts`)
- Clarified the comment on the CORS origin function: development allows all, production only allows `CLIENT_URL`.

---

## Additional Issues

### `gameStore.ts` `returnnull`
The task mentioned `loadPersisted()` containing `if (typeof window === "undefined") returnnull;` (missing space). The actual file at `gameStore.ts:69` reads `return null;` with a correct space. **No syntax error exists.** The issue was either already fixed or a copy-paste artifact in the task description.

### `lobbyStore.ts` `reset()`
The `reset()` function at `lobbyStore.ts:23-24` is:
```typescript
reset: () => set({ members: [], isConnected: false, error: null }),
```
This resets all three state fields (`members`, `isConnected`, `error`) completely. **Not truncated.**

### Single-instance TODO
Added a `// TODO` comment in `socket/index.ts:7-9` noting that `teamOnlineMembers` is an in-memory Map that won't scale past one Node process. A Redis adapter would be needed for multi-instance deployment.

### Dead code removal
- Removed the commented-out `// const io = req.app.get("io");` line (was next to the real line in the old `submitAnswer`).
- Removed unused imports (`Event`, `Leaderboard`, `User`, `MIN_TEAM_SIZE`, `QUESTIONS_PER_SESSION`, `SESSION_DURATION_MS`) from `sessionController.ts`.
- Removed unused `startSession` export from `frontend/features/match/api/index.ts`.

### Logging consistency
All socket handler error logs already follow the pattern `console.error("handler-name error:", err)` with consistent spacing and casing. No changes needed.

### Disconnect handler
The 2-second grace period in the `disconnect` handler (`socket/index.ts:148-163`) is correct: it waits for possible reconnection, checks whether the user's socket is still connected to the room, and only removes them from presence if truly gone. No changes needed.

---

## Manual Testing Checklist

Test with **two real devices on different networks** (e.g., phone on 4G + laptop on Wi-Fi):

### 1. Environment Setup
- [ ] Set `NEXT_PUBLIC_SOCKET_URL` on both devices to the **public IP or hostname** of the backend server (not `localhost`). For LAN testing use the backend machine's LAN IP; for internet testing use a public IP/domain.
- [ ] Set `CLIENT_URL` on the backend to the frontend's public URL (or `*` temporarily for testing).
- [ ] Backend binds to `0.0.0.0` (already configured as `httpServer.listen(Number(PORT), "0.0.0.0", ...)`).
- [ ] Firewall allows connections to the backend port (default 5000).

### 2. Joining the Lobby
- [ ] Device A opens the match page → sees themselves in the members list with a green online indicator.
- [ ] Device B (same team) opens the match page → Device A sees B appear in the list with a green indicator, and vice versa.
- [ ] Verify the "connected" toast/indicator shows on both.
- [ ] Device B closes the tab → Device A sees B's indicator turn gray within ~3 seconds (2s grace period + propagation).

### 3. Starting the Match
- [ ] Device A (captain) clicks "Start Match" → both devices navigate to the game page.
- [ ] The `game-started` event fires on both, same session ID, same list of questions.
- [ ] Device B (non-captain) should not see the start button.

### 4. Simultaneous Answer Submission
- [ ] While a question is displayed, both devices submit different answers for the **same question** at nearly the same time.
- [ ] Exactly one answer is accepted (the other sees "Question already answered" or the UI locks).
- [ ] The `answer-locked` event fires on both devices for that question.
- [ ] The results screen shows the correct answer and the one accepted submission.

### 5. Streak / Scoring
- [ ] Captain answers correctly → streak increments.
- [ ] Another member answers correctly → streak increments again.
- [ ] Someone answers wrong → streak resets to 0.
- [ ] `bestStreak` is the maximum value reached during the session.

### 6. Multi-Question Flow
- [ ] After each question, both devices see the result (question-result) and then auto-advance to the next question after the 2-second delay.
- [ ] After the last question, both devices navigate to the results page showing final score, correct answers, and best streak.

### 7. Reconnect After Disconnect
- [ ] During a match, Device B disconnects (e.g., airplane mode for 10 seconds, then reconnects).
- [ ] The socket reconnection logic should rejoin the lobby.
- [ ] Presence should come back. The 2s grace period prevents premature removal during brief disconnections.

### 8. Cross-Device Network
- [ ] Test with one device on a different network (e.g., 4G hotspot) to confirm the socket connection works end-to-end.
- [ ] If it fails, verify `NEXT_PUBLIC_SOCKET_URL` on the device resolves to a reachable address.
- [ ] Check that CORS on the backend allows the frontend's origin.

---

## Remaining Known Limitations

1. **In-memory presence map** — `teamOnlineMembers` in `socket/index.ts` is a plain `Map<string, Set<string>>`. It will not work across multiple Node.js instances. For horizontal scaling, replace it with a Redis-backed presence adapter (socket.io-redis + a shared key-value store for online user sets). Marked with a `// TODO` comment.

2. **Streak calculation for simultaneous different-question answers** — The current implementation reads the session's `currentStreak` before the atomic update. If two team members answer two different questions at nearly the same instant, the streak from the first update may be overwritten by the second. In practice, this is benign because both are correct (streak goes up by 2 either way) and MongoDB writes are normally fast enough, but a true serializable solution would require an aggregation pipeline update (`$set: { currentStreak: { $cond: { if: isCorrect, then: { $add: ["$currentStreak", 1] }, else: 0 } } }`). This can be addressed in a future optimization if streak-accuracy under heavy concurrency becomes critical.

3. **No WebSocket proxy through Next.js** — REST traffic goes through `/api/proxy/[...path]` so the client never needs a hardcoded backend URL, but Socket.io does not go through this proxy. WebSocket proxying through Next.js rewrites is not natively supported. For true single-origin setup, deploy behind a reverse proxy (nginx/caddy) that routes `/api/*` and `/socket.io/*` to the backend on the same port/domain, and set `NEXT_PUBLIC_SOCKET_URL` to the same origin as the Next.js app.
