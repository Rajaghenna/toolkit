import getConversationById from '@/actionserver/mesActions/getConversationById';
import getMessages from '@/actionserver/mesActions/getMessages';
import EmptyState from '@/components/main/EmptyState';
import React from 'react'
import Header from './_components/Header';


interface IParams{
  conversationId:string,
}

const ConversationId =async ({params}:{params:IParams}) => {
  // fetch messages and conversationid
  const conversation = await getConversationById(params.conversationId)
  const messages = await getMessages(params.conversationId)
//if enetered invalid email
  if(!conversation){
    return (
      <div className='
      lg:pl-80
      h-full
      '>
        <div className='h-full flex flex-col'>
        <EmptyState/>
        </div>
      </div>
    )
  }
  return (
    <div className='lg:pl-80 h-full'>
      <div className='h-full flex flex-col'>
        <Header conversation={conversation} />
      </div>
    </div>
  )
}

export default ConversationId