import { dbConfig } from "../config/db-config";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  dbConfig.DATABASE,
  dbConfig.USER,
  "JPhv2002@@",
  {
    host: dbConfig.HOST,
    dialect: "mysql",
    port: dbConfig.PORT,
  }
);

export default sequelize;
