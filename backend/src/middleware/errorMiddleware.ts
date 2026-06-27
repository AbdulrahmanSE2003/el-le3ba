import { Request, Response, NextFunction } from "express";

// 1. Handle Invalid Database IDs (e.g., trying to fetch /api/v1/products/123)

function handleCastErrorDB(err: any) {
  const message = `Invalid ${err.path}: ${err.value}.`;

  return { statusCode: 400, status: "fail", message };
}

// 2. Handle MongoDB Duplicate Fields (Your current function)

function handleDuplicateFieldsDB(err: any) {
  const keyValue = err.errorResponse?.keyValue || err.keyValue;

  let message = "Duplicate field value entered. Please use another value!";

  if (keyValue) {
    const field = Object.keys(keyValue)[0];

    const value = keyValue[field];

    message = `Duplicate field value: "${value}" for field: "${field}". Please use another value!`;
  } else if (err.errmsg || err.message) {
    const targetString = err.errmsg || err.message;

    const match = targetString.match(/(["'])(?:(?=(\\?))\2.)*?\1/);

    if (match) {
      message = `Duplicate field value: ${match[0]}. Please use another value!`;
    }
  }

  return { statusCode: 400, status: "fail", message };
}

// 3. Handle Mongoose Schema Validation Failures (e.g., missing required fields)

function handleValidationErrorDB(err: any) {
  const errors = Object.values(err.errors).map((el: any) => el.message);

  const message = `Invalid input data. ${errors.join(" ")}`;

  return { statusCode: 400, status: "fail", message };
}

// Main Global Error Handler Middleware

export function globalErrorHandler(
  err: any,

  req: Request,

  res: Response,

  next: NextFunction,
) {
  let error = { ...err };

  error.message = err.message;

  error.statusCode = err.statusCode || 500;

  error.status = err.status || "error";

  // DB Error Layer Interception

  if (err.name === "CastError") {
    const handled = handleCastErrorDB(err);

    error.statusCode = handled.statusCode;

    error.status = handled.status;

    error.message = handled.message;
  }

  if (err.code === 11000) {
    const handled = handleDuplicateFieldsDB(err);

    error.statusCode = handled.statusCode;

    error.status = handled.status;

    error.message = handled.message;
  }

  if (err.name === "ValidationError") {
    const handled = handleValidationErrorDB(err);

    error.statusCode = handled.statusCode;

    error.status = handled.status;

    error.message = handled.message;
  }

  if (err.name === "JsonWebTokenError") {
    error.statusCode = 401;
    error.status = "fail";
    error.message = "Invalid token. Please log in again.";
  }

  if (err.name === "TokenExpiredError") {
    error.statusCode = 401;
    error.status = "fail";
    error.message = "Your token has expired. Please log in again.";
  }

  // Unified Clean JSON Response Output

  res.status(error.statusCode).json({
    status: error.status,

    message: error.message,

    ...(process.env.NODE_ENV === "development" && {
      stack: err.stack,

      error: err,
    }),
  });
}
