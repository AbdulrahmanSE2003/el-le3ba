import Event from "../models/eventModel";
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

  const eventId = req.query.eventId as string;
  if (!eventId)
    return next(
      new AppError("Invalid operation, please provide event id", 400),
    );

  const event = await Event.findById(eventId);
  if (!event) return next(new AppError("Event not found.", 404));
  if (event.status === "finished")
    return next(new AppError("This event has ended.", 400));

  if (req.user.role === "student") {
    // Getting top 50 teams
    const top50 = await Leaderboard.find({ eventId })
      .sort({ totalPoints: -1 })
      .limit(50);

    // Getting user team rank
    const membership = await TeamMembership.findOne({ userId });
    if (!membership)
      return next(new AppError("Invalid operation, no such a team", 404));

    const myEntry = await Leaderboard.findOne({
      teamId: membership.teamId,
      eventId,
    });

    const rank = myEntry
      ? (await Leaderboard.countDocuments({
          eventId,
          totalPoints: { $gt: myEntry.totalPoints },
        })) + 1
      : null;

    resHandler(res, 200, "Leaderboard", { ranking: top50, rank });
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
