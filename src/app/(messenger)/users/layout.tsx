import getUsers from "@/actionserver/mesActions/getUsers";
import SideBar from "@/components/messenger/SideBar";
import UserList from "../../../components/messenger/UserList";
import AuthContext from "@/app/(contextProviders)/AuthContext";

export default async function UsersLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // as this is server component we can call users directly without api call
  const users =await getUsers();
  return (
    <AuthContext>
      <SideBar>
        <div className="h-full">
          <UserList items={users} />
          {children}
        </div>
      </SideBar>
    </AuthContext>
  );
}
