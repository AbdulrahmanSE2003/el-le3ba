import Event from "../models/eventModel";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "../utils/factory";

export const getCurrentEvent = catchAsync(async (req, res, next) => {
  const event = await Event.findOne({ status: "running" });
  if (!event) return next(new AppError("No active event right now.", 404));
  resHandler(res, 200, "event", event);
});

export const getAllEvents = getAll(Event);

export const createEvent = createOne(Event);

export const getEvent = getOne(Event);

export const updateEvent = updateOne(Event);

export const deleteEvent = deleteOne(Event);
