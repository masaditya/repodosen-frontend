import React, { useState } from "react";
import { Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

export const FileField = ({ uploadProps }) => {
  return (
    <div>
      <Upload {...uploadProps}>
        <Button>
          <UploadOutlined /> Select File
        </Button>
      </Upload>
    </div>
  );
};
