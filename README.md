# 🎮 El-Le3ba (اللعبة)

A competitive university quiz application for **Borg El-Arab Technological University (BATU)** students. Teams compete in real-time ranked trivia matches with live leaderboards, event-based competition cycles, and a full admin dashboard.

---

## 📁 Monorepo Structure

```
el-le3ba/
├── frontend/          # Next.js 16 App Router + TypeScript
├── backend/           # Express 5 + TypeScript + MongoDB
└── README.md
```

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
| **Socket.IO Client** | Real-time communication |
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
│   ├── loading.tsx                 # Global loading state
│   ├── not-found.tsx               # 404 page (gamified)
│   ├── error.tsx                   # Error page
│   │
│   ├── (auth)/                     # Unauthenticated layout
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   ├── forgot-password/page.tsx
│   │   ├── reset-password/[token]/page.tsx
│   │   └── select-avatar/page.tsx
│   │
│   ├── (app)/                      # Authenticated layout
│   │   ├── dashboard/page.tsx
│   │   ├── match/page.tsx
│   │   ├── leaderboard/page.tsx
│   │   ├── profile/page.tsx
│   │   └── team/page.tsx
│   │
│   ├── (game)/                     # Game session routes
│   │   ├── game/[sessionId]/page.tsx
│   │   └── result/[sessionId]/page.tsx
│   │
│   ├── admin/                      # Admin dashboard
│   │   ├── dashboard/page.tsx
│   │   ├── users/page.tsx
│   │   ├── matches/page.tsx
│   │   └── settings/page.tsx
│   │
│   └── (static)/                   # Static pages
│       ├── about/page.tsx
│       ├── privacy/page.tsx
│       ├── support/page.tsx
│       └── terms/page.tsx
│
├── components/                     # Reusable UI
│   ├── ui/                         # shadcn/ui primitives
│   ├── shared/                     # Shared app components
│   └── sidebar/                    # AppSidebar, AdminSidebar, Logo
│
├── features/                       # Feature-based modules
│   ├── auth/                       # Auth components, hooks, service
│   ├── dashboard/                  # Dashboard + skeletons
│   ├── leaderboard/                # Podium, rankings
│   ├── match/                      # Game/lobby + socket lib
│   ├── profile/                    # Edit, stats, achievements
│   ├── team/                       # Header, members, stats, games
│   ├── landing/                    # Hero, Features, CTA sections
│   └── admin/                      # Admin constants
│
├── store/                          # Zustand stores
│   ├── userStore.ts                # User state (persisted)
│   └── storeInitializer.tsx        # Server to client hydration
│
├── hooks/                          # Global hooks
│   ├── use-mobile.ts
│   ├── useAvatar.ts
│   └── useModal.ts
│
├── lib/                            # Utilities
│   ├── utils.ts                    # cn(), formatting, dates
│   └── axios.ts                    # API client re-export
│
├── shared/                         # Shared across features
│   ├── api/                        # Axios client, server fetch, cache config
│   └── types/                      # Event, team, response types
│
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

1. **Landing Page** — Marketing page with Hero, Features, Community, CTA
2. **Login / Register** — Authentication with JWT
3. **Select Avatar** — First-time avatar pick after registration
4. **Dashboard** — Team info, active session, leaderboard preview
5. **Matchmaking** — Join/Create team, find match
6. **Game** — Question screen with timer ring, answer options (real-time via Socket.IO)
7. **Results** — Score summary after session ends
8. **Leaderboard** — Full rankings + podium
9. **Profile** — User stats, achievements, team info, settings
10. **Team** — Team details, members, stats, game history
11. **Admin Dashboard** — Manage events, questions, users, matches

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
| **MongoDB Atlas + Mongoose** | Database & ODM |
| **Socket.IO** | Real-time WebSocket |
| **JWT (jsonwebtoken)** | Authentication |
| **bcryptjs** | Password hashing |
| **helmet** | Security headers |
| **express-rate-limit** | Rate limiting |
| **cookie-parser** | Cookie parsing |
| **nodemailer + Resend** | Email service |
| **node-cron** | Background jobs |

### Folder Structure

```
backend/
├── src/
│   ├── server.ts                    # Entry: HTTP + Socket.IO + DB + cron
│   ├── app.ts                       # Express setup (middleware, routes)
│   ├── constants.ts                 # Game constants (scores, timers, avatars)
│   │
│   ├── config/
│   │   ├── db.ts                    # MongoDB connection
│   │   └── cors.ts                  # CORS configuration
│   │
│   ├── controllers/
│   │   ├── authController.ts        # Signup, login, JWT, password reset
│   │   ├── userController.ts        # Profile CRUD, change password
│   │   ├── teamController.ts        # CRUD teams, join/leave, captain ops
│   │   ├── sessionController.ts     # Start/answer/abandon game sessions
│   │   ├── questionController.ts    # CRUD + bulk question creation
│   │   ├── eventController.ts       # Event lifecycle management
│   │   ├── leaderboardController.ts # Rankings, podium, user rank
│   │   └── notificationController.ts # Notifications CRUD + send
│   │
│   ├── models/
│   │   ├── userModel.ts             # User (name, email, roles, stats)
│   │   ├── teamModel.ts             # Team (name, code, leader, stats)
│   │   ├── teamMembershipModel.ts   # User team link with role
│   │   ├── sessionModel.ts          # Game session (Q&A, scores)
│   │   ├── questionModel.ts         # Question (MCQ, true/false)
│   │   ├── eventModel.ts            # Event (scheduled/running/finished)
│   │   ├── leaderboardModel.ts      # Team ranking per event
│   │   └── notificationModel.ts     # Notification schema
│   │
│   ├── routes/
│   │   ├── userRoutes.ts
│   │   ├── teamRoutes.ts
│   │   ├── sessionRoutes.ts
│   │   ├── questionRoutes.ts
│   │   ├── eventRoutes.ts
│   │   ├── leaderboardRoutes.ts
│   │   └── notificationRoutes.ts
│   │
│   ├── middleware/
│   │   ├── errorMiddleware.ts       # Global error handler
│   │   └── sanitize.ts              # NoSQL injection prevention
│   │
│   ├── socket/
│   │   └── index.ts                 # Socket.IO events (lobby, game, answers)
│   │
│   ├── jobs/
│   │   ├── sessionExpiry.ts         # Expire stale sessions (every 60s)
│   │   └── eventStatus.ts           # Auto-start events (every 5min)
│   │
│   ├── types/
│   │   └── express.d.ts            # Express Request augmentation
│   │
│   └── utils/
│       ├── appError.ts              # Custom error class
│       ├── catchAsync.ts            # Async error wrapper
│       ├── resHandler.ts            # Standardized response helper
│       ├── factory.ts               # Generic CRUD factory
│       ├── APIFeatures.ts           # Query filtering/sorting/pagination
│       ├── finalizeSession.ts       # Scoring logic (transactional)
│       ├── sendEmail.ts             # Arabic email templates (Resend/Mailtrap)
│       └── utils.ts                 # Team code generator
│
├── .env
├── .env.example
└── public/avatars/                  # 15 avatar PNGs
```

### API Endpoints

#### Auth & Users
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/` | Health check | No |
| POST | `/api/v1/users/signup` | Register | No |
| POST | `/api/v1/users/login` | Login | No |
| POST | `/api/v1/users/logout` | Logout | Yes |
| GET | `/api/v1/users/me` | Get current user | Yes |
| PATCH | `/api/v1/users/me` | Update profile | Yes |
| PATCH | `/api/v1/users/change-password` | Change password | Yes |
| DELETE | `/api/v1/users/me` | Delete account | Yes |
| POST | `/api/v1/users/forgot-password` | Request reset | No |
| PATCH | `/api/v1/users/reset-password/:token` | Reset password | No |

#### Teams
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/v1/teams` | Create team | Yes |
| GET | `/api/v1/teams/my-team` | Get my team | Yes |
| PATCH | `/api/v1/teams/:id` | Update team | Yes |
| POST | `/api/v1/teams/join` | Join by code | Yes |
| POST | `/api/v1/teams/leave` | Leave team | Yes |
| PATCH | `/api/v1/teams/transfer-captain` | Transfer captain | Yes |
| DELETE | `/api/v1/teams/kick-member` | Kick member | Yes |

#### Sessions (Game)
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/v1/sessions/start` | Start new session | Yes |
| POST | `/api/v1/sessions/submit-answer` | Submit answer | Yes |
| GET | `/api/v1/sessions/results/:sessionId` | Get results | Yes |
| POST | `/api/v1/sessions/abandon` | Abandon session | Yes |

#### Questions (Admin)
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/v1/questions` | Create question | Admin |
| POST | `/api/v1/questions/bulk` | Bulk create | Admin |
| GET | `/api/v1/questions` | List questions | Admin |
| GET | `/api/v1/questions/:id` | Get question | Admin |
| PATCH | `/api/v1/questions/:id` | Update question | Admin |
| DELETE | `/api/v1/questions/:id` | Delete question | Admin |

#### Events
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/api/v1/events/current` | Get running event | Yes |
| GET | `/api/v1/events` | List all | Admin |
| POST | `/api/v1/events` | Create event | Admin |
| PATCH | `/api/v1/events/:id` | Update event | Admin |
| GET | `/api/v1/events/:id/stats` | Event stats | Admin |

#### Leaderboard
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/api/v1/leaderboard` | Top 50 + my rank | Yes |
| GET | `/api/v1/leaderboard/top3` | Podium | Yes |
| GET | `/api/v1/leaderboard/my-rank` | My event rank | Yes |

#### Notifications
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/api/v1/notifications` | My notifications | Yes |
| PATCH | `/api/v1/notifications/:id/read` | Mark as read | Yes |

### Environment Variables

```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ellu3ba
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=7d
JWT_COOKIE_EXPIRES_IN=7
NODE_ENV=development
CLIENT_URL=http://localhost:3000

# Email (Mailtrap for dev, Resend for prod)
MAILTRAP_HOST=sandbox.api.mailtrap.io
MAILTRAP_PORT=587
MAILTRAP_USER=your_user
MAILTRAP_PASS=your_pass
RESEND_API_KEY=re_xxxxx
```

### Getting Started

```bash
cd backend
pnpm install
pnpm dev
# Server runs on http://localhost:5000
```

---

## 🔐 Security

- **Helmet** - HTTP security headers
- **Rate limiting** - Auth routes: 10 req / 15 min
- **CORS** - Whitelisted origins
- **HPP** - HTTP parameter pollution protection
- **Body size limit** - 10kb on requests
- **NoSQL injection sanitization** - via express-mongo-sanitize
- **JWT** - httpOnly cookies (not localStorage)
- **bcrypt** - 12 salt rounds for passwords
- **Password reset tokens** - 10 min expiry

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
- Team creation and management (2-5 members, join by code)
- Event system (create, schedule, auto-start)
- Ranked game sessions with scoring (streak bonuses, time bonuses)
- Real-time gameplay via Socket.IO (lobby, questions, answers)
- Question bank (MCQ, true/false, bulk import)
- Live leaderboard with podium
- Admin dashboard (manage events, questions, users, matches)
- Notifications system
- Email service (password reset, Arabic templates)
- Background jobs (session expiry, event auto-start)
- Dark/light theme
- RTL Arabic-first UI

### Planned

- Knockout/Risk mode (offline event)
- Casual mode (solo play)

---

## 📦 Package Manager

This project uses **pnpm**.

```bash
pnpm install
pnpm add package-name
pnpm add -D package-name
```

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

Built with for BATU
