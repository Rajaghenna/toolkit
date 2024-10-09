"use client"
import React from 'react'
import useConversation from '@/messHooks/useConversation'
import clsx from 'clsx'
import EmptyState from '@/components/main/EmptyState'


const ConversationPage = () => {
  const { isOpen } = useConversation()
  return (
    <div className={clsx(`hidden lg:block lg:pl-80 h-full`,
      isOpen ?"block":"hidden"
    )}>

      <EmptyState />
    </div>
  )
}

export default ConversationPage