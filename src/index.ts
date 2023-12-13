import express from "express";
import db from "./models/index";
import userRoutes from "./routes/UserRoutes";
import urlRoutes from "./routes/UrlRoutes";
import { getShortedHandle } from "./controllers/url/getShorted/get";

const app = express();
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/url", urlRoutes);

app.get("/:urlShorted", getShortedHandle);

app.listen("8080", async () => {
  await db.sync();
  console.log(`App is runing on http://localhost:8080`);
});
