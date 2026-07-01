import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import hpp from "hpp";
import cookieParser from "cookie-parser";

import { corsConfig } from "./config/cors";
import { globalErrorHandler } from "./middleware/errorMiddleware";

import userRoutes from "./routes/userRoutes";
import teamRoutes from "./routes/teamRoutes";
import eventRoutes from "./routes/eventRoutes";
import leaderboardRoutes from "./routes/leaderboardRoutes";
import sessionRoutes from "./routes/sessionRoutes";
import questionRoutes from "./routes/questionRoutes";
import { sanitizeInput } from "./middleware/sanitize";

const app = express();

// ── Security: HTTP headers ─────────────────────────────────
app.use(helmet());

// ── Security: Rate limiting ────────────────────────────────
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max 100 requests per IP per window
  message: "Too many requests from this IP, please try again later.",
});
app.use("/api", limiter);

// ── Security: Stricter limiter for auth routes ─────────────
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100, // only 10 login/signup attempts per 15 minutes
  message: "Too many auth attempts, please try again later.",
});
app.use("/api/v1/users/login", authLimiter);
app.use("/api/v1/users/signup", authLimiter);

// ── Security: CORS ─────────────────────────────────────────
app.use(corsConfig);

// ── Body parser ────────────────────────────────────────────
app.use(express.json({ limit: "10kb" })); // body size limit
app.use(cookieParser());

// ── Security: NoSQL injection sanitization ─────────────────
app.use(sanitizeInput);

// ── Security: HTTP parameter pollution ────────────────────
app.use(hpp());

app.get("/", (req, res) => {
  res.json({ message: "اللعبة API is running! 🎮" });
});

// ── Routes ─────────────────────────────────────────────────
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/teams", teamRoutes);
app.use("/api/v1/events", eventRoutes);
app.use("/api/v1/leaderboard", leaderboardRoutes);
app.use("/api/v1/sessions", sessionRoutes);
app.use("/api/v1/questions", questionRoutes);

// ── Global error handler ───────────────────────────────────
app.use(globalErrorHandler);

export default app;
