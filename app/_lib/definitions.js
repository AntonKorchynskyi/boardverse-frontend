import { z } from "zod";

export const SignupFormSchema = z.object({
  userName: z.string().min(2, "Name must be at least 2 characters"),
  userEmail: z.string().email("Invalid email format"),
  userPassword: z.string().min(6, "Password must be at least 6 characters"),
});

export const LoginFormSchema = z.object({
  userEmail: z.string().email("Invalid email format"),
  userPassword: z.string().min(6, "Password must be at least at least 6 characters"),
})