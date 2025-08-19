import { z } from "zod";

// Base schemas
export const insertUserSchema = z.object({
  username: z.string().max(50),
  email: z.string().email().max(100),
  fullName: z.string().max(100).optional(),
  bio: z.string().optional(),
  avatar: z.string().max(255).optional(),
});

export const selectUserSchema = z.object({
  id: z.number(),
  username: z.string(),
  email: z.string().email(),
  fullName: z.string().nullable(),
  bio: z.string().nullable(),
  avatar: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

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
export type User = z.infer<typeof selectUserSchema>;
export type NewUser = z.infer<typeof insertUserSchema>;
