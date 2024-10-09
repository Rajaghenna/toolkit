"use client";
import React, { useCallback, useState } from "react";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import axios from "axios";
import AvatarImg from "../main/Avatar";

interface UserBoxProps {
  data: User;
}

const UserBox: React.FC<UserBoxProps> = ({ data }) => {
  const router = useRouter();
  const [isLoading, SetIsLoading] = useState(false);
  const handleClick = useCallback(() => {
    SetIsLoading(true);
    //here private chat is insiatated with clicking on it
    axios
      .post("/api/conversations", {
        userId: data.id,
      })
      .then((data) => {
        router.push(`/conversations/${data.data.id}`);
      })
      .finally(() => {
        SetIsLoading(false);
      });
  }, [data, router]);
  return (
    <div
      onClick={handleClick}
      className="
    w-full
    relative
    flex
    items-center
    space-x-3
    bg-white
    p-3
    hover:bg-neutral-200
    rounded-lg
    transition
    cursor pointer
    "
    >
      <AvatarImg user={data}/>
      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <div
            className="
          flex
          justify-between
          items-center
          mb-1
          "
          >
            <p className="text-sm font-medium">{data.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBox;
