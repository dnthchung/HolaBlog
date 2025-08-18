import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as tables from "./tables.js";

const connection = mysql.createPool({
  uri: process.env.DATABASE_URL,
});

export const db = drizzle(connection, { schema: tables, mode: "default" });

export { tables as schema };

