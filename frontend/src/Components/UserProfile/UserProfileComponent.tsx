import React, { useState } from "react";
import CybermartLogo from "../../Img/cybermart-low-resolution-logo-color-on-transparent-background.png";
import { log } from "console";

export default function UserProfileComponent(): JSX.Element {
  const [image, setImage] = useState<File | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImage(file);

      // Handle image upload to the backend
      const formData = new FormData();
      formData.append("image", file);

      console.log(file);
      
    }
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <label
          htmlFor="imageUpload"
          className="rounded-full border-2 border-red-500 w-24 h-24 flex items-center justify-center"
        >
          {image ? (
            <img src={URL.createObjectURL(image)} alt="" className="rounded-full" />
          ) : (
            <span className="text-red-500">Upload Image</span>
          )}
        </label>
        <input
          type="file"
          id="imageUpload"
          className="hidden"
          accept="image/*"
          onChange={handleImageUpload}
        />
      </div>
    </>
  );
}
