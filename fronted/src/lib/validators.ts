import * as z from "zod";

export const registerValidator = z
  .object({
    username: z.string().min(2, "Name must be at least 2 characters long"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z
      .string()
      .min(8, "Confirm Password must be at least 8 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginValidator = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});
