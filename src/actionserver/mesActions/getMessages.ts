import { db } from "@/lib/db";

const getMessages=async(
  conversationId:string
)=>{
  try {
    // by default latest message shows on top by default
    const messages= await db.message.findMany({
      where:{
        conversationId:conversationId
      },
      include:{
        sender:true,
        seen:true,
      },
      
      orderBy:{
        createdAt:"asc"
      }
    })
    return messages
  } catch {
    return []
  }
}

export default getMessages