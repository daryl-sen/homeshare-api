import { NextFunction, Request as ExRequest, Response as ExResponse } from 'express';
import { ValidateError } from 'tsoa';

import { AuthenticationError, AuthorizationError, NotFoundError } from '../errors/index';
import { ErrorLoggingService } from './errorLoggingService';

export function generalErrorHandler(
  err: unknown,
  req: ExRequest,
  res: ExResponse,
  next: NextFunction
): ExResponse | void {
  // error logging
  new ErrorLoggingService(err);

  if (err instanceof ValidateError) {
    console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
    return res.status(err.status).json({
      message: "Validation Failed",
      details: err?.fields,
    });
  }

  if (err instanceof AuthorizationError) {
    return res.status(err.status).json({
      message: "Unauthorized access",
    });
  }

  if (err instanceof AuthenticationError) {
    return res.status(err.status).json({
      message: "Forbidden access",
    });
  }

  if (err instanceof NotFoundError) {
    return res.status(err.status).send({
      message: "Not Found",
    });
  }

  if (err instanceof Error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }

  next();
}

export function notFoundError(_req: ExRequest, res: ExResponse) {
  throw new NotFoundError("Endpoint not found");
}
