"use client"

interface SignOutProps{
  children?:React.ReactNode
}


import logOut from '@/actionserver/logout';
import React from 'react'

const SignOut = ({
  children
}:SignOutProps) => {
  const onClick=()=>{
    logOut()
  }
  return (
    <span className='cursor-pointer' onClick={onClick}>
      {children}
    </span>
  )
}

export default SignOut
