import { z } from "zod";

// Zod schema for Course
const CourseSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(100, "Title cannot exceed 100 characters"),
  description: z
    .string()
    .trim()
    .min(1, "Description is required")
    .max(1000, "Description cannot exceed 1000 characters"),
  price: z
    .number()
    .positive("Price must be a positive number")
    .min(0.01, "Price must be at least 0.01"),
  thumbnail: z
    .string()
    .url("Thumbnail must be a valid URL")
    .refine((url) => /^https?:\/\//.test(url), "Thumbnail must start with http:// or https://"),
  videos: z
    .array(z.string())
    .optional(), // Optional field
});

export default CourseSchema;
