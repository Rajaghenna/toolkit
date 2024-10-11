"use client";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import styles from "./mongo-image.module.css"
import { toast } from "react-toastify";

const MongoImage = () => {
  const router = useRouter();
  const [file, setFile] = useState();
  const handleSubmit = async (e) => {
    e.preventDefault();
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
      });
      result = await result.json();

      if (result.success) {
        toast.success("File Uploaded Successfully 🎈🎈🎉🎉🎈🎈");
        router.refresh();
      } else {
        toast.error("File uploaded failed💀💀⚡⚡💀💀");
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <h2 className={styles.secondHeading}>Upload-Images to Database</h2>
      <div className={styles.imageContainer}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label htmlFor="uploadImage">
            <div className={styles.uploadBox}>
              <input
                type="file"
                name="file"
                id="uploadImage"
                onChange={(e) => setFile(e.target.files?.[0])}
                className={styles.input}
              />
            </div>
          </label>
          <div className={styles.submitBtn}>
            <Button type="submit">Upload</Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default MongoImage;