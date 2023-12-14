import { app } from "./app";
import { createDB } from "./config/db-config";
import db from "./models/index";

app.listen("8080", async () => {
  await createDB();
  await db.sync();
  console.log(`App is runing on http://localhost:8080`);
});
