import Event from "../models/eventModel";

export const startEventExpirationJob = () => {
  setInterval(
    async () => {
      try {
        const scheduledEvent = await Event.findOne({
          status: "scheduled",
          startTime: { $lte: new Date() },
        });
        if (scheduledEvent) {
          scheduledEvent.status = "running";
          await scheduledEvent.save();
        }
      } catch (error) {
        console.error("Event finalization error ", error);
      }
    },
    5 * 60 * 1000,
  );
};
