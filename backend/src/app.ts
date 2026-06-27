import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import { corsConfig } from "./config/cors";
import teamRoutes from "./routes/teamRoutes";
import eventRoutes from "./routes/eventRoutes";
import leaderboardRoutes from "./routes/leaderboardRoutes";
import sessionRoutes from "./routes/sessionRoutes";
import { globalErrorHandler } from "./middleware/errorMiddleware";
import questionRoutes from "./routes/questionRoutes";

const app = express();

app.use(corsConfig);
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "اللعبة API is running! 🎮" });
});

// NOTE: routes:
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/teams", teamRoutes);
app.use("/api/v1/events", eventRoutes);
app.use("/api/v1/leaderboard", leaderboardRoutes);
app.use("/api/v1/sessions", sessionRoutes);
app.use("/api/v1/questions", questionRoutes);

app.use(globalErrorHandler);

export default app;
