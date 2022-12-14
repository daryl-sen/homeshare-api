import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express, { Request as ExRequest, Response as ExResponse } from 'express';
import swaggerUi from 'swagger-ui-express';

// if routes don't exist, run `yarn run dev` first, refer to readme
import { RegisterRoutes } from '../build/routes';
import { generalErrorHandler, notFoundError } from './common/errorHandlers';
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

app.use(notFoundError);

app.use(generalErrorHandler);
