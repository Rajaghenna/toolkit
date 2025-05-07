import Image from "next/image";
import React from "react";
import Link from "next/link";

const Logo = () => {
  return (
    <>
      <div>
        <Link href="/">
          <Image
            className="hidden md:block"
            src="/images/bowler.jpg"
            alt="logo"
            width={70}
            height={70}
          />
        </Link>
      </div>
    </>
  );
};

export default Logo;