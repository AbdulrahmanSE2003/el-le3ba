import dotenv from "dotenv";
dotenv.config();
import { createServer } from "http";
import { Server } from "socket.io";

import app from "./app";
import { connectDB } from "./config/db";
import { startSessionExpirationJob } from "./jobs/sessionExpiry";
import { corsOptions } from "./config/cors";
import { initSocket } from "./socket";

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: corsOptions.origin,
    credentials: true,
  },
});

initSocket(io);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  // ← 0.0.0.0 عشان يسمع على كل الـ network interfaces
  httpServer.listen(Number(PORT), "0.0.0.0", () => {
    console.log(`🚀 Server running on PORT ${PORT}`);
    startSessionExpirationJob();
  });
});
