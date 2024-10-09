import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { FullConversationType } from "@/app/types";
import { User } from "@prisma/client";

const useOtherUser = (
  conversation:
    | FullConversationType
    | {
        users: User[];
      }
) => {
  const session = useSession();
  const otherUser = useMemo(() => {
    const currentUserEmail = session?.data?.user.email;
    //filter users which is not using me email
    const otherUser = conversation.users.filter(
      (user) => user.email !== currentUserEmail
    );
    //here we pick first user from array which gurantee that is currentUser
    
    return otherUser[0];
  }, [session?.data?.user.email, conversation.users]);

  return otherUser;
};

export default useOtherUser;