"use client";
import React from "react";

interface MenuItemProps {
  onClick: () => void;
  label: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ onClick, label }) => {
  return (
    <div
      onClick={onClick}
      className="
    px-4
    py-3
    hover:bg-orange-500
    hover:text-black
    transition
    font-semibold
    cursor-pointer
    rounded-md
    "
    >
      {label}
    </div>
  );
};

export default MenuItem;