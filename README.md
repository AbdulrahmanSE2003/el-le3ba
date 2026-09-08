# 🎮 El-Le3ba (اللعبة)

A competitive university quiz application for **Borg El-Arab Technological University (BATU)** students. Teams compete in real-time ranked trivia matches with live leaderboards, event-based competition cycles (seasons → events → matches), and full admin/super-admin dashboards.

---

## 📁 Project Structure

The project is **two separate applications** living in one repository:

```
el-le3ba/
├── frontend/          # Next.js 16 App Router + TypeScript (client UI)
├── backend/           # Express 5 + TypeScript + MongoDB (REST + Socket.IO API)
└── README.md
```

Each app is its own `package.json` / pnpm workspace. There is **no shared root workspace** — this is not an actual pnpm monorepo, just two independent apps in a single repo. Install and run each app separately (see [Getting Started](#-getting-started)).

---

## 🎨 Frontend

### Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 16** | React framework (App Router) |
| **React 19** | UI library |
| **TypeScript** | Language |
| **Tailwind CSS 4** | Styling |
| **shadcn/ui** (Radix) | UI component library |
| **Framer Motion** | Animations |
| **Zustand** | State management (persist middleware) |
| **Zod** | Schema validation |
| **React Hook Form** | Form handling |
| **Axios** | HTTP client |
| **Socket.IO Client** | Real-time communication (lobby + gameplay) |
| **Sonner** | Toast notifications |
| **next-themes** | Dark/light theme |
| **Vaul** | Drawer component |
| **Playpen Sans + Zain** | Arabic typography |

### Folder Structure

```
frontend/
├── app/                            # Next.js App Router
│   ├── layout.tsx                  # Root layout (fonts, providers, RTL)
│   ├── page.tsx                    # Landing/marketing page
│   ├── globals.css                 # Tailwind v4 + design tokens
│   ├── loading.tsx / not-found.tsx / error.tsx
│   │
│   ├── (auth)/                     # Unauthenticated
│   │   ├── login/ register/ forgot-password/ reset-password/[token]/
│   │   └── select-avatar/
│   │
│   ├── (app)/                      # Authenticated student area
│   │   ├── dashboard/ match/ team/ leaderboard/ profile/
│   │   └── layout.tsx
│   │
│   ├── (game)/                     # Game session routes
│   │   ├── game/[sessionId]/
│   │   ├── result/[sessionId]/
│   │   └── layout.tsx
│   │
│   ├── (admin)/                    # Admin dashboard
│   │   ├── admin/{dashboard,users,teams,seasons,events,sessions,
│   │   │          leaderboard,notifications,questions,profile}/
│   │   └── layout.tsx
│   │
│   ├── (superAdmin)/               # Super-admin dashboard
│   │   ├── super-admin/{dashboard,admins,logs,settings,profile}/
│   │   └── layout.tsx
│   │
│   ├── api/proxy/[...path]/        # Edge proxy → backend (injects JWT cookie)
│   ├── about/ privacy/ support/ terms/   # Static pages
│   │
│   └── (auth|app|admin|superAdmin|game)/layout.tsx  # Role-scoped layouts
│
├── components/
│   ├── ui/                         # shadcn/ui primitives
│   ├── shared/                     # Shared app components
│   └── sidebar/                    # App/Admin/SuperAdmin sidebars
│
├── features/                       # Feature-based modules
│   ├── auth/  select-avatar/  dashboard/  team/
│   ├── match/                      # Game/lobby: socket lib, hooks, store, UI
│   ├── leaderboard/  profile/  audio/
│   ├── admin/                      # Admin components, actions, schemas, api
│   └── super-admin/                # Super-admin components, api, schemas
│
├── store/                          # Zustand stores
│   ├── userStore.ts                # User state (persisted, cookie-based auth)
│   └── storeInitializer.ts         # Server → client hydration
│
├── hooks/  lib/  shared/           # Global hooks, utilities, API layer
├── proxy.ts                        # Next.js middleware (auth guards)
└── public/                         # Static assets (avatars, images, sounds)
```

### Design System

| Token | Value | Usage |
|---|---|---|
| **Primary** | `#5B5FEF` | Buttons, highlights, active states |
| **Accent** | `#FFD23F` | Points, badges, rewards |
| **Success** | `#2DC653` | Correct answers, success states |
| **Danger** | `#FF4757` | Wrong answers, errors |
| **Surface** | `#F5F5FF` | Page background |
| **Dark** | `#1A1A2E` | Text, dark elements |
| **Border** | `#E2E2F0` | Card borders |

### Screens

1. **Landing Page** — Marketing page with Hero, Features, CTA
2. **Login / Register** — Authentication with JWT (httpOnly cookie)
3. **Select Avatar** — First-time avatar pick after registration
4. **Dashboard** — Current event, team snapshot, leaderboard preview, notifications
5. **Match Lobby** — Team presence + captain starts the game (real-time)
6. **Game** — Question screen with timer ring, options/free-text answers, live score/streak (Socket.IO)
7. **Results** — Score summary after session ends
8. **Leaderboard** — Full rankings + podium (event/season)
9. **Profile** — User stats, password/name management
10. **Team** — Team details, members, captain actions, game history, stats
11. **Admin Dashboard** — Manage users, teams, seasons, events, questions, sessions, notifications, leaderboard
12. **Super-Admin** — Admins, audit logs, settings

### Getting Started

```bash
cd frontend
pnpm install
pnpm dev
# Open http://localhost:3000
```

---

## ⚙️ Backend

### Tech Stack

| Technology | Purpose |
|---|---|
| **Node.js** | Runtime |
| **Express 5** | HTTP framework |
| **TypeScript** | Language |
| **MongoDB + Mongoose** | Database & ODM |
| **Socket.IO** | Real-time WebSocket |
| **JWT (jsonwebtoken)** | Authentication (httpOnly cookie + Bearer) |
| **bcryptjs** | Password hashing |
| **helmet** | Security headers |
| **express-rate-limit** | Rate limiting |
| **cookie-parser** | Cookie parsing |
| **hpp** | HTTP parameter pollution protection |
| **nodemailer + Resend** | Email service |

Background work uses **interval-based jobs** (`setInterval`) — there is **no `node-cron`** dependency.

### Folder Structure

```
backend/
├── src/
│   ├── server.ts                    # Entry: HTTP + Socket.IO + DB connection + jobs
│   ├── app.ts                       # Express setup (middleware order, route mounts)
│   ├── constants.ts                 # Game constants (scores, session length, avatars)
│   │
│   ├── config/
│   │   ├── db.ts                    # MongoDB connection
│   │   └── cors.ts                  # CORS configuration
│   │
│   ├── controllers/                 # Route handlers (business rules live here)
│   │   ├── authController.ts        # Signup, login, JWT, password reset, protect/restrictTo
│   │   ├── userController.ts        # Profile, change password, delete account
│   │   ├── teamController.ts        # Create/join/leave teams, captain operations
│   │   ├── seasonController.ts      # Season lifecycle + season leaderboard
│   │   ├── eventController.ts       # Event lifecycle (single-running invariant)
│   │   ├── sessionController.ts     # Answer submission, results, abandon
│   │   ├── questionController.ts    # Question CRUD, bulk create/delete, stats/meta
│   │   ├── leaderboardController.ts # Event leaderboard, top three, my rank
│   │   ├── notificationController.ts # Notifications send/read
│   │   ├── adminController.ts       # Admin dashboards, user/team management
│   │   ├── superAdminController.ts  # Super-admin: admins, app stats
│   │   └── logsController.ts        # Audit log queries
│   │
│   ├── models/                      # 11 Mongoose models
│   │   ├── userModel.ts  teamModel.ts  teamMembershipModel.ts
│   │   ├── seasonModel.ts  eventModel.ts  questionModel.ts
│   │   ├── sessionModel.ts  leaderboardModel.ts
│   │   ├── notificationModel.ts  NotificationCampaignModel.ts  AuditLogModel.ts
│   │
│   ├── routes/                      # 11 routers, all mounted under /api/v1
│   │   ├── userRoutes.ts  teamRoutes.ts  seasonRoutes.ts  eventRoutes.ts
│   │   ├── sessionRoutes.ts  questionRoutes.ts  leaderboardRoutes.ts
│   │   ├── notificationRoutes.ts  adminRoutes.ts  superAdminRoutes.ts
│   │   └── logsRoutes.ts
│   │
│   ├── middleware/
│   │   ├── errorMiddleware.ts       # Global error handler (Cast/dedup/validation/JWT)
│   │   └── sanitize.ts              # NoSQL-injection key stripping (custom)
│   │
│   ├── services/
│   │   └── sessionService.ts        # Shared session-creation logic for Socket.IO
│   │
│   ├── socket/
│   │   └── index.ts                 # Socket.IO events (lobby, presence, game start/end)
│   │
│   ├── jobs/
│   │   ├── sessionExpiry.ts         # Finalizes expired running sessions (every 60s)
│   │   ├── eventStatus.ts           # scheduled→running→finished (every 5 min)
│   │   └── seasonStatus.ts          # upcoming→active→knockout→ended (every 5 min)
│   │
│   ├── types/
│   │   └── express.d.ts             # Express Request augmentation
│   │
│   └── utils/
│       ├── appError.ts  catchAsync.ts  resHandler.ts  APIFeatures.ts
│       ├── factory.ts               # Generic CRUD factory
│       ├── finalizeSession.ts       # Session finalization + aggregate updates
│       ├── AuditLog.ts              # Audit logging helper
│       ├── sendEmail.ts             # Arabic email templates (Resend/Mailtrap)
│       ├── timing.ts  utils.ts
│
├── scripts/                         # Dev-only tooling
│   ├── seasonMigration.ts           # One-time seasonId backfill migration
│   └── test-answer-race.sh          # Manual concurrency test for answer guard
├── .env.example
└── public/avatars/                  # 15 avatar PNGs (served at /avatars)
```

### Roles & Authorization

Users have one of three roles:

* **`student`** — default role; joins teams and plays matches
* **`admin`** — manages users, teams, seasons, events, questions, sessions, notifications
* **`superAdmin`** — additionally manages admins and reads audit logs

All routes except the public auth endpoints are protected by `protect` (JWT verification). Role gates use `restrictTo(...roles)`:

| Area | Roles allowed |
|---|---|
| Questions, Seasons (management), Events (management), Admin API | `admin`, `superAdmin` |
| Super-admin API, Logs API | `superAdmin` only |
| Sessions list / stats | `admin`, `superAdmin` |

Within a team there are also member-level roles **`captain`** and **`member`** — sessions are started/abandoned by captains only.

### Seasons & Events

Competition is organized as **Seasons → Events → Sessions (matches)**.

**Season statuses** (`Season.status`): `upcoming` → `active` → `knockout` → `ended`

**Event statuses** (`Event.status`): `scheduled` → `running` → `finished`

**Database-level invariants:**

* Only **one Season** can be `active` **or** `knockout` at a time — enforced by a partial unique index on the Season collection.
* Only **one Event** can be `running` at a time — enforced by a partial unique index on the Event collection (API controllers also validate and return a friendly 400 instead of a raw duplicate-key error).

These are consistency rules enforced at the database and controller layers, not just UI rules.

### API Endpoints

All routes below are prefixed with `/api/v1`. `auth` level: **Public** = no token; **User** = any authenticated user; **Captain** = the team's captain (checked in the controller); **Admin** = `admin` or `superAdmin`; **Super** = `superAdmin`.

#### Auth & Users — base `/users`
| Method | Path | Access |
|---|---|---|
| POST | `/signup` | Public |
| POST | `/login` | Public |
| POST | `/forgot-password` | Public |
| PATCH | `/reset-password/:resetToken` | Public |
| POST | `/logout` | User |
| GET / PATCH | `/me` | User |
| DELETE | `/me` | User |
| PATCH | `/me/change-password` | User |

#### Teams — base `/teams`
| Method | Path | Access |
|---|---|---|
| POST | `/` | User |
| GET / DELETE | `/my-team` | User (delete = captain) |
| GET | `/my-team/stats` | User |
| POST | `/join` | User (by 8-char code) |
| DELETE | `/leave` | User |
| GET | `/:id/attempts` | User |
| PATCH | `/:id/name` | Captain |
| PATCH | `/:id/captain` | Captain |
| DELETE | `/:id/members/:userId` | Captain |
| GET | `/:id` | Admin |

#### Seasons — base `/seasons`
| Method | Path | Access |
|---|---|---|
| GET | `/active` | User |
| GET | `/:seasonId/leaderboard` | User |
| GET | `/:seasonId/leaderboard/stats` | User |
| GET / POST | `/` | Admin |
| GET | `/stats` | Admin |
| GET / PATCH / DELETE | `/:id` | Admin |

#### Events — base `/events`
| Method | Path | Access |
|---|---|---|
| GET | `/current` | User |
| GET | `/stats` | User |
| GET / POST | `/` | Admin |
| GET / PATCH / DELETE | `/:id` | Admin |

#### Sessions — base `/sessions`
| Method | Path | Access |
|---|---|---|
| GET / POST | `/` | Admin (list) |
| GET | `/stats` | Admin |
| POST | `/:id/answer` | User (team member; rate-limited 30/min) |
| GET | `/:id` | User (team member, result) |
| POST | `/:id/abandon` | Captain |

Sessions are **started through Socket.IO** (`start-game`), not via a REST endpoint.

#### Questions — base `/questions` (Admin)
| Method | Path | Access |
|---|---|---|
| GET / POST | `/` | Admin |
| GET | `/stats`, `/meta` | Admin |
| POST / DELETE | `/bulk` | Admin |
| GET / PATCH / DELETE | `/:id` | Admin |

#### Leaderboard — base `/leaderboard`
| Method | Path | Access |
|---|---|---|
| GET | `/` | User (event leaderboard) |
| GET | `/top-three` | User |
| GET | `/my-rank` | User |

#### Notifications — base `/notifications`
| Method | Path | Access |
|---|---|---|
| GET | `/` | User (own notifications) |
| PATCH | `/all` | User |
| PATCH | `/:id` | User |

#### Admin — base `/admin` (Admin)
| Method | Path | Description |
|---|---|---|
| POST | `/` | Create admin account |
| GET | `/dashboard/stats`, `/dashboard/recent-sessions` | Dashboard |
| GET / POST | `/notifications` | Campaigns / send notification |
| GET / DELETE | `/notifications/stats`, `/notifications/:id` | Stats / delete campaign |
| GET / POST | `/users` | List / create users |
| GET | `/users/stats` | User stats |
| POST | `/users/notifications` | Send to specific users |
| PATCH | `/users/deactivate` | Bulk deactivate |
| PATCH / DELETE | `/users/:id` | Update / delete user |
| PATCH | `/users/:id/reset-password` | Admin password reset |
| GET | `/profile/stats`, `/profile/recent-logs` | Admin profile |
| GET | `/teams`, `/teams/stats` | Team lists |
| POST / PATCH / DELETE | `/teams/:id` | Notify / edit / delete team |

#### Super-Admin — base `/super-admin` (Super)
| Method | Path | Description |
|---|---|---|
| POST | `/` | Create admin/super-admin |
| GET | `/stats`, `/recent-admins`, `/recent-admin-logs` | Dashboard |
| GET | `/admins`, `/admins/stats` | Admins list |
| PATCH / DELETE | `/admins/:id` | Edit / deactivate admin |

#### Logs — base `/logs` (Super)
| Method | Path | Description |
|---|---|---|
| GET | `/`, `/stats` | Audit log query + stats |

**Other:** `GET /` health check; avatar PNGs served statically at `/avatars`.

### Environment Variables

Source of truth: `backend/.env.example`.

| Variable | Purpose | Required |
|---|---|---|
| `PORT` | Backend listen port (default `5000`) | Optional |
| `MONGODB_URI` | MongoDB connection string | **Required** |
| `JWT_SECRET` | HMAC secret for signing JWTs | **Required** |
| `JWT_EXPIRES_IN` | JWT lifetime (e.g. `7d`) | Optional |
| `JWT_COOKIE_EXPIRES_IN` | Auth cookie lifetime in days (code defaults to `90`) | Optional |
| `NODE_ENV` | `development` / `production` | Optional |
| `CLIENT_URL` | Frontend origin — CORS + Socket.IO whitelist + reset email URL | **Required in production** |
| `ADMIN_TEMP_PASSWORD` | Temporary password applied when an admin resets a student's password (min 8 chars). Required in production; falls back to a development default only outside production | **Required in production** |
| `RESEND_API_KEY` | Resend API key (production email) | Production only |
| `MAILTRAP_HOST` / `MAILTRAP_PORT` / `MAILTRAP_USER` / `MAILTRAP_PASS` | Mailtrap SMTP (development email) | Development only |

Frontend environment (see `frontend/.env`):

| Variable | Purpose | Default |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | Backend REST base URL | `http://localhost:5000/api/v1` |
| `NEXT_PUBLIC_SOCKET_URL` | Backend Socket.IO URL | `http://localhost:5000` |

> Do not commit real secrets. Keep `ADMIN_TEMP_PASSWORD` and other credentials in a local `.env` only.

### Background Jobs

Jobs are **interval-based** (`setInterval`), started after the DB connection succeeds:

| Job | Interval | Behavior |
|---|---|---|
| `jobs/sessionExpiry.ts` | every 60s | Finds `running` sessions past `expiresAt` and finalizes them as `expired` |
| `jobs/eventStatus.ts` | every 5 min | `scheduled` → `running` when start time passes (only if no other event is running), `running` → `finished` when end time passes |
| `jobs/seasonStatus.ts` | every 5 min | `upcoming` → `active` → `knockout` → `ended` as respective dates pass |

### Gameplay (Sessions)

A **Session is the played match/game** — there is no separate `Match` model.

The flow:

1. The **captain** starts a game from the lobby via Socket.IO (`start-game`).
2. The server validates: caller is the team captain, an event is `running`, the team has at least **2 members**, and the team has not used all its attempts for that event (`maxAttempts`).
3. The server samples **5 random questions** from the global question pool and creates a `Session` (`status: "running"`, `expiresAt` ~7.5 minutes later). The session's questions are sent to the team in real time — **`correctAnswer` is stripped** and never sent to the client.
4. A member submits an answer via REST `POST /sessions/:id/answer` (`{ questionId, submittedAnswer, timeTaken }`). Only the **first** answer for each question is accepted (atomic first-writer guard).
5. When the last question is answered the session is finalized (`finalizeSession`) and the result is broadcast.
6. Sessions also end when they **expire** (checked in-code and by the 60s job) or are **abandoned** by the captain.

Aggregate updates on finalization:

* **Completed/expired** sessions update the **Leaderboard** (one aggregated row per team + event + season), the **Team** (`points`, `totalGames`), and every member's **User** stats (`gamesPlayed`, `totalScore`).
* **Abandoned** sessions are marked `completed` with `endReason: "abandoned"` and a `finalScore` of 0 — they intentionally do **not** update Leaderboard/Team/User aggregates (though they still count toward the team's attempt quota).

### Scoring

Verified against the implementation (`constants.ts` + `sessionController.submitAnswer`):

* **Base score:** `15` per correct answer.
* **Time bonus:** `question.duration − timeTaken` (clamped to `[0, duration]`), so faster answers score more.
* **Streak bonus:** `+5` every **5th consecutive** correct answer (`newStreak % 5 === 0`).
* **Wrong answer:** `0` points and the streak resets.

`finalScore` = the sum of all per-question scores.

### Questions

The question contract in actual use:

* **`mcq`** — multiple-choice: an `options` array of strings, and `correctAnswer` must equal exactly one option's text (compared by strict string equality — no trimming).
* **`numberExact`** — exact-number answer: `correctAnswer` is a plain digit string (e.g. `"8"`), entered as free text on the client.

The Question model's enum also admits legacy values `a/b`, `oddOneOut`, and `speed`, but the current admin UI and game flow do not present them as distinct supported modes — the game renders either option buttons (when `options` exist) or a free-text/number input, and scoring is identical for all types.

`correctAnswer` is **not included** in the question payload sent to the client during an active session.

### Realtime / Socket.IO

Socket.IO (default namespace, one room per team `id`) is used for:

* **Lobby / team presence** — `join-lobby` / `leave-lobby`, `team-presence`
* **Starting games** — `start-game` (captain) → `game-started` or `game-error`
* **Gameplay synchronization** — `answer-locked`, `question-result`, `next-question`
* **Answer updates** — `answer-update` (live UI relay)
* **Game ending** — `game-ended` (+ captain `abandon-game`)

Socket connections are currently unauthenticated at the handshake level; identity is provided by the client and captain/team checks are enforced server-side.

### Security

- **Helmet** — HTTP security headers
- **Rate limiting** — auth routes: 10 req / 15 min; answer submission: 30 req / min
- **CORS** — whitelisted origins (`CLIENT_URL` in production; open in development)
- **HPP** — HTTP parameter pollution protection
- **Body size limit** — 10kb JSON payload limit
- **NoSQL injection sanitization** — custom middleware strips `$`-prefixed and dotted keys from request body/params
- **JWT** — httpOnly cookies (not localStorage); **Bearer token** header also supported
- **bcrypt** — 12 salt rounds for passwords
- **Password reset tokens** — 10 min expiry
- **Role-based authorization** — `restrictTo(...roles)` guards on management routes

---

## 🌿 Git Workflow

| Branch | Purpose | Protection |
|---|---|---|
| `main` | Production-ready code | Protected |
| `dev` | Active development | Open for collaboration |

```bash
git checkout dev
git add .
git commit -m "feat: description"
git push origin dev
```

---

## 👥 Team Roles

| Member | Role | Focus |
|---|---|---|
| **Abdulrahman** | Full Stack | Backend API, game logic, match system, Socket.IO |
| **Ramez** | Frontend | UI/UX, pages, components |
| **Abu Zaid** | Frontend | UI/UX, pages, components |

---

## 🚀 Features

### Implemented

- User authentication (register / login / logout / password reset)
- Avatar selection on first login
- Team creation and management (2–5 members, join by code)
- Seasons and events lifecycle (invariant-enforced)
- Ranked game sessions with scoring (streak bonuses, time bonuses)
- Real-time gameplay via Socket.IO (lobby, presence, questions, answers)
- Question bank (MCQ + exact-number, bulk import)
- Live leaderboard with podium (event + season)
- Admin dashboard (users, teams, seasons, events, questions, sessions, notifications)
- Super-admin dashboard (admins, audit logs, settings)
- Notifications (broadcast, selected users, per-team)
- Audit logging of admin/team/user actions
- Email service (password reset, Arabic templates)
- Background jobs (session expiry, event/season transitions)
- Dark/light theme
- RTL Arabic-first UI

### Planned

- Knockout/Risk mode (offline event)
- Casual mode (solo play)

---

## 🔬 Testing Status

There is **no automated test suite yet** (no Jest / Vitest / Playwright configured).

Current verification is limited to:

* **Type checking / build** — `pnpm build` (backend `tsc`) and `npx tsc --noEmit` (frontend)
* **Manual race-test script** — `backend/scripts/test-answer-race.sh` (bash + curl) which fires two concurrent answers to the same question and asserts only one succeeds (validates the atomic answer guard)
* **Frontend lint** — `pnpm lint` (eslint)

Integration/edge-case testing is planned as the next step.

---

## 🌱 Seed (Database Testing Environment)

For development/testing only. Creates a clean, realistic base dataset so the **real** application flows can be exercised (login → team → running event → socket lobby → start game → answer → finalize → leaderboard → stats).

### Command

```bash
# from the backend directory
pnpm db:seed
# or directly:
npx tsx scripts/seed.ts
```

### What it creates

| Entity | Count | Details |
|---|---|---|
| Super Admin | 1 | `superadmin@el-le3ba.test` |
| Admins | 2 | `admin1@el-le3ba.test`, `admin2@el-le3ba.test` |
| Students | 80 | `student001@el-le3ba.test` … `student080@el-le3ba.test` |
| Teams | 15 | 5 members each (1 captain + 4 members) |
| TeamMemberships | 75 | 15 captains + 60 members |
| Seasons | 3 | 1 ended, 1 active, 1 upcoming |
| Events | 4 | 1 running, 2 scheduled, 1 finished (all in the active season) |
| Questions | 65 | 52 MCQ + 13 numberExact across all 7 categories (65 ≥ the 5 needed per session) |

### What it intentionally does NOT create

* **Sessions** (0)
* **Leaderboards** (0)
* answer logs, fake scores, fake team/user gameplay stats

The first Session and Leaderboard are generated by real gameplay or an explicit integration simulation — never by the seed.

### Test credentials

All seeded passwords are `password123` (see the seed output; passwords are **not** logged by the seed itself):

* `superadmin@el-le3ba.test` (superAdmin)
* `admin1@el-le3ba.test` / `admin2@el-le3ba.test` (admin)
* `student001@el-le3ba.test` (captain of team `Alpha`)
* `student080@el-le3ba.test` — **inactive** student (for auth/authorization tests)
* `student076@el-le3ba.test` — **teamless** student

Useful test cases included: full 5-member teams, <2-member teams are not seeded (won't violate `MIN_TEAM_SIZE`), teamless users, captain/member permissions, and an inactive user.

### Reset / idempotency

The seed is **destructive to its own collections only**: it deletes all documents in `User`, `Team`, `TeamMembership`, `Season`, `Event`, `Question`, `Session`, `Leaderboard`, and `Notification`, then recreates them deterministically. Running `pnpm db:seed` twice produces the same logical dataset.

### Production safety

The seed **refuses to run** when `NODE_ENV=production`. It only runs against a development/test `MONGODB_URI`. It does **not** drop indexes, disable validators, or alter schemas — it inserts through the normal Mongoose models/validators.

---

## 🧩 Consistency Behavior (current)

A few important enforced behaviors:

* **Only one running Event** — partial unique index + controller validation.
* **Only one active/knockout Season** — partial unique index.
* **Running Sessions block deletion** — a team/event/season with a running session cannot be deleted (400).
* **Cascade cleanup** — deleting a parent (team/event/season) removes its historical Sessions and related Leaderboard records in a transaction.
* **Sessions & Leaderboards are runtime-generated** — never pre-seeded.

---

## 📦 Package Manager

This project uses **pnpm** per app.

```bash
pnpm install
pnpm add package-name
pnpm add -D package-name
```

## 🧑‍💻 Development Commands

### Backend (`backend/package.json`)

| Command | Script | What it does |
|---|---|---|
| `pnpm dev` | `tsx watch src/server.ts` | Hot-reload dev server (`http://localhost:5000`) |
| `pnpm build` | `tsc` | Type-check + compile to `dist/` |
| `pnpm start` | `node dist/server.js` | Run the compiled server |
| `pnpm db:seed` | `tsx scripts/seed.ts` | Seed the development database (see [Seed](#-seed-database-testing-environment)) |

The backend has **no lint/test scripts** (only the seed above).

### Frontend (`frontend/package.json`)

| Command | Script | What it does |
|---|---|---|
| `pnpm dev` | `next dev` | Dev server (`http://localhost:3000`) |
| `pnpm build` | `next build` | Production build |
| `pnpm start` | `next start` | Serve the production build |
| `pnpm lint` | `eslint` | ESLint |

The frontend has **no test/typecheck scripts** (`npx tsc --noEmit` can be used for type checking).

---

## 🎨 Design Principles

- **RTL layout** throughout (Arabic-first)
- **Rounded corners** everywhere (16-24px border-radius)
- **Soft shadows** - no harsh shadows
- **Timer ring** is the hero element
- **Cards** use white background on `#F5F5FF` surface
- **Generous padding** - nothing feels cramped
- **Micro-interactions** - correct flash green, wrong shake
- **Mobile-first** (390px base width)
- **Feel:** Duolingo's cleanliness + Kahoot's energy

---

## 📄 License

ISC

---
