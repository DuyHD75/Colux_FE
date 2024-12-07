import { Grid } from "@mui/material";
import React, { useState } from "react";
import uploadImageApi from "../../api/modules/upload.api";


const AImageUploader = ({ handleUpload }) => {
  const [isUploading, setIsUploading] = useState(false);

  const uploadImg = async (e) => {
    setIsUploading(true);

    const file = e.target.files[0]; // Chỉ lấy ảnh đầu tiên
    if (!file) {
      alert("Please select an image!");
      setIsUploading(false);
      return;
    }

    const image = new FormData();
    image.append("file", file);
    image.append("folder", "shippings");

    const response = await uploadImageApi.uploadImage(image);

    if (response.data) {
      console.log(response);
      handleUpload(response.data.fileUrls[0]);
    } else {
      alert("Error while uploading the image");
    }
    setIsUploading(false);
  };

  return (
    <Grid item xs={6} sm={4} md={3} lg={2} height={"12rem"}>
      <label
        htmlFor="upload-photo"
        style={{
          display: "flex",
          alignItems: "center",
          height: "100%",
          justifyContent: "center",
          border: "2px dashed #333",
          borderRadius: "10px",
          flexDirection: "column",
        }}
      >
        <input
          id="upload-photo"
          type="file"
          name="image"
          style={{ display: "none" }}
          onChange={(e) => uploadImg(e)}
          disabled={isUploading}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          style={{ width: "4.4rem" }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
          />
        </svg>
        {isUploading ? "Uploading image ..." : "Upload new photo..."}
      </label>
    </Grid>
  );
};

export default AImageUploader;
