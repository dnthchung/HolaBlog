import "dotenv/config";
import cors from "cors";
import express from "express";
import { db } from "./db/index.js";
import apiRouter from "./api/index.js";
import logger from "./utils/logger.js";
import { 
  errorMiddleware, 
  notFoundMiddleware, 
  requestLoggerMiddleware 
} from "./middlewares/error.middleware.js";

const app = express();

// Request logging middleware (should be first)
app.use(requestLoggerMiddleware);

// CORS configuration
app.use(
  cors({
    origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(",") : ["http://localhost:3000"],
    methods: process.env.CORS_METHODS ? process.env.CORS_METHODS.split(",") : ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: process.env.CORS_CREDENTIALS === "true",
  })
);

// Parse JSON requests
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Root endpoint
app.get("/", (_req, res) => {
  const apiVersion = process.env.API_VERSION || "v1";
  res.json({
    success: true,
    message: "Welcome to HolaBlog API",
    version: "1.0.0",
    documentation: `/api/${apiVersion}`,
  });
});

// API routes with versioning
const apiVersion = process.env.API_VERSION || "v1";
app.use(`/api/${apiVersion}`, apiRouter);

// 404 handler (should be after all routes)
app.use(notFoundMiddleware);

// Global error handler (should be last)
app.use(errorMiddleware);

const port = process.env.PORT || 3000;
app.listen(port, async () => {
  logger.info(`🚀 Server is running on port ${port}`);
  
  // Check database connection on startup
  try {
    await db.$connect();
    logger.info('✅ Connected to PostgreSQL database (via Docker)');
  } catch (error) {
    logger.error('❌ Failed to connect to PostgreSQL database:', error instanceof Error ? error.message : error);
    logger.info(`Database URL: ${process.env.DATABASE_URL}`);
  }
  
  if (process.env.DATABASE_URL) {
    logger.info(`Database URL: ${process.env.DATABASE_URL}`);
  } else {
    logger.warn('⚠️ DATABASE_URL is not set in environment variables');
  }
});
