import { z } from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { users } from "../../db/tables.js";

// Drizzle-generated schemas
export const insertUserSchema = createInsertSchema(users);
export const selectUserSchema = createSelectSchema(users);

// DTOs and validation schemas
export const createUserDto = z.object({
  username: z.string().min(3).max(50),
  email: z.string().email(),
  fullName: z.string().min(1).max(100),
  bio: z.string().optional(),
  avatar: z.string().url().optional(),
});

export const updateUserDto = createUserDto.partial();

export const getUserParamsDto = z.object({
  id: z.string().transform(val => parseInt(val)).refine(val => !isNaN(val), {
    message: "Invalid user ID"
  }),
});

// Type exports
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
