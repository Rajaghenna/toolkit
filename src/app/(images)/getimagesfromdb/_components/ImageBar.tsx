import Container from '@/app/components/Container';
import React from 'react'
import ImageNavButtons from './ImageNavButtons';

const ImageBar = () => {
  return (
   <div className="w-full bg-gray-200 shadow-sm mb-4 p-[30px] mt-[-10px]">
    <ImageNavButtons/>
  </div>
  )
}

export default ImageBar