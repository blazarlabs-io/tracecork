import { z } from "zod";

export const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address, please enter a valid email address."),
  password: z.string().min(1, "Password is required"),
});
