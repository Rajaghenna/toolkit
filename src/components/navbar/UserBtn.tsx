"use client";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const UserBtn = () => {
  const pathname = usePathname();
  return (
    <nav className="flex justify-between items center p-4 rounded-xl w-[600px] shadow-sm">
      <div className="flex gap-x-2">
        <Button
          asChild
          variant={pathname === "/server" ? "myColor" : "outline"}
        >
          <Link href="/server">Server</Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/client" ? "myColor" : "outline"}
        >
          <Link href="/client">Client</Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/settings" ? "myColor" : "outline"}
        >
          <Link href="/settings">Settings</Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/profile" ? "myColor" : "outline"}
        >
          <Link href="/Profile">Profile</Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/admin" ? "myColor" : "outline"}
        >
          <Link href="/admin">Admin</Link>
        </Button>
      </div>
    </nav>
  );
};

export default UserBtn;