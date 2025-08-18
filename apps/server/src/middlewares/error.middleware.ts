import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import logger from "../utils/logger.js";
import { HttpException } from "../utils/exceptions.js";

interface ErrorResponse {
  success: false;
  error: string;
  message?: string;
  details?: any;
  stack?: string;
  timestamp: string;
  path: string;
  method: string;
}

export const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Default values
  let status = 500;
  let message = "Internal Server Error";
  let details: any = undefined;

  // Create base error response
  const errorResponse: ErrorResponse = {
    success: false,
    error: message,
    timestamp: new Date().toISOString(),
    path: req.originalUrl,
    method: req.method,
  };

  // Handle different types of errors
  if (error instanceof HttpException) {
    // Custom HTTP exceptions
    status = error.status;
    message = error.message;
    details = error.details;
    errorResponse.error = message;
    errorResponse.details = details;
  } else if (error instanceof ZodError) {
    // Zod validation errors
    status = 400;
    message = "Validation Error";
    details = error.issues.map((err: any) => ({
      field: err.path.join("."),
      message: err.message,
      code: err.code,
    }));
    errorResponse.error = message;
    errorResponse.details = details;
  } else if (error.name === "CastError") {
    // Database casting errors (e.g., invalid ObjectId)
    status = 400;
    message = "Invalid ID format";
    errorResponse.error = message;
  } else if (error.name === "ValidationError") {
    // Database validation errors
    status = 400;
    message = "Validation Error";
    errorResponse.error = message;
    errorResponse.details = error.message;
  } else if (error.name === "MongoError" || error.name === "MongoServerError") {
    // MongoDB specific errors
    status = 500;
    message = "Database Error";
    errorResponse.error = message;
  } else if (error.message.includes("duplicate key")) {
    // Duplicate key errors
    status = 409;
    message = "Resource already exists";
    errorResponse.error = message;
  } else if (error.message.includes("ENOTFOUND") || error.message.includes("ECONNREFUSED")) {
    // Network/connection errors
    status = 503;
    message = "Service Unavailable";
    errorResponse.error = message;
  } else {
    // Generic errors
    errorResponse.error = error.message || message;
  }

  // Add stack trace in development
  if (process.env.NODE_ENV === "development") {
    errorResponse.stack = error.stack;
  }

  // Log the error
  logger.error(`${req.method} ${req.originalUrl} - ${status} - ${message}`, {
    error: error.message,
    stack: error.stack,
    body: req.body,
    params: req.params,
    query: req.query,
    user: (req as any).user?.id, // If you have user authentication
  });

  // Send error response
  res.status(status).json(errorResponse);
};

// 404 Not Found middleware (should be used after all routes)
export const notFoundMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const error = new HttpException(404, `Route ${req.originalUrl} not found`);
  next(error);
};

// Async error handler wrapper
export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// Request logging middleware
export const requestLoggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const start = Date.now();
  
  // Log request
  logger.http(`${req.method} ${req.originalUrl} - Started`, {
    method: req.method,
    url: req.originalUrl,
    userAgent: req.get("User-Agent"),
    ip: req.ip,
    body: req.method !== "GET" ? req.body : undefined,
  });

  // Log response when finished
  res.on("finish", () => {
    const duration = Date.now() - start;
    const level = res.statusCode >= 400 ? "warn" : "http";
    
    logger.log(level, `${req.method} ${req.originalUrl} - ${res.statusCode} - ${duration}ms`, {
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
    });
  });

  next();
};
