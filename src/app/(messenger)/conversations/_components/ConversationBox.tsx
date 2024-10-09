"use client";
import { Conversation, Message, User } from "@prisma/client";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import clsx from "clsx";
import React, { useCallback, useMemo } from "react";
import { FullConversationType } from "@/app/types";
import useOtherUser from "@/messHooks/useOtherUser";
import { useRouter } from "next/navigation";
import AvatarImg from "@/components/main/Avatar";

interface ConversationBoxProps {
  data: FullConversationType;
  selected?: boolean;
}

const ConversationBox: React.FC<ConversationBoxProps> = ({
  data,
  selected,
}) => {
  const otherUser = useOtherUser(data);
  const session = useSession();
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push(`/conversations/${data?.id}`);
  }, [data.id, router]);
  //fetch last message in the conversation
  const lastMessage = useMemo(() => {
    const messages = data.messages || [];
    //last message
    return messages[messages.length - 1];
  }, [data.messages]);

  const userEmail = useMemo(() => {
    return session?.data?.user.email;
  }, [session?.data?.user.email]);

  //seen messages
  const hasSeen = useMemo(() => {
    if (!lastMessage) {
      return false;
    }
    const seenArray = lastMessage.seen || [];
    if (!userEmail) {
      return false;
    }
    return seenArray.filter((user) => user.email === userEmail).length !== 0;
  }, [userEmail, lastMessage]);

  const lastMessageText = useMemo(() => {
    //if message is a image else show as text
    if (lastMessage?.image) {
      return "Sent An Image";
    }
    if (lastMessage?.body) {
      return lastMessage.body;
    }
    //if both is not available that means we just started conversation n message will have to be write
    //in case of private chat or 1-2-1
    return "started a Conversation";
  }, [lastMessage]);
  return (
    <div
      onClick={handleClick}
      className={clsx(
        `
      w-full
      relative
      flex
      items-center
      space-x-3
      hover:bg-neutral-200
      rounded-lg
      transition
      p-2
      cursor-pointer`,
        selected ? "bg-neutral-200" : "bg-white"
      )}
    >
      <AvatarImg user={otherUser} />
      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <div
            className="
          flex
          justify-between
          items-center
          mb-1
          "
          >
            {/* groupName or usersName if group not avaiable */}
            {/* but if group was there primaraily group name will be used */}
            <p className="
            text-md
            font-medium
            ">{data.name || otherUser.name}</p>
            {/* check if we have last message */}
            {lastMessage?.createdAt &&(
              <p className="
              text-xs
              ">
                {/* this format show time for seen messages */}
                {format(new Date(lastMessage.createdAt),"p")}
              </p>
            )}
          </div>
          <p className={clsx(`
            truncate
            text-sm`,
            hasSeen?"text-gray-500":"text-black font-medium"
            )}>
            {/* how last message is show this can be an image also or text */}
            {lastMessageText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConversationBox;
