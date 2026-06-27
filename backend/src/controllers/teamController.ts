import mongoose from "mongoose";
import TeamMembership from "../models/teamMembershipModel";
import Team from "../models/teamModel";
import Session from "../models/sessionModel";
import { AppError } from "../utils/appError";
import { catchAsync } from "../utils/catchAsync";
import { generateCode } from "../utils/utils";
import resHandler from "../utils/resHandler";
import { getAll, getOne } from "../utils/factory";

export const createTeam = catchAsync(async (req, res, next) => {
  const user = req.user;
  const isInTeam = await TeamMembership.findOne({ userId: user!._id });
  if (isInTeam) return next(new AppError("User is already in a team.", 400));

  let codeIsUnique = false;
  let GCode: string = "";
  while (!codeIsUnique) {
    GCode = generateCode();
    const exists = await Team.exists({ teamCode: GCode });
    if (!exists) codeIsUnique = true;
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const [newTeam] = await Team.create(
      [{ teamName: req.body.teamName, teamLeader: user!._id, teamCode: GCode }],
      { session },
    );

    await TeamMembership.create(
      [{ userId: user!._id, teamId: newTeam._id, role: "captain" }],
      { session },
    );

    await session.commitTransaction();
    resHandler(res, 201, "team", newTeam);
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
});

export const joinTeam = catchAsync(async (req, res, next) => {
  if (!req.user) return next(new AppError("Not authenticated.", 401));
  const userId = req.user._id;

  const isInTeam = await TeamMembership.exists({ userId });
  if (isInTeam) return next(new AppError("User is already in a team.", 400));

  const team = await Team.findOne({ teamCode: req.body.teamCode });
  if (!team) return next(new AppError("Invalid invite code.", 404));

  const teamMembersCount = await TeamMembership.countDocuments({
    teamId: team._id,
  });
  if (teamMembersCount >= 5) return next(new AppError("Team is full.", 400));

  const membership = await TeamMembership.create({
    userId,
    teamId: team._id,
    role: "member",
  });

  resHandler(res, 201, "membership", membership);
});

export const getMyTeam = catchAsync(async (req, res, next) => {
  if (!req.user) return next(new AppError("Not authenticated.", 401));
  const userId = req.user._id;

  const userTeam = await TeamMembership.findOne({ userId });
  if (!userTeam) return next(new AppError("You are not in a team.", 400));

  const team = await Team.findById(userTeam.teamId);
  const teamMembers = await TeamMembership.find({
    teamId: userTeam.teamId,
  }).populate("userId", "name email avatar");

  resHandler(res, 200, "team", { team, members: teamMembers });
});

export const deleteMyTeam = catchAsync(async (req, res, next) => {
  if (!req.user) return next(new AppError("Not authenticated.", 401));
  const userId = req.user._id;

  const userTeam = await Team.findOne({ teamLeader: userId });
  if (!userTeam)
    return next(new AppError("You are not a captain of any team.", 404));

  const teamId = userTeam._id;
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    await Team.deleteOne({ _id: teamId }, { session });
    await TeamMembership.deleteMany({ teamId }, { session });
    await session.commitTransaction();
    res.status(204).send();
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
});

export const leaveTeam = catchAsync(async (req, res, next) => {
  if (!req.user) return next(new AppError("Not authenticated.", 401));
  const userId = req.user._id;

  const userMembership = await TeamMembership.findOne({ userId });
  if (!userMembership) return next(new AppError("You are not in a team.", 400));

  // Regular member — just remove
  if (userMembership.role === "member") {
    await TeamMembership.deleteOne({ userId });
    return res.status(204).send();
  }

  // Captain leaving — find next oldest member to promote
  const nextCaptain = await TeamMembership.findOne({
    teamId: userMembership.teamId,
    userId: { $ne: userId },
  }).sort({ joinedAt: 1 });

  // If no members left, delete the team entirely
  if (!nextCaptain) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      await Team.deleteOne({ teamLeader: userId }, { session });
      await TeamMembership.deleteOne({ userId }, { session });
      await session.commitTransaction();
      return res.status(204).send();
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  // Promote next member and remove captain
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    await TeamMembership.deleteOne({ userId }, { session });

    nextCaptain.role = "captain";
    await nextCaptain.save({ session });

    await Team.findOneAndUpdate(
      { teamLeader: userId },
      { teamLeader: nextCaptain.userId },
      { session },
    );

    await session.commitTransaction();
    res.status(204).send();
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
});

// ===================================
// NOTE: Captain Only
// ===================================

export const changeCaptain = catchAsync(async (req, res, next) => {
  // Getting user id and ensure he is the captain
  if (!req.user) return next(new AppError("Not authenticated.", 401));
  const userId = req.user._id;

  const team = await Team.findOne({ teamLeader: userId });
  if (!team)
    return next(new AppError("You are not a captain of any team.", 404));

  const newCaptainId = req.body.newCaptainId;

  const newCaptainMembership = await TeamMembership.findOne({
    userId: newCaptainId,
    teamId: team._id,
  });
  if (!newCaptainMembership)
    return next(new AppError("This user is not in your team.", 400));

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    team.teamLeader = newCaptainId;
    await team.save({ session });

    await TeamMembership.findOneAndUpdate(
      { userId },
      { role: "member" },
      { session },
    );

    await TeamMembership.findOneAndUpdate(
      { userId: newCaptainId },
      { role: "captain" },
      { session },
    );

    await session.commitTransaction();
    resHandler(res, 200, "team", team);
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
});

export const changeTeamName = catchAsync(async (req, res, next) => {
  // Getting user id and ensure he is the captain
  if (!req.user) return next(new AppError("Not authenticated.", 401));
  const userId = req.user._id;

  const team = await Team.findOne({ teamLeader: userId });
  if (!team)
    return next(new AppError("You are not a captain of any team.", 404));

  if (!req.body.newTeamName)
    return next(new AppError("Please provide a new team name.", 400));

  team.teamName = req.body.newTeamName;

  await team.save();

  resHandler(res, 200, "team", team);
});

export const kickMember = catchAsync(async (req, res, next) => {
  // Getting user id and ensure he is the captain
  if (!req.user) return next(new AppError("Not authenticated.", 401));
  const userId = req.user._id;

  const team = await Team.findOne({ teamLeader: userId });
  if (!team)
    return next(new AppError("You are not a captain of any team.", 404));

  const targetUserId = req.params.userId;

  // Preventing captain to kick himself
  if (targetUserId.toString() === userId.toString())
    return next(new AppError("you can't kick yourself.", 400));

  const targetUserTeam = await TeamMembership.findOne({ userId: targetUserId });

  if (!targetUserTeam)
    return next(new AppError("There is no such a user.", 404));

  // Preventing to kick a member not in the same team
  if (targetUserTeam.teamId.toString() !== team._id.toString())
    return next(new AppError("This user not in your team.", 400));

  await TeamMembership.deleteOne({ userId: targetUserId });

  res.status(204).send();
});

export const getTeamAttempts = catchAsync(async (req, res, next) => {
  if (!req.user) return next(new AppError("Not authenticated.", 401));

  const { eventId } = req.query;
  if (!eventId) return next(new AppError("eventId is required.", 400));

  const teamMembership = await TeamMembership.findOne({
    userId: req.user._id,
  });
  if (!teamMembership) return next(new AppError("You are not in a team.", 400));

  const attempts = await Session.countDocuments({
    teamId: teamMembership.teamId,
    eventId: eventId as string,
  });

  resHandler(res, 200, "attempts", { attempts, teamId: teamMembership.teamId });
});

// ===================================
// NOTE: Admins Only
// ===================================
export const getTeam = getOne(Team);
export const getAllTeams = getAll(Team);
