import {
  dbDataBase,
  dbHost,
  dbPassword,
  dbPort,
  dbUser,
} from "../environment/config";

import * as mysql2 from "mysql2/promise";

export const dbConfig = {
  HOST: dbHost,
  USER: dbUser,
  PASSWORD: dbPassword,
  DATABASE: dbDataBase,
  DIALECT: "mysql",
  PORT: dbPort as number,
};

export async function createDB(): Promise<boolean> {
  const connection = await mysql2.createConnection({
    user: dbUser,
    password: dbPassword,
  });

  await connection.query(`CREATE DATABASE IF NOT EXISTS ${dbDataBase};`);
  return true;
}
