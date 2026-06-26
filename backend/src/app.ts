import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import { corsConfig } from "./config/cors";

const app = express();

app.use(corsConfig);
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "اللعبة API is running! 🎮" });
});

// NOTE: routes:
app.use("/api/v1/users", userRoutes);

export default app;
