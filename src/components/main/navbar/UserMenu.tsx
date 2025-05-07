"use client";
import React, { useCallback } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useState } from "react";
import MenuItem from "./MenuItem";
import { User } from "next-auth";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Settings, User2Icon } from "lucide-react";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";

interface UserMenuProps {
  currentUser?: SafeUser |User| null;
}

const UserMenu = ({ currentUser }: UserMenuProps) => {
  const router = useRouter();
  // const [isOpen, setIsOpen] = useState(false);

  // const toggleOpen = useCallback(() => {
  //   setIsOpen((value) => !value);
  // }, []);

  const signUp = () => {
    router.push("/register");
  };
  const signIn = () => {
    router.push("/signin");
  };

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={() => {}}
          className="
          hidden
           md:block
           text-sm
           font-semibold
           py-3
           px-4
           rounded-full
           hover:bg-neutral-100
           transition
           cursor-pointer
           "
        >
          Airbnb Home
        </div>
        <div
          // onClick={toggleOpen}
          className="
          p-4
          md:py-1
          md:px-2
          border-[1px]
          border-neutral-200
          flex
          flex-row
          items-center
          gap-3
          rounded-full
          cursor-pointer
          hover:shadow-md
          transition
          "
        >
          <div
            className="
          flex
          flex-col
          cursor-pointer
          "
          >
            {currentUser ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <AiOutlineMenu />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent sideOffset={10}>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <User2Icon className="h-[1.2rem] w-[1.2rem] mr-3" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="h-[1.2rem] w-[1.2rem] mr-3" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem>Team</DropdownMenuItem>
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => signOut()}
                      className="text-destructive"
                    >
                      <LogOut className="h-[1.2rem] w-[1.2rem] mr-3" />
                      LogOut
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <div
                  className="
                  p-4
                  md:py-1
                  md:px-2
                  border-[1px]
                  border-neutral-200
                  flex
                  flex-row
                  items-center
                  gap-3
                  rounded-full
                  cursor-pointer
                  hover:shadow-md
                  transition
                  "
                >
                  <div
                    className="
                   flex
                   flex-col
                   cursor-pointer
                   "
                  >
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <AiOutlineMenu />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent sideOffset={20}>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <MenuItem onClick={() => signIn()} label="SignIn" />
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <MenuItem onClick={() => signUp()} label="SignUp" />
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="hidden md:block">
            <Avatar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
