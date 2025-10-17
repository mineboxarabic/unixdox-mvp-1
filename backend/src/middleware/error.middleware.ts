import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errors.util';
import { sendError } from '../utils/response.util';

/**
 * Global error handling middleware
 * Must be registered AFTER all routes
 */
export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Log error for debugging
  console.error('Error:', err);

  // Handle known AppErrors
  if (err instanceof AppError) {
    return sendError(res, err.message, err.statusCode);
  }

  // Handle Mongoose validation errors
  if (err.name === 'ValidationError') {
    return sendError(res, 'Erreur de validation', 400, [err.message]);
  }

  // Handle Mongoose CastError (invalid ObjectId)
  if (err.name === 'CastError') {
    return sendError(res, 'ID invalide', 400);
  }

  // Handle MongoDB duplicate key error
  if ('code' in err && err.code === 11000) {
    return sendError(res, 'Cette ressource existe déjà', 409);
  }

  // Handle JWT errors
  if (err.name === 'JsonWebTokenError') {
    return sendError(res, 'Token invalide', 401);
  }

  if (err.name === 'TokenExpiredError') {
    return sendError(res, 'Token expiré', 401);
  }

  // Default error response
  return sendError(
    res,
    process.env.NODE_ENV === 'production' 
      ? 'Une erreur est survenue' 
      : err.message,
    500
  );
};

/**
 * 404 Not Found handler
 */
export const notFoundHandler = (req: Request, res: Response) => {
  return sendError(res, `Route non trouvée: ${req.originalUrl}`, 404);
};

/**
 * Async error wrapper
 * Wraps async route handlers to catch errors automatically
 */
export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
