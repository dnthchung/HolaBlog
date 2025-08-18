import "dotenv/config";
import { execSync } from "child_process";

async function setup() {
  console.log("🚀 Setting up HolaBlog database...");

  try {
    // Start Docker containers
    console.log("🐳 Starting Docker containers...");
    execSync("docker-compose up -d", { stdio: "inherit" });

    // Wait for database to be ready
    console.log("⏳ Waiting for database to be ready...");
    await new Promise(resolve => setTimeout(resolve, 10000));

    // Push schema to database
    console.log("📊 Pushing database schema...");
    execSync("bun run db:push", { stdio: "inherit" });

    // Seed the database
    console.log("🌱 Seeding database with sample data...");
    execSync("bun run db:seed", { stdio: "inherit" });

    console.log("✅ Setup completed successfully!");
    console.log("\n📌 Next steps:");
    console.log("1. Run 'bun run dev' to start the development server");
    console.log("2. Visit http://localhost:3000 to see your API");
    console.log("3. Run 'bun run db:studio' to open Drizzle Studio");

  } catch (error) {
    console.error("❌ Setup failed:", error);
    process.exit(1);
  }
}

setup().catch(console.error);
