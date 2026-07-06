import dotenv from "dotenv";
dotenv.config();

import { createServer } from "http";
import { Server } from "socket.io";
import app from "./app";
import { connectDB } from "./config/db";
import { startSessionExpirationJob } from "./jobs/sessionExpiry";
import { initSocket } from "./socket";

const PORT = process.env.PORT || 5000;

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: (origin, callback) => {
      // السماح لأي origin في dev — في production حدد الـ domains
      if (!origin || process.env.NODE_ENV === "development") {
        return callback(null, true);
      }
      const allowed = [process.env.CLIENT_URL].filter(Boolean);
      if (allowed.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  },
});

app.set("io", io);
initSocket(io);

connectDB().then(() => {
  httpServer.listen(Number(PORT), "0.0.0.0", () => {
    console.log(`🚀 Server running on PORT ${PORT}`);
    startSessionExpirationJob();
  });
});
