import Navbar from "@/components/main/navbar/Navbar";
import "../globals.css";
import ClientOnly from "@/components/ClientOnly";
import ToasterProvider from "../providers/ToasterProvider";
import RegisterModal from "@/components/modals/RegisterModal";
import getCurrentUser from "@/actionserver/getCurrentUser";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
  }) {
  const currentUser= await getCurrentUser()
  return (
    <>
      <ClientOnly>
        <ToasterProvider/>
        <RegisterModal/>
        <Navbar currentUser={currentUser}/>
      </ClientOnly>
      {children}
    </>
  );
}
