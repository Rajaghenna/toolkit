import { Button } from "@/components/ui/button"
import { PlusSquareIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react'


const ImageNavButtons = () => {
  return (
    <div className="flex flex-row gap-5 items-center justify-center">
      <Button className="p-6 ">
        <Link href="/mongo-image">
          <span className="flex flex-col justify-center items-center">
            <PlusSquareIcon />
            Add Image
          </span>
        </Link>
      </Button>
      <Button>Second</Button>
      <Button>third</Button>
      dropdown
      <div>dropdwon</div>
    </div>
  );
}

export default ImageNavButtons