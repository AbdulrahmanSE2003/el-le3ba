import Season from "../models/seasonModel";

export const startSeasonLifecycleJob = () => {
  setInterval(
    async () => {
      try {
        const upcomingSeason = await Season.findOne({
          status: "upcoming",
          startDate: { $lte: new Date() },
        });
        if (upcomingSeason) {
          upcomingSeason.status = "active";
          await upcomingSeason.save();
        }

        const activeSeason = await Season.findOne({
          status: "active",
          knockoutStartDate: { $lte: new Date() },
        });
        if (activeSeason) {
          activeSeason.status = "knockout";
          await activeSeason.save();
        }

        const knockoutSeason = await Season.findOne({
          status: "knockout",
          endDate: { $lte: new Date() },
        });
        if (knockoutSeason) {
          knockoutSeason.status = "ended";
          await knockoutSeason.save();
        }
      } catch (error) {
        console.error("Season lifecycle error ", error);
      }
    },
    5 * 60 * 1000,
  );
};
