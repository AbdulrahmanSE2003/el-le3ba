import Event from "../models/eventModel";
import { AppError } from "../utils/appError";
import { catchAsync } from "../utils/catchAsync";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "../utils/factory";
import resHandler from "../utils/resHandler";

export const getCurrentEvent = catchAsync(async (req, res, next) => {
  const event = await Event.findOne({ status: "running" });
  if (!event) return next(new AppError("No active event right now.", 404));
  resHandler(res, 200, "event", event);
});

export const getAllEvents = getAll(Event, {
  path: "User",
  select: "name email",
});

export const createEvent = catchAsync(async (req, res, next) => {
  if (!req.user) return next(new AppError("Not authenticated.", 401));

  const newEvent = await Event.create({
    title: req.body.title,
    createdBy: req.user._id,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    maxAttempts: req.body.maxAttempts,
  });

  resHandler(res, 201, "newEvent", newEvent);
});

export const getEvent = getOne(Event);

export const updateEvent = updateOne(Event);

export const deleteEvent = deleteOne(Event);
