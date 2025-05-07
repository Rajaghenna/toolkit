import React from "react";
import Image from "next/image";

const Avatar = () => {
  return (
    <>
      <Image
        className="rounded-full hover:bg-orange-500 hover:text-white"
        src="/images/placeholder.jpg"
        alt="avatar"
        width={30}
        height={30}
      />
    </>
  );
};

export default Avatar;