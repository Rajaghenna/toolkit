"use client";
import React from "react";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
/* eslint-disable @next/next/no-img-element */
import styles from "./input.module.css";
import { Button } from "@/components/ui/button";

const InputFile = () => {
  const inputRef = useRef(null);
  const [file, setFile] = useState('');
  const router = useRouter();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setFile(event.target.files[0]);
    setFile(file)
  };

  const handleSubmit = async (file) => {
    e.preventDefault(file);
    if (!file) {
      toast.error("Please Select a Image File to Upload💀💀⚡⚡💀💀");
      return;
    }
    const data = new FormData();
    data.append("file", image);

    try {
      let result = await fetch("/api/upload-mongo-image", {
        method: "POST",
        body: data,
        image: image,
        redirect: "follow",
      });
      result = await result.json();
      if (result.success) {
        toast.success("File Uploaded Successfully 🎈🎈🎉🎉🎈🎈");
        router.refresh();
        router.push("/getimagesfromdb");
      } else {
        toast.error("File uploaded failed💀💀⚡⚡💀💀");
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageClick = () => {
    inputRef.current.click();
  };

  return (
    <>
      <div className={styles.imageContainer}>
        <label htmlFor="image-upload-input" className={styles.imgLabel}>
          {file ? file.name : "Choose an File"}
        </label>
        <div
          style={{ display: "flex", flexDirection: "column" }}
          className={styles.picEditor}
        >
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className="flex flex-col justify-center items-center">
              <div onClick={handleImageClick}>
                {file ? (
                  <img
                    src={URL.createObjectURL(file)}
                    alt="upload"
                    sizes="100vw"
                    style={{
                      width: "100%",
                      height: "auto",
                    }}
                  />
                ) : (
                  <img
                    src="./upload.png"
                    alt="upload"
                    className={styles.uploadImg}
                    width={50}
                    height={50}
                  />
                )}
                <input
                  type="file"
                  ref={inputRef}
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                  id="image-upload-input"
                />
              </div>
            </div>
            {!file ? (
              "Please Select a File to Upload."
            ) : (
              <Button type="submit" onSaveImage={handleSubmit}>
                Submit
              </Button>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default InputFile;
