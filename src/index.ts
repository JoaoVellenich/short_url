import express from "express";
import db from "./models/index";
import userRoutes from "./routes/UserRoutes";

const app = express();
app.use(express.json());

app.use("/api/users", userRoutes);

app.listen("8080", async () => {
  await db.sync();
  console.log(`App is runing on http://localhost:8080`);
});
