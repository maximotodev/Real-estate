import { API_CODES, ERROR_MESSAGES } from '../../../lib/constants';

export class ApiError extends Error {
  constructor(message, statusCode = API_CODES.SERVER_ERROR, details = null) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    this.name = 'ApiError';
  }
}

export class ValidationError extends ApiError {
  constructor(message, errors = {}) {
    super(message, API_CODES.BAD_REQUEST);
    this.errors = errors;
    this.name = 'ValidationError';
  }
}

export class AuthError extends ApiError {
  constructor(message = ERROR_MESSAGES.UNAUTHORIZED) {
    super(message, API_CODES.UNAUTHORIZED);
    this.name = 'AuthError';
  }
}

export class NotFoundError extends ApiError {
  constructor(resource = 'Resource') {
    super(`${resource} not found`, API_CODES.NOT_FOUND);
    this.name = 'NotFoundError';
  }
}

export const errorHandler = (err, req, res) => {
  let statusCode = API_CODES.SERVER_ERROR;
  let message = ERROR_MESSAGES.SERVER_ERROR;
  let errorData = null;

  // Handle custom API errors
  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
    if (err instanceof ValidationError) {
      errorData = { errors: err.errors };
    }
  }
  // Handle MongoDB errors
  else if (err.name === 'MongoError' || err.name === 'MongoServerError') {
    statusCode = API_CODES.SERVER_ERROR;
    message = 'Database error occurred';
    if (err.code === 11000) {
      const field = Object.keys(err.keyPattern)[0];
      statusCode = API_CODES.CONFLICT;
      message = `${field} already exists`;
    }
  }
  // Handle validation errors
  else if (err.name === 'ValidationError') {
    statusCode = API_CODES.BAD_REQUEST;
    message = 'Validation failed';
    errorData = { errors: err.errors };
  }
  // Handle JWT errors
  else if (err.name === 'JsonWebTokenError') {
    statusCode = API_CODES.UNAUTHORIZED;
    message = 'Invalid token';
  }
  // Handle mongoose CastError
  else if (err.name === 'CastError') {
    statusCode = API_CODES.BAD_REQUEST;
    message = 'Invalid ID format';
  }

  // Log error details
  const logData = {
    timestamp: new Date().toISOString(),
    path: req.url,
    method: req.method,
    statusCode,
    error: message,
    userId: req.user?.id || 'anonymous',
  };

  if (process.env.NODE_ENV === 'development') {
    console.error('[API Error]', logData, err);
  } else if (statusCode >= 500) {
    // In production, log server errors for monitoring
    console.error('[Server Error]', logData);
  }

  return res.status(statusCode).json({
    success: false,
    error: message,
    ...(errorData && errorData),
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

// Wrapper for async route handlers
export const asyncHandler = (handler) => {
  return async (req, res) => {
    try {
      await handler(req, res);
    } catch (err) {
      errorHandler(err, req, res);
    }
  };
};
