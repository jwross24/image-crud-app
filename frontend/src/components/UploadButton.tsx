import React from "react";
import { Input } from "./ui/input";

interface UploadButtonProps {
  onUpload: (file: File) => void;
}

const UploadButton = ({ onUpload }: UploadButtonProps) => {
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpload(file);
    }
  };

  return (
    <div>
      <Input type="file" accept="image/*" onChange={handleUpload} />
    </div>
  );
};

export default UploadButton;
