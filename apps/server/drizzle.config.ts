import { defineConfig } from "drizzle-kit";
import { config } from "dotenv";

// Load environment variables from custom path
config({ path: "./env" });

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
  dialect: "mysql",
  dbCredentials: {
    url: process.env.DATABASE_URL || "",
  },
});
