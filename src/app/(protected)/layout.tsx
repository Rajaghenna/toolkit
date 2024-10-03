import React from 'react'
import { SessionProvider } from 'next-auth/react'
import { auth } from '@/auth'
import Navbar from '@/components/navbar/Navbar';
import PNavbar from '@/components/protected/PNavbar';


export default async function ProtectedLayout({
  children
}:{children:React.ReactNode}){

  const session= await auth()
  return (
    <SessionProvider session={session}>
      <div>
        <PNavbar/>
        <Navbar />
        {children}
      </div>
    </SessionProvider>
  );
}