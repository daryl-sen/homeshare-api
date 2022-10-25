import * as express from 'express';
import * as jwt from 'jsonwebtoken';

import { ErrorLoggingService } from './src/common/errorLoggingService';
import { AuthenticationError } from './src/errors';

export const APP_SECRET_KEY: string =
  process.env.APP_SECRET_KEY || "my-secret-key";

export function expressAuthentication(
  request: express.Request,
  _tokenType: string,
  scopes?: string[]
) {
  const token = request.headers["x-access-token"] as string | undefined;

  return new Promise((resolve, reject) => {
    jwt.verify(
      token as string,
      APP_SECRET_KEY,
      function (err: any, decoded: any) {
        if (err || !scopes) {
          const error = new AuthenticationError(err.message);
          reject(error);
        } else {
          resolve(decoded);
        }
      }
    );
  });
}
