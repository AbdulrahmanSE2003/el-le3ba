import { Request, Response, NextFunction, RequestHandler } from "express";

import { catchAsync } from "./catchAsync";

import resHandler from "./resHandler";

import { AppError } from "./appError";

import APIFeatures from "./APIFeatures";

import { Model, PopulateOptions } from "mongoose";

export const getAll = <T>(
  Model: Model<T>,

  popOptions?: PopulateOptions | PopulateOptions[],
): RequestHandler => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const features = new APIFeatures(Model.find(), req.query)

      .filter()

      .sort()

      .limitFields()

      .paginate();

    const docs = await features.query;

    const label = `${Model.modelName.toLowerCase()}s`;

    resHandler(res, 200, label, docs);
  });
};

export const getOne = <T>(Model: Model<T>): RequestHandler => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const doc = await Model.findById(id);

    if (!doc) {
      return next(
        new AppError(
          `There is no such a ${Model.modelName.toLowerCase()}.`,

          404,
        ),
      );
    }

    const label = Model.modelName.toLowerCase();

    resHandler(res, 200, label, doc);
  });
};

export const createOne = <T>(Model: Model<T>): RequestHandler => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const newDoc = await Model.create(req.body);

    const label = `new${Model.modelName}`;

    resHandler(res, 201, label, newDoc);
  });
};

export const updateOne = <T>(Model: Model<T>): RequestHandler => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const updatedDoc = await Model.findByIdAndUpdate(id, req.body, {
      new: true,

      runValidators: true,
    });

    if (!updatedDoc) {
      return next(
        new AppError(
          `There is no such a ${Model.modelName.toLowerCase()}.`,

          404,
        ),
      );
    }

    const label = `updated${Model.modelName}`;

    resHandler(res, 200, label, updatedDoc);
  });
};

export const deleteOne = <T>(Model: Model<T>): RequestHandler => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const docToDelete = await Model.findByIdAndDelete(id);

    if (!docToDelete) {
      return next(
        new AppError(
          `There is no such a ${Model.modelName.toLowerCase()}.`,

          404,
        ),
      );
    }

    res.status(204).send();
  });
};
