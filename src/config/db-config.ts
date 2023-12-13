import {
  dbDataBase,
  dbHost,
  dbPassword,
  dbPort,
  dbUser,
} from "../environment/config";

export const dbConfig = {
  HOST: dbHost,
  USER: dbUser,
  PASSWORD: dbPassword,
  DATABASE: dbDataBase,
  DIALECT: "mysql",
  PORT: dbPort as number,
};
