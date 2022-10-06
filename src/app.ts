import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express, { NextFunction, Request as ExRequest, Response as ExResponse } from 'express';
import swaggerUi from 'swagger-ui-express';
import { ValidateError } from 'tsoa';

// if routes don't exist, run `yarn run dev` first, refer to readme
import { RegisterRoutes } from '../build/routes';
import setupDb from './db/setup';

dotenv.config();

export const app = express();

// create or drop and create all the tables
setupDb(process.env.RESET_ON_RELOAD === "true");

// Use body parser to read sent json payloads
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());

RegisterRoutes(app);

app.use("/docs", swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
  if (process.env.APP_ENV === "production") {
    return res.send("Docs not available on production");
  }
  return res.send(
    swaggerUi.generateHTML(await import("../build/swagger.json"))
  );
});

app.use(function notFoundHandler(_req, res: ExResponse) {
  // if no matching endpoint
  res.status(404).send({
    message: "Not Found",
  });
});

app.use(function errorHandler(
  err: unknown,
  req: ExRequest,
  res: ExResponse,
  next: NextFunction
): ExResponse | void {
  if (err instanceof ValidateError) {
    console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
    return res.status(422).json({
      message: "Validation Failed",
      details: err?.fields,
    });
  }
  if (err instanceof Error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }

  next();
});
