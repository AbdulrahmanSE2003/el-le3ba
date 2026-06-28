import Leaderboard from "../models/leaderboardModel";
import TeamMembership from "../models/teamMembershipModel";
import Team from "../models/teamModel";
import APIFeatures from "../utils/APIFeatures";
import { AppError } from "../utils/appError";
import { catchAsync } from "../utils/catchAsync";
import resHandler from "../utils/resHandler";

export const getLeaderboard = catchAsync(async (req, res, next) => {
  if (!req.user) return next(new AppError("Not Authenticated", 401));
  const userId = req.user._id;

  const { eventId } = req.body;

  if (req.user.role === "student") {
    // Getting top 50 teams
    const top50 = await Leaderboard.find({ eventId })
      .sort({ totalPoints: -1 })
      .limit(50);

    // Getting user team rank
    const membership = await TeamMembership.findOne({ userId });
    if (!membership)
      return next(new AppError("Invalid operation, no such a team", 404));

    const team = await Team.findOne({ _id: membership.teamId });
    if (!team)
      return next(new AppError("Invalid operation, no such a team", 400));
    const rank =
      (await Leaderboard.countDocuments({
        eventId,
        totalPoints: { $gt: team.points },
      })) + 1;

    resHandler(res, 200, "Leaderboard", { leaderboard: top50, rank });
  } else {
    const features = new APIFeatures(Leaderboard.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const leaderboard = await features.query;
    resHandler(res, 200, "leaderboard", leaderboard);
  }
});
