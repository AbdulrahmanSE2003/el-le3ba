# 🎮 El-Le3ba (اللعبة)

A competitive university quiz application built for university students to compete in real-time trivia matches. The app features ranked sessions, team-based gameplay, and live leaderboards.

---

## 📁 Project Structure

This is a **monorepo** containing both frontend and backend:

```
el-le3ba/
├── frontend/          # Next.js 15 + TypeScript
├── backend/           # Express + TypeScript + MongoDB
└── README.md
```

---

## 🎨 Frontend

### Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **Fonts:** Playpen Sans (headings), Zain (body)
- **State:** TBD (Zustand or Context API)

### Folder Structure

```
frontend/
├── app/                          # Next.js App Router
│   ├── (app)/                    # Main app layout (authenticated)
│   │   ├── page.tsx              # Home / Dashboard
│   │   ├── layout.tsx            # App layout with nav
│   │   ├── leaderboard/
│   │   │   └── page.tsx          # Leaderboard screen
│   │   ├── match/
│   │   │   ├── page.tsx          # Matchmaking
│   │   │   └── [matchId]/
│   │   │       └── page.tsx      # Active game screen
│   │   └── profile/
│   │       └── page.tsx          # User profile
│   ├── (auth)/                   # Auth layout (unauthenticated)
│   │   ├── login/
│   │   │   └── page.tsx          # Login page
│   │   ├── register/
│   │   │   └── page.tsx          # Register page
│   │   ├── forgot-password/
│   │   │   └── page.tsx          # Forgot password
│   │   └── reset-password/
│   │       └── page.tsx          # Reset password
│   ├── admin/
│   │   └── page.tsx              # Admin dashboard
│   ├── globals.css               # Global styles
│   └── layout.tsx                # Root layout
│
├── components/
│   ├── ui/                       # shadcn/ui primitives
│   │   ├── button.tsx
│   │   ├── ThemeToggle.tsx
│   │   └── provideres.tsx
│   └── shared/                   # Shared components (TBD)
│       ├── TeamCard.tsx
│       ├── TimerRing.tsx
│       └── ScoreDisplay.tsx
│
├── features/                     # Feature-based modules
│   ├── auth/                     # Authentication feature
│   │   ├── api/                  # API calls
│   │   ├── components/           # Auth components
│   │   ├── hooks/                # Auth hooks
│   │   ├── lib/                  # Auth utilities
│   │   └── types.ts              # Auth types
│   ├── dashboard/                # Dashboard feature
│   │   ├── api/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── lib/
│   │   └── types.ts
│   ├── leaderboard/              # Leaderboard feature
│   │   ├── api/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── lib/
│   │   └── types.ts
│   ├── match/                    # Game/Match feature
│   │   ├── api/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── lib/
│   │   └── types.ts
│   └── profile/                  # Profile feature
│       ├── api/
│       ├── components/
│       ├── hooks/
│       ├── lib/
│       └── types.ts
│
├── lib/                          # Global utilities (TBD)
├── hooks/                        # Global hooks (TBD)
├── types/                        # Global types (TBD)
├── constants/                    # App constants (TBD)
├── store/                        # State management (TBD)
└── public/                       # Static assets
```

### Design System

| Token       | Value     | Usage                              |
| ----------- | --------- | ---------------------------------- |
| **Primary** | `#5B5FEF` | Buttons, highlights, active states |
| **Accent**  | `#FFD23F` | Points, badges, rewards            |
| **Success** | `#2DC653` | Correct answers, success states    |
| **Danger**  | `#FF4757` | Wrong answers, errors              |
| **Surface** | `#F5F5FF` | Page background                    |
| **Dark**    | `#1A1A2E` | Text, dark elements                |
| **Border**  | `#E2E2F0` | Card borders                       |

### Screens

1. **Landing Page** - Marketing page
2. **Onboarding** - First-time user flow
3. **Login/Register** - Authentication
4. **Home/Dashboard** - Team info, active session, leaderboard preview
5. **Matchmaking** - Join/Create team, find match
6. **Game** - Question screen with timer, answer options
7. **Score Reveal** - Between questions animation
8. **Leaderboard** - Full rankings
9. **Profile** - User stats, team info
10. **Admin Dashboard** - Manage sessions, questions, teams

### Getting Started (Frontend)

```bash
cd frontend
pnpm install
pnpm dev
# Open http://localhost:3000
```

---

## ⚙️ Backend

### Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** MongoDB Atlas (Mongoose)
- **Auth:** JWT (jsonwebtoken)
- **Password Hashing:** bcryptjs
- **Dev Tool:** tsx (fast TypeScript execution)

### Folder Structure

```
backend/
├── src/
│   ├── app.ts                    # Express app setup (middleware, routes)
│   ├── server.ts                 # Server startup + DB connection
│   │
│   ├── config/
│   │   ├── db.ts                 # MongoDB connection
│   │   └── cors.ts               # CORS configuration
│   │
│   ├── controllers/
│   │   └── authController.ts     # Auth logic (login, register, etc.)
│   │
│   ├── models/
│   │   └── userModel.ts          # User Mongoose schema
│   │
│   ├── routes/
│   │   └── userRoutes.ts         # Auth routes
│   │
│   ├── middleware/
│   │   └── auth.ts               # JWT verification (TBD)
│   │
│   ├── types/
│   │   └── express.d.ts          # Express type extensions
│   │
│   └── utils/
│       ├── appError.ts           # Custom error class
│       ├── catchAsync.ts         # Async error handler
│       ├── resHandler.ts         # Response formatter
│       └── sendEmail.ts          # Email service (placeholder)
│
├── .env                          # Environment variables (gitignored)
├── .env.example                  # Environment template
├── .gitignore
├── package.json
└── tsconfig.json
```

### API Endpoints

| Method | Endpoint                       | Description            | Auth |
| ------ | ------------------------------ | ---------------------- | ---- |
| GET    | `/`                            | Health check           | No   |
| POST   | `/api/v1/users/signup`         | Register new user      | No   |
| POST   | `/api/v1/users/login`          | Login user             | No   |
| POST   | `/api/v1/users/forgotPassword` | Request password reset | No   |
| PATCH  | `/api/v1/users/resetPassword`  | Reset password         | No   |

### Environment Variables

```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ellu3ba
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=7d
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

### Getting Started (Backend)

```bash
cd backend
pnpm install
pnpm dev
# Server runs on http://localhost:5000
```

---

## 🌿 Git Workflow

| Branch | Purpose               | Protection                              |
| ------ | --------------------- | --------------------------------------- |
| `main` | Production-ready code | ✅ Protected - Only repo owner can push |
| `dev`  | Active development    | Open for team collaboration             |

### Workflow

```bash
# Start working
git checkout dev

# Make changes, commit, push
git add .
git commit -m "feat: description"
git push origin dev

# When stable, merge to main (owner only)
git checkout main
git merge dev
git push origin main
```

---

## 👥 Team Roles

| Member          | Role                              | Focus                                 |
| --------------- | --------------------------------- | ------------------------------------- |
| **Abdulrahman** | Full Stack (Backend + Match/Game) | Backend API, Game logic, Match system |
| **Ramez**       | Frontend                          | UI/UX, Pages, Components              |
| **Abu Zaid**    | Frontend                          | UI/UX, Pages, Components              |

---

## 🚀 MVP Scope

### Included

- ✅ User authentication (register/login)
- ✅ Team creation/joining (2-6 members)
- ✅ Ranked game sessions
- ✅ Question/answer system
- ✅ Leaderboard
- ✅ Admin dashboard

### Not in MVP

- ❌ Knockout/Risk mode (offline event)
- ❌ Casual mode (solo play)
- ❌ Real-time WebSocket
- ❌ Email service (placeholder only)

---

## 📦 Package Manager

This project uses **pnpm** for all package management.

```bash
# Install dependencies
pnpm install

# Add dependency
pnpm add package-name

# Add dev dependency
pnpm add -D package-name
```

---

## 📝 Notes for Frontend Developers

### Where to Start

1. **Check the backend API** → `backend/src/routes/` for available endpoints
2. **Check feature folders** → `frontend/features/` for organized code
3. **Add shared components** → Create in `frontend/components/shared/`
4. **Add global utilities** → Create in `frontend/lib/` or `frontend/hooks/`

### Missing Folders (Create as needed)

```
frontend/
├── components/shared/            # Shared non-UI components
├── hooks/                        # Global custom hooks
├── lib/                          # Utilities (axios config, helpers)
├── types/                        # Global TypeScript types
├── constants/                    # App constants
└── store/                        # State management (Zustand/Context)
```

### API Base URL

```typescript
// Create: frontend/lib/axios.ts
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add auth token interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
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

Built with 💜 for BATU
