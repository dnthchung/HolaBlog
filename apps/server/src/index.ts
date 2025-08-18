import "dotenv/config";
import cors from "cors";
import express from "express";
import { db } from "./db/index.js";
import apiRouter from "./api/index.js";

const app = express();

// CORS configuration
app.use(
  cors({
    origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(",") : ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// Parse JSON requests
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Root endpoint
app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "Welcome to HolaBlog API",
    version: "1.0.0",
    documentation: "/api",
  });
});

// API routes
app.use("/api", apiRouter);

const port = process.env.PORT || 3000;
app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
  // Kiểm tra kết nối DB khi khởi động
  try {
    await db.execute('SELECT 1');
    console.log('✅ Connected to MySQL database (via Docker)');
  } catch (error) {
    console.error('❌ Failed to connect to MySQL database:', error instanceof Error ? error.message : error);
  }
  if (process.env.DATABASE_URL) {
    console.log(`Database URL: ${process.env.DATABASE_URL}`);
  } else {
    console.warn('⚠️ DATABASE_URL is not set in environment variables');
  }
});
