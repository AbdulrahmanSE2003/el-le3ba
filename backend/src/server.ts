import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { connectDB } from "./config/db";
import { startSessionExpirationJob } from "./jobs/sessionExpiry";

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on PORT ${PORT}`);
    startSessionExpirationJob();
  });
});
