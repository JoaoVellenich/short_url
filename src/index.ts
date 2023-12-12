import express from "express";
import db from "./models/index";
import userRoutes from "./routes/UserRoutes";
import urlRoutes from "./routes/UrlRoutes";

const app = express();
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/url", urlRoutes);

app.listen("8080", async () => {
  await db.sync();
  console.log(`App is runing on http://localhost:8080`);
});
