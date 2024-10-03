"use client";
import Link from "next/link";

const Logo = () => {
  return (
    <div className="text-4xl md:block cursor-pointer dark:text-white rounded-sm p-2 flex flex-col items-center justify-center">
      <Link href="/">🏆?🤞</Link>
      <p className="text-sm mt-2 ">Skills|Luck</p>
    </div>
  );
};

export default Logo;