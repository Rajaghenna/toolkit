"use client";
import React from "react";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import styles from "./upload.module.css";
import { Button } from "@/components/ui/button";
import { ReactPhotoEditor } from "react-photo-editor";
import "react-photo-editor/dist/style.css";

const UploadFile = () => {
  const inputRef = useRef(null);
  const [file, setFile] = useState("");
  const [image, setImage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const showModalHandler = () => {
    if (file) {
      setShowModal(true);
    }
    if (!file) {
      toast.error("Please Select a Image File to Upload💀💀⚡⚡💀💀");
      return;
    }
  };

  // Hide modal
  const hideModal = () => {
    setShowModal(false);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    setFile(event.target.files[0]);
    setImage(file);
  };

  const handleSubmit = async (file) => {
    // e.preventDefault(file);
    if (!file) {
      toast.error("Please Select a Image File to Upload💀💀⚡⚡💀💀");
      return;
    }
    const data = new FormData();
    data.append("file", file);

    try {
      let result = await fetch("/api/upload-mongo-image", {
        method: "POST",
        body: data,
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
        <h1>
          <label htmlFor="image-upload-input" className={styles.imgLabel}>
            {file ? file.name : "Choose an File"}
          </label>
        </h1>
        <div
          style={{ display: "flex", flexDirection: "column" }}
          className={styles.picEditor}
        >
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className="flex flex-col justify-center items-center">
              <div onClick={handleImageClick}>
                {image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={URL.createObjectURL(image)}
                    alt="upload"
                    sizes="100vw"
                    style={{
                      width: "100%",
                      height: "auto",
                    }}
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
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
          </form>
        </div>
        <div className="flex gap-20 mt-20">
          {file ? <Button onClick={showModalHandler}>Edit</Button> : ""}
          {!file ? (
            "Please Select a File to Upload."
          ) : (
            <ReactPhotoEditor
              open={showModal}
              onClose={hideModal}
              file={file}
              onSaveImage={handleSubmit}
            />
          )}
        </div>
      </div>
      <ReactPhotoEditor
        open={showModal}
        onClose={hideModal}
        file={file}
        onSaveImage={handleSubmit}
      />
    </>
  );
};

export default UploadFile;
