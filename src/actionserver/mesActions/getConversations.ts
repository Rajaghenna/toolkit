import { db } from "@/lib/db";
import getCurrentUser from "./getCurrentUser";

const getConversations = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser?.id) {
    return [];
  }

  try {
    //here we are asking conversation to show last recieved message from user
    //so that we can see from where conversation ws ended
    const conversations = await db.conversation.findMany({
      orderBy: {
        lastMessageAt: "desc", //means last message
      },
      //we are loading every conversation including 1 to 1 or group conversartion send
      where: {
        userIds: {
          has: currentUser.id,
        },
      },
      //this include means that show all details
      include: {
        users: true,
        //means include all messages means all usera also included inside
        messages: {
          include: {
            sender: true,
            seen: true,
          },
        },
      },
    });
    return conversations;
  } catch {
    return [];
  }
};

export default getConversations;