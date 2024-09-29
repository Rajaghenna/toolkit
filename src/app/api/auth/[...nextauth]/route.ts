import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { handlers } from "@/auth"; // Referring to the auth.ts we just created
export const { GET, POST } = handlers;



export const authConfig = {
  // Configure one or more authentication providers
  providers: [
        EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
};
export default NextAuth(authConfig);