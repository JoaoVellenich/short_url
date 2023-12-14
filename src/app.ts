import express from "express";
import * as expressWinston from "express-winston";
import swaggerUi from "swagger-ui-express";

import swaggerDocs from "./swagger.json";

import userRoutes from "./routes/UserRoutes";
import urlRoutes from "./routes/UrlRoutes";
import { getShortedHandle } from "./controllers/url/getShorted/get";
import { format, transports } from "winston";

export const app = express();
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(
  expressWinston.logger({
    transports: [
      new transports.Console(),
      new transports.File({
        filename: "./log/logs.log",
      }),
      new transports.File({
        level: "warn",
        filename: "./log/warnLogs.log",
      }),
      new transports.File({
        level: "error",
        filename: "./log/errorLogs.log",
      }),
    ],
    format: format.combine(
      format.json(),
      format.timestamp(),
      format.prettyPrint()
    ),
    statusLevels: true,
  })
);

app.use("/api/users", userRoutes);
app.use("/api/url", urlRoutes);

app.get("/:urlShorted", getShortedHandle);
