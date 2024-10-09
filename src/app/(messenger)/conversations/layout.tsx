import SideBar from "@/components/messenger/SideBar";
import ConversationList from "./_components/ConversationList";
import getConversations from "@/actionserver/mesActions/getConversations";

export default async function ConversationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversations = await getConversations();
  return (
    <SideBar>
      <div className="h-full">
        <ConversationList initialItems={conversations} />
        {children}
      </div>
    </SideBar>
  );
}
