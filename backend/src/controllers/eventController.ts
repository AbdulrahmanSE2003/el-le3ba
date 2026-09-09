import mongoose from "mongoose";
import Event from "../models/eventModel";
import Leaderboard from "../models/leaderboardModel";
import Session from "../models/sessionModel";
import { AppError } from "../utils/appError";
import { logAudit } from "../utils/AuditLog";
import { catchAsync } from "../utils/catchAsync";
import { getOne } from "../utils/factory";
import resHandler from "../utils/resHandler";

export const getCurrentEvent = catchAsync(async (req, res, next) => {
  const event = await Event.findOne({ status: "running" });
  if (!event) return next(new AppError("No active event right now.", 404));
  resHandler(res, 200, "event", event);
});

export const getEventStats = catchAsync(async (req, res, next) => {
  const event = await Event.findOne({ status: "running" });
  if (!event) return next(new AppError("No running event.", 404));

  const totalTeams = await Leaderboard.countDocuments({ eventId: event._id });

  resHandler(res, 200, "stats", { totalTeams });
});

export const getAllEvents = catchAsync(async (req, res, next) => {
  const {
    search,
    status,
    sort = "-createdAt",
    page = "1",
    limit = "10",
  } = req.query;

  const currentPage = Math.max(Number(page) || 1, 1);
  const currentLimit = Math.max(Number(limit) || 10, 1);
  const skip = (currentPage - 1) * currentLimit;

  const filter: Record<string, unknown> = {};

  if (search && typeof search === "string") {
    filter.title = {
      $regex: search,
      $options: "i",
    };
  }

  if (
    status &&
    ["scheduled", "running", "finished"].includes(String(status))
  ) {
    filter.status = status;
  }

  const [events, total] = await Promise.all([
    Event.find(filter)
      .select("-__v")
      .populate("createdBy", "name email")
      .populate("seasonId", "title")
      .sort(String(sort))
      .skip(skip)
      .limit(currentLimit)
      .lean(),

    Event.countDocuments(filter),
  ]);

  const totalPages = Math.ceil(total / currentLimit);

  resHandler(res, 200, "events", {
    events,
    pagination: {
      currentPage,
      limit: currentLimit,
      total,
      totalPages,
    },
  });
});

export const getEventsStats = catchAsync(async (req, res, next) => {
  const [totalEvents, scheduled, running, finished] = await Promise.all([
    Event.countDocuments(),
    Event.countDocuments({ status: "scheduled" }),
    Event.countDocuments({ status: "running" }),
    Event.countDocuments({ status: "finished" }),
  ]);

  resHandler(res, 200, "stats", {
    total: totalEvents,
    scheduled,
    running,
    finished,
  });
});

export const getEvent = getOne(Event);
export const createEvent = catchAsync(async (req, res, next) => {
  const status =
    new Date(req.body.startTime) > new Date() ? "scheduled" : "running";

  if (status === "running") {
    const runningEvent = await Event.exists({ status: "running" });
    if (runningEvent)
      return next(
        new AppError(
          "Invalid operation, there is already a running event. Only one event can be running at a time.",
          400,
        ),
      );
  }

  const newEvent = await Event.create({
    title: req.body.title,
    createdBy: req.user._id,
    seasonId: req.body.seasonId,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    maxAttempts: req.body.maxAttempts,
    status,
  });

  await logAudit({
    actor: req.user._id,
    action: "event.created",
    target: newEvent._id,
    targetModel: "Event",
  });

  resHandler(res, 201, "newEvent", newEvent);
});

export const updateEvent = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (req.body.status === "running") {
    const anotherRunning = await Event.exists({
      _id: { $ne: id },
      status: "running",
    });
    if (anotherRunning)
      return next(
        new AppError(
          "Invalid operation, there is already a running event. Only one event can be running at a time.",
          400,
        ),
      );
  }

  const updatedEvent = await Event.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedEvent) return next(new AppError("There is no such a event.", 404));

  await logAudit({
    actor: req.user._id,
    action: "event.updated",
    target: updatedEvent._id,
    targetModel: "Event",
  });

  resHandler(res, 200, "updatedEvent", updatedEvent);
});

export const deleteEvent = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const event = await Event.findById(id);
  if (!event) return next(new AppError("There is no such a event.", 404));

  const runningSessions = await Session.countDocuments({
    eventId: id,
    status: "running",
  });
  if (runningSessions > 0)
    return next(
      new AppError(
        "Invalid operation, can't delete an event while it has running sessions.",
        400,
      ),
    );

  const session = await mongoose.startSession();
  try {
    await session.startTransaction();

    await Session.deleteMany({ eventId: id }).session(session);
    await Leaderboard.deleteMany({ eventId: id }).session(session);
    await Event.deleteOne({ _id: id }).session(session);

    await logAudit({
      actor: req.user._id,
      action: "event.deleted",
      target: event._id,
      targetModel: "Event",
    });

    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    return next(error);
  } finally {
    session.endSession();
  }

  res.status(204).send();
});
