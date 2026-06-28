// src/middleware/sanitize.ts
import { Request, Response, NextFunction } from "express";

export const sanitizeInput = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const sanitize = (obj: any): any => {
    if (!obj) return obj;
    for (const key of Object.keys(obj)) {
      if (key.startsWith("$") || key.includes(".")) {
        delete obj[key];
      } else if (typeof obj[key] === "object") {
        sanitize(obj[key]);
      }
    }
    return obj;
  };

  sanitize(req.body);
  sanitize(req.params);
  next();
};
