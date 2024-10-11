'use client'
import React, { useRef, useState } from 'react'
/* eslint-disable @next/next/no-img-element */

const InputImage = () => {
  const inputRef = useRef(null)
  const [image,setImage]=useState("")

  const handleImageClick=()=>{
    inputRef.current.click()
  }

  const handleImageChange=(event)=>{
    const file= event.target.files[0]
    console.log(file)
    setImage(event.target.files[0])
  }
  return (
    <div onClick={handleImageClick}>
      {image ? (<img src={URL.createObjectURL(image)} alt="img" height="80px" width="80px"/>):
      (<img src='/upload.png' alt='uploadImg' height={30} width={30}/>)}
      <input type='file' ref={inputRef} style={{display:"none"}} onChange={handleImageChange}/>
    </div>
  )
}

export default InputImage