import { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  role: "ADMIN" | "USER";
  id: string|undefined;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser &
      User & {
        role: "ADMIN" | "USER";
        id: string|undefined;
      };
  }
}

//add fields here to fetch on server frontend ui
