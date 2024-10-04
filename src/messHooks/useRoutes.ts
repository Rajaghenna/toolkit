import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { HiChat } from "react-icons/hi";
import {HiUsers} from "react-icons/hi";
import useConversation from "./useConversation";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";


const useRoutes=()=>{
  const pathname=usePathname()
  const {conversationId}=useConversation()

  const routes = useMemo(()=>[
    {
      label:"Chat",
      href:"/conversations",
      icon: HiChat,
      active: pathname === "/conversations"|| !!conversationId
    },
    {
      label:"Users",
      href:"/users",
      icon:HiUsers,
      active:  pathname === "/users"
    },
    {
      label:"LogOut",
      href:"#",
      icon: LogOut,
      onClick:()=>signOut()
    }
  ],[conversationId, pathname])
  return routes
}
export default useRoutes