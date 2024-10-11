"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
/* eslint-disable @next/next/no-img-element */
import Container from "@/components/main/Container";

const GetImagesFromDb = () => {
  const [images, setImages] = useState([]);
  const router=useRouter()
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("/api/get-mongo-image");
        const result = await response.json();
        console.log("Fetched Images:",result);
        if (result.success) {
          setImages(result.images);
          router.refresh()
          router.push("/getimagesfromdb");
        } else {
          console.log("Error");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchImages();
  }, [router,setImages]);
  return (
    <>
      <Container>
      <div className="mx-auto max-w-2xl px-1 py-8 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 md:px-3 md:py-4">
        <h2 className="flex flex-col items-center justify-center text-2xl font-bold tracking-tight text-gray-900">
          Uploaded Images
        </h2>
        <div className=" mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {images.map((image) => (
            <div
              key={image._id}
              style={{ margin: "10px" }}
              className="group relative"
            >
              <div className="flex flex-col items-center justify-center aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80 p-4">
                <img
                  src={`data:${image.contentType};base64,${Buffer.from(
                    image.data
                  ).toString("base64")}`}
                  alt={image.name}
                  style={{ maxHeight: "250px", maxWidth: "250px" }}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <p>{image.name}</p>
            </div>
          ))}
        </div>
      </div>
      </Container>
    </>
  );
};

export default GetImagesFromDb;