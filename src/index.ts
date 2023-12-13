import express from "express";
import * as expressWinston from "express-winston";

import db from "./models/index";
import userRoutes from "./routes/UserRoutes";
import urlRoutes from "./routes/UrlRoutes";
import { getShortedHandle } from "./controllers/url/getShorted/get";
import { format, transports } from "winston";

const app = express();
app.use(express.json());

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
  await db.sync();
  console.log(`App is runing on http://localhost:8080`);
});
