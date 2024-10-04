import { auth } from "@/auth";
import { db } from "@/lib/db";

const getCurrentUser= async()=>{
  try {
    const session = await auth()
    if(!session?.user?.email){
      return null
    }
    const currentUser= await db.user.findUnique({
      where:{
        email:session.user.email,
      }
    })
    if(!currentUser){
      return null
    }
    return currentUser
  } catch {
    return null
  }
}

export default getCurrentUser