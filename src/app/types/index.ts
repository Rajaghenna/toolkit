import { Listing, Reservation } from "@prisma/client";
import { User, type DefaultSession } from "next-auth";
import { UserRole } from "@prisma/client";
import type { Adapter } from "next-auth/adapters";

declare module "next-auth" {
  interface Session {
    user: ExtendedUser | Adapter|User|SafeUser;
  }
}

export type SafeUser=
  | (DefaultSession & User)
  | (User & {
      id: string;
      role: UserRole;
      isTwoFactorEnabled: boolean;
      isOAuth: boolean;
      profile:string;
      password:string;
      newPassword:string
  });


export type SafeListing = Omit<Listing, "createdAt"> & {
  createdAt: string;
};

export type SafeReservation = Omit<
  Reservation,
  "createdAt" | "startDate" | "endDate" | "listing"
> & {
  createdAt: string;
  startDate: string;
  endDate: string;
  listing: SafeListing;
};

export type ExtendedUser =
  | Omit<
      User,
      | "createdAt"
      | "updatedAt"
      | "emailVerified"
      | "id"
      | "name"
      | "email"
      | "hashedPassword"
      | "password"
      | "role"
      | "Role"
      | "isTwoFactorEnabled"
      | "twoFactorConfirmation"
      |  "image"
      | "favouriteIds[]"
    >
  | (null & {
      createdAt: string;
      updatedAt: string;
      emailVerified: string | null;
      id: string;
      name: string | null;
      email: string | null;
      hashedPassword: string | null;
      role: string | null;
      Role: string | null;
      password: string | null;
      isTwoFactorEnabled?: boolean;
      twoFactorConfirmation?: boolean;
      image: string | null;
      favouriteIds: string[];
    });
