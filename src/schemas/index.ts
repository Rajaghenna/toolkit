import * as z from "zod";

export const NewPasswordSchema = z.object({
  password: z.string().min(6,{
    message: "Too short,Password must be 6 character(s)",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email Required",
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email Required",
  }),
  password: z.string().min(1, {
    message: "Password Required",
  }),
  code:z.optional(z.string())
});

export const RegisterSchema = z.object({
  name: z.string().min(1, {
    message: "Name Required",
  }),
  email: z.string().email({
    message: "Email Required",
  }),
  password: z
    .string()
    .min(1, { message: "This is required" })
    .min(6, { message: "Too short,Password must be 6 character(s)" }),
});

export const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Please Enter your Name" }),
  email: z.string().email({ message: "please enter a valid email" }),

  message: z.string().min(10, {
    message: "Please make sure your message ius at least 10 characters long",
  }),
});
