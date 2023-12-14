import express from "express";
import * as expressWinston from "express-winston";
import swaggerUi from "swagger-ui-express";

import swaggerDocs from "./swagger.json";
import db from "./models/index";
import userRoutes from "./routes/UserRoutes";
import urlRoutes from "./routes/UrlRoutes";
import { getShortedHandle } from "./controllers/url/getShorted/get";
import { format, transports } from "winston";
import { createDB } from "./config/db-config";


const app = express();
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

app.listen("8080", async () => {
  await createDB();
  await db.sync();
  console.log(`App is runing on http://localhost:8080`);
});

