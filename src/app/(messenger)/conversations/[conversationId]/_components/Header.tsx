"use client";
import AvatarImg from "@/components/main/Avatar";
import useOtherUser from "@/messHooks/useOtherUser";
import { Conversation, User } from "@prisma/client";
import Link from "next/link";
import React, { useMemo } from "react";
import { HiChevronLeft } from "react-icons/hi";
import { HiEllipsisHorizontal } from "react-icons/hi2";


interface HeaderProps {
  conversation: Conversation & {
    users: User[];
  };
}

const Header: React.FC<HeaderProps> = ({ conversation }) => {
  const otherUser = useOtherUser(conversation);
  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      //dnt show members status online or offline just how many members in agroup
      return `${conversation.users.length}members`;
    }
    //this active will be shown according pusher status means have to set accordingly
    return "Active";
  }, [conversation]);
  return (
    <div
      className="
    bg-white
    w-full
    flex
    border-b-[1px]
    sm:px-4
    py-3
    px-4
    lg:px-6
    justify-between
    items-center
    shadow-sm
    "
    >
      <div className="flex gap-3 items-center">
        {/* mobileonly chevron back */}
        <Link
          className="
        lg:hidden
        block
        text-sky-500
        hover:text-sky-700
        transition
        cursor-pointer
        "
          href="/conversations"
        >
          <HiChevronLeft size={32} />
        </Link>
        <AvatarImg user={otherUser} />
        <div className="flex flex-col">
          <div>{conversation.name || otherUser.name}</div>
          <div className="text-sm font-light">
            {statusText}
          </div>
        </div>
      </div>
      <HiEllipsisHorizontal size={32}
      onClick={()=>{}}
      className="
       cursor-pointer
       hover:text-sky-500
       transition
      "
      />
    </div>
  );
};

export default Header;
