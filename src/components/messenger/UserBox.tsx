"use client"
import React, { useCallback, useState } from 'react'
import { User } from '@prisma/client'
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface UserBoxProps{
  data:User
}

const UserBox:React.FC<UserBoxProps> = ({
  data,
}) => {
  const router= useRouter()
  const [isLoading,SetIsLoading]=useState(false)
  const handleClick=useCallback(()=>{
    SetIsLoading(true)
    axios.post("/api/messenger/conversations",{
      userId:data.id
    })
  },[])
  return (
    <div>

    </div>
  )
}

export default UserBox