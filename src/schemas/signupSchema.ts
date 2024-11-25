import { z } from "zod";

// Username validation allowing spaces
export const usernameValidation = z
  .string()
  .trim()
  .min(2, "Username must be at least 2 characters") // Minimum length 2
  .max(20, "Username must not be longer than 20 characters") // Maximum length 20
  .regex(/^[a-zA-Z0-9 _]+$/, "Username can only contain alphanumeric characters, spaces, and underscores.");

// Phone number validation
export const phoneValidation = z
  .string()
  .trim()
  .regex(/^\+?[1-9]\d{1,14}$/, "Please provide a valid phone number without country code."); // E.164 validation

// Signup schema
export const signupSchema = z.object({
  username: usernameValidation,
  email: z.string().trim().email({ message: "Please provide a valid email address" }),
  password: z
    .string()
    .trim()
    .min(6, { message: "Password must be at least 6 characters" })
    .regex(/[A-Za-z]/, { message: "Password must contain at least one letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" }),
  phone: phoneValidation, // Add phone field
});
