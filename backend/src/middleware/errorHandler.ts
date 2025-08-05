import { Request, Response, NextFunction } from 'express';

export interface ErrorResponse extends Error {
  statusCode?: number;
  code?: number;
  keyValue?: any;
  errors?: any;
}

export const errorHandler = (
  err: ErrorResponse,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error = { ...err };
  error.message = err.message;

  // Log error
  console.error(err.stack);

  // MySQL duplicate key error
  if ((err as any).code === 'ER_DUP_ENTRY' || (err as any).errno === 1062) {
    const message = 'Duplicate field value entered';
    error = { message, statusCode: 400 } as ErrorResponse;
  }

  // MySQL foreign key constraint error
  if ((err as any).code === 'ER_NO_REFERENCED_ROW_2' || (err as any).errno === 1452) {
    const message = 'Referenced resource not found';
    error = { message, statusCode: 400 } as ErrorResponse;
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    const message = 'Invalid token';
    error = { message, statusCode: 401 } as ErrorResponse;
  }

  if (err.name === 'TokenExpiredError') {
    const message = 'Token expired';
    error = { message, statusCode: 401 } as ErrorResponse;
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};
