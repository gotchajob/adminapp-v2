"use client";
import {
  CldUploadButton,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import { useState } from "react";
import "../button/style.css";
import Box from "@mui/material/Box";
import Image from "next/image";

export const UploadImageButton = ({
  setImage,
  image,
}: {
  image?: string;
  setImage: any;
}) => {
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
    <Box position={"relative"}>
      {image && (
        <Image
          style={{ position: "absolute", left: "40%" }}
          alt={"..."}
          src={image}
          width={100}
          height={100}
        />
      )}
      <CldUploadButton
        className="upload-button"
        uploadPreset="my3ib4l5"
        onUpload={handleOnUpload}
      />
    </Box>
  );
};
