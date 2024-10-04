import React from "react";
import DesktopSideBar from "./DesktopSideBar";
import MobileFooter from "./MobileFooter";
import getCurrentUser from "@/actionserver/mesActions/getCurrentUser";

async function SideBar({ children }: { children: React.ReactNode }) {
  const currentUser = await getCurrentUser()
  return (
    <div className="h-full">
      <DesktopSideBar currentUser={currentUser!} src={""}/>
      <MobileFooter/>
      <main className="lg:pl-20 h-full">{children}</main>
    </div>
  );
}

export default SideBar;