"use server";
import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { generateVerificationToken } from "@/lib/tokens";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/nodemailer";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }
  //destructure email,pass from validatedFields.data
  const { email, password } = validatedFields.data;
  //restrict user to login as verification token is sent to his email
  const existingUser = await getUserByEmail(email);
  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email Does Not Exsits" };
  }
  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );
    //have to use same sendVerficationEmail to login with link that is also configured in register too
    //after that you are not allowed to login with password as email link is resend again
    //note first parameter should be email n then token
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );
    return { success: "Re-Confirmation Email Sent!!" };
  }
  try {
    //user log in with email n pass provided creating account
    //if ok redirect using middleware default login to "/settings"
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentails" };
        default:
          return { error: "Something Went Wrong!!" };
      }
    }
    throw error;
  }
};
