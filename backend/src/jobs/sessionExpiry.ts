import Session from "../models/sessionModel";
import { finalizeSession } from "../utils/finalizeSession";

export const startSessionExpirationJob = () => {
  setInterval(async () => {
    try {
      const expiredSessions = await Session.find({
        status: "running",
        expiresAt: { $lte: new Date() },
      });

      for (const session of expiredSessions) {
        try {
          await finalizeSession(session, "expired");
          console.log(`✅ Session ${session._id} expired.`);
        } catch (err) {
          console.error(err);
        }
      }
    } catch (err) {
      console.error("Session expiration job failed:", err);
    }
  }, 60 * 1000);
};
