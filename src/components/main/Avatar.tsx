"use client";
// import Image from "next/image";
// import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";


interface AvatarProps {
  src: string | null | undefined;
}

const AvatarImg: React.FC<AvatarProps> = ({ src }) => {
  return (
    <Avatar>
      <AvatarImage src={src || "/images/placeholder.jpg"} />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
    // <Image
    //   className="
    // rounded-full
    // "
    //   src={src || "/images/placeholder.jpg"}
    //   height={30}
    //   width={30}
    //   alt="Avatar"
    // />
  );
};

export default AvatarImg;
