import mongoose, { ObjectId } from "mongoose";
import TeamMembership from "../models/teamMembershipModel";
import Team from "../models/teamModel";
import { AppError } from "../utils/appError";
import { catchAsync } from "../utils/catchAsync";
import { generateCode } from "../utils/utils";
import resHandler from "../utils/resHandler";
import { isStringOneByteRepresentation } from "node:v8";

export const createTeam = catchAsync(async (req, res, next) => {
  // Getting the signed in user
  const user = req.user;
  // Check if he is already in a team
  const isInTeam = await TeamMembership.findOne({ userId: user!._id });
  if (isInTeam) return next(new AppError("User is already in a team.", 400));

  // Now after checking generate a code for the team
  let codeIsUnique = false;
  let GCode: string = "";
  while (!codeIsUnique) {
    GCode = generateCode(); // GCode ==> generated code
    const exists = await Team.exists({ code: GCode });
    if (!exists) codeIsUnique = true;
  }

  // Creating Team & TeamMembership using transaction
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const [newTeam] = await Team.create(
      [
        {
          teamName: req.body.teamName,
          teamLeader: user!._id,
          teamCode: GCode,
        },
      ],
      { session },
    );

    await TeamMembership.create(
      [
        {
          userId: user!._id,
          teamId: newTeam._id,
          role: "captain",
        },
      ],
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
  // First check that user not in team
  const userId = req.user._id;
  const isInTeam = await TeamMembership.exists({ userId });

  if (isInTeam) return next(new AppError("User is already in a team.", 400));
  // After checking , add him to team via code
  const team = await Team.findOne({ teamCode: req.body.teamCode });
  if (!team) return next(new AppError("There is no such a team.", 404));

  // Checking if team is full (has 5 members)
  const teamMembers = await TeamMembership.find({ teamId: team._id });
  if (teamMembers.length >= 5)
    return next(new AppError("Team is full, search for another team", 400));

  const membership = await TeamMembership.create({
    userId,
    teamId: team._id,
    role: "member",
  });

  resHandler(res, 201, "membership", membership);
});

export const getMyTeam = catchAsync(async (req, res, next) => {
  // Get user id
  if (!req.user) return next(new AppError("Not authenticated.", 401));
  const userId = req.user._id;

  // Getting user team
  const userTeam = await TeamMembership.findOne({ userId });
  if (!userTeam) return next(new AppError("User don't have a team.", 400));

  const teamMembers = await TeamMembership.find({ teamId: userTeam.teamId });

  resHandler(res, 200, "members", teamMembers);
});

export const deleteMyTeam = catchAsync(async (req, res, next) => {
  if (!req.user) return next(new AppError("Not authenticated.", 401));
  const userId = req.user._id;
  // Checking is he authorized to delete his team
  const userTeam = await Team.findOne({ teamLeader: userId });

  if (!userTeam) return next(new AppError("There is no such a team.", 404));

  if (userTeam.teamLeader.toString() !== userId.toString())
    return next(
      new AppError(
        "You are not a captain of any team, you cant perform this action",
        401,
      ),
    );

  const teamId = userTeam._id;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    await Team.deleteOne({ _id: teamId });
    await TeamMembership.deleteMany({ teamId });
    await session.commitTransaction();

    res.status(204).send();
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
});
