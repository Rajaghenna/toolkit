import NextAuth from "next-auth";
import authConfig from "./authConfig";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/db";
import { getUserById } from "./data/user";
import { getTwoFactorConfirmationByUserId } from "./data/twoFactorConfirmation";
import { getAccountByUserId } from "./data/account";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/signin",
    error: "/error",
  },
  events: {
    //Events does not returns resposnse so in events users logged in with its OAuth accounts
    //and emailverified field is automatically updated with current datetime
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    //block myself signin with verified email
    //allow OAuth without emailVerification
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;
      //if user already having email account means !== credentials
      //then only send magicEmail link else redirectTo="/register"
      const userExsits = await db.user.findFirst({
        where: {
          email: user.email,
        },
      });
      if (!userExsits) {
        return "/register";
      }
      const existingUser = await getUserById(user.id!);
      //user is not allowed to sign in with verified email
      if (!existingUser?.emailVerified) {
        return false;
      }
      //TODO:add 2FA HERE
      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser.id
        );
        //if dnt have confirmation token we are not allowed to access
        if (!twoFactorConfirmation) return false;
        //delete 2 factor conformation for next signin
        await db.twoFactorConfirmation.delete({
          where: { id: twoFactorConfirmation.id },
        });
      }
      //bydefault let login
      return true;
    },
    async session({ token, session }) {
      session.user.id = token.id;
      //check session token role is there now fetch role to show on our server component frontend display ui
      // console.log({sessionToken:token})
      //we can fetch fields or custome fields defined in jwt can be displayed in
      //server component session frontend display ui
      //here we fetch sub and attach with userid as id
      if (token.sub && session.user) {
        //with this we offically have user id displayed on session frontend ui
        session.user.id = token.sub;
      }
      //you can add any field in next-auth.d.ts file n then can easily fetched here using
      //session.user.fieldname
      //fetch role from jwt as we defined in jwt token
      if (token.role && session.user) {
        //with this role is displayed on /setting in session from auth()
        session.user.role = token.role;
        //fetch added 2FA enabled in jwt
        if (session?.user) {
          session.user.isTwoFactorEnabled = token.isTwoFactorEnabled;
        }
        //update name and email here also aswe updated in jwt but its not saved in db
        //it will be shown updated in client browser
        //to store updated name or change names have to do following
        if (session.user) {
          session.user.name = token.name;
          session.user.email = token.email;
          //add isOAuth also here n make it boolean 
          session.user.isOAuth=!!token.isOAuth
        }
      }
      return session;
    },
    // with jwt we can define custom fields that can we fetched n display on session frontend
    async jwt({ token, user }) {
      //Make profile fields
      if (user) {
        token.id = user.id;
      }
      // check my userid if !present tht means i nt loggedIn
      //return token means do nothing
      if (!token.sub) return token;
      //getUserbyId,token.sub means attached id as we fetched previously
      const existingUser = await getUserById(token.sub);
      //if user not loggedIn return token means do nothing
      if (!existingUser) return token;
      //get existing Account as we dnt have OAuth fb git goo accounts
      //so have to only update credentials which only we ahave in our database
      const existingAccount=await getAccountByUserId(
        existingUser.id
      )
      token.isOAuth =!!existingAccount //note changeds string to boolean by adding !! got it

      //updating name of user else will have to update manually
      token.name = existingUser.name;
      token.email = existingUser.email;
      //assign role to user
      //role assigned to userid
      token.role = existingUser.role;
      //we can render user can accept 2FA ON |OFF
      //add in jwt so that we can fetch n show in session as
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;
      return token;
    },
  },
  session: { strategy: "jwt" },
  ...authConfig,
  adapter: PrismaAdapter(db),
});