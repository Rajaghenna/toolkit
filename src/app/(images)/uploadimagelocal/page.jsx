"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./uploadimagelocal.module.css";
import { toast } from "react-toastify";

const UploadImageLocal = () => {
  const router = useRouter();
  const [file, setFile] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(file);
    //api yha call hogi
    if (!file) {
      toast.error("Please Select file to upload💀💀⚡⚡💀💀");
      return;
    }
    const data = new FormData();
    data.append("file", file);
    try {
      let result = await fetch("/api/upload-image", {
        method: "POST",
        body: data,
      });
      result = await result.json();
      if (result.success) {
        toast.success("File Uploaded Successfully🎈🎈🎉🎉🎈🎈");
        router.refresh();
      } else {
        toast.error("Sorry Failed Uploading File💀💀⚡⚡💀💀");
        router.refresh();
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      console.log("error");
      toast.error("Sorry Failed Uploading File💀💀⚡⚡💀💀");
    }
  };
  return (
    <>
      <h2 className={styles.secondHeading}>UploadImage to Local WebSite</h2>
      <div onSubmit={handleSubmit}>
        <div className={styles.imageContainer}>
          <form className={styles.form}>
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
      </div>
    </>
  );
};

export default UploadImageLocal;
