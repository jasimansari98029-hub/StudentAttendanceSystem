import { userSchema } from "./user.js";
import z from "zod";

const loginSchema = z.object({
  email: z.email(),
  password: z.string(),
});

const registerSchema = userSchema;

const forgotPasswordSchema = z.object({
  email: z.email(),
});

const resetPasswordSchema = z.object({
  password: z.string(),
});

export {
  loginSchema,
  registerSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
};