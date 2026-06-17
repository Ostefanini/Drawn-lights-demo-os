import { Injectable, NestMiddleware } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { NextFunction, Request, Response } from 'express';

/**
 * Reads the X-Request-ID header from the incoming request (or generates a new
 * UUID v4) and:
 *  1. Overwrites req.headers['x-request-id'] so that pino-http's genReqId can
 *     read a guaranteed string (even for generated IDs).
 *  2. Sets the X-Request-ID response header so callers can correlate logs.
 */
@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    const requestId =
      (req.headers['x-request-id'] as string | undefined) ?? randomUUID();

    // Normalise to string so genReqId always receives a string
    req.headers['x-request-id'] = requestId;
    res.setHeader('X-Request-ID', requestId);

    next();
  }
}
