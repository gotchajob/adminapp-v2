"use client";
import { CldUploadButton, CloudinaryUploadWidgetResults } from "next-cloudinary";
import { useState } from "react";
import "../button/style.css";
export const UploadImageButton = ({ setImage }: { setImage: any }) => {
  const [info, updateInfo] = useState<any>();
  function handleOnUpload(result: CloudinaryUploadWidgetResults, widget: any) {
    updateInfo(result?.info);
    //@ts-ignore
    setImage(result?.info?.secure_url || "");
    widget.close({
      quiet: true,
    });
  }
  return (
    <>
      <CldUploadButton
        className="upload-button"
        uploadPreset="my3ib4l5"
        
        onUpload={handleOnUpload}
      />
      {/* {info && (
        <>
          {info.resource_type === "image" && (
            //eslint-disable-next-line @next/next/no-img-element
            <img
              width={info.width}
              height={info.height}
              src={info.secure_url}
              alt="Uploaded image"
            />
          )}
        </>
      )} */}
    </>
  );
};
