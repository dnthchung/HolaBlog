import { z } from "zod";

// Import existing schemas from db/schema.ts for consistency
export { insertUserSchema, selectUserSchema } from "../../db/schema.js";

// Additional DTOs and validation schemas can be added here
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
