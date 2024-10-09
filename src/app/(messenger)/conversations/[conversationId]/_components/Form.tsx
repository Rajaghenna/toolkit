"use client"

import useConversation from '@/messHooks/useConversation';
import axios from 'axios';
import React from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { HiPhoto } from 'react-icons/hi2';
import MessageInput from './MessageInput';
import { HiPaperAirplane } from "react-icons/hi";


const Form = () => {
  const {conversationId}= useConversation()
  const {
    register,
    handleSubmit,
    setValue,
    formState:{
      errors
    }
  }= useForm<FieldValues>({
    defaultValues:{
      message:""
    }
  })
  const onSubmit:SubmitHandler<FieldValues>=(data)=>{
    //after completing set value message to null 
    setValue("message","",{shouldValidate:true})
    axios.post("/api/messages",{
      ...data,
      conversationId,
    })
  }
  return (
    <div
      className="
    py-4
    px-4
    bg-white
    border-t-[2px]
    flex
    items-center
    gap-2
    lg:gap-4
    w-full
    "
    >
      <HiPhoto size={30} className="hover:text-sky-600" />
      <form
        className="flex items-center gap-2 lg:gap-4 w-full"
        onSubmit={handleSubmit(onSubmit)}
        action=""
      >
        <MessageInput
          id="message"
          register={register}
          errors={errors}
          required
          placeholder="Write Message"
        />
        <button
          className="
      rounded-full
      p-2
      cursor-pointer
      hover:bg-sky-500
      transition
      bg-neutral-200
      "
          type="submit"
        >
          <HiPaperAirplane size={18} />
        </button>
      </form>
    </div>
  );
}

export default Form