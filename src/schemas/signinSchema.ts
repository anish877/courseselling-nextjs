import { z } from "zod";

export const signinSchema = z.object({
    identifier: z.string().trim(),
    password: z.string().trim()
})