"use client";
import Categories from "./Categories";
import Logo from "./Logo";
import Search from "./Search";
import CartCount from "./CartCount";

import DropDown from "./DropDown";
import { DarkMode } from "../theme/DarkMode";
import Container from "../main/Container";
import { useCurrentUser } from "@/hooks/useCurrentUser";


const Navbar = () => {
  const currentUser= useCurrentUser()
  return (
    <div className="fixed w-full z-10  border-b-2 border-orange-2 box-shadow-none bg-white dark:bg-black">
      <div
        className="
        py-4
      "
      >
        <Container>
          <div
            className="
          flex
          flex-row
          items-center
          justify-between
          gap-3
          md:gap-0
         "
          >
            <Logo />
            <Search />
            <CartCount />
            <DarkMode />
            <DropDown currentUser={currentUser} userRole="ADMIN"/>
          </div>
        </Container>
      </div>
      <Categories />
    </div>
  );
};
export default Navbar;