import cors from "cors";
// eslint-disable-next-line import-helpers/order-imports
import express, { Request, Response, NextFunction } from "express";

import "reflect-metadata";
import "dotenv/config";
import swaggerUi from "swagger-ui-express";

import { AppError } from "@shared/errors/AppError";
// eslint-disable-next-line import-helpers/order-imports
import createConnection from "@shared/infra/typeorm";

// eslint-disable-next-line import-helpers/order-imports
import upload from "@config/upload";

// eslint-disable-next-line import-helpers/order-imports
import swaggerFile from "../../../swagger.json";
import "@shared/container";
import "express-async-errors";

import { routes } from "./routes";

createConnection();

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`));
app.use("/avatar", express.static(`${upload.tmpFolder}/cars`));

app.use(cors());

app.use(routes);

app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({ message: err.message });
    }

    return response.status(500).json({
      error: 500,
      message: err.message,
    });
  }
);

export { app };
