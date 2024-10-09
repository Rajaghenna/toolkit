"use client";
import React from "react";
import Link from "next/link";
import clsx from "clsx";

interface MobileItemProps {
  href: string;
  icon: any | undefined;
  active?: boolean;
  onClick?: () => void;
}

const MobileItem: React.FC<MobileItemProps> = ({
  href,
  icon: Icon,
  active,
  onClick,
}) => {
  const handleClick=()=>{
    if(onClick){
      return onClick()
    }
  }
  return (
    <Link
      href={href}
      onClick={handleClick}
      className={clsx(`
      group
      flex
      gap-x-3
      text-sm
      leading-6
      font-semibold
      w-full
      justify-center
      p-4
      text-gray-800
      hover:text-black
      hover:bg-gray-200`,
        active && "bg-gray-200 text-black"
      )}
    >
      <Icon className="h-6 w-6" />
    </Link>
  );
};

export default MobileItem;