import React from "react";

import { Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { UpdatePicture } from "../../../context/actions/actions";
import { toast } from "react-toastify";

export const AvatarUpload = () => {
  const props = {
    action: "//jsonplaceholder.typicode.com/posts/",
    listType: "picture",
    previewFile(file) {
      console.log("Your upload file:", file);
      let formData = new FormData();
      formData.append("file", file);

      // Your process logic. Here we just mock to the same file

      //   return fetch("https://next.json-generator.com/api/json/get/4ytyBoLK8", {
      //     method: "POST",
      //     body: file,
      //   })
      //     .then((res) => res.json())
      //     .then(({ thumbnail }) => thumbnail);
    },
  };

  return (
    <div>
      <Upload {...props}>
        <Button>
          <UploadOutlined /> Upload
        </Button>
      </Upload>
    </div>
  );
};
