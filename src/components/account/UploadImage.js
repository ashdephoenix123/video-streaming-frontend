import { Plus } from "lucide-react";
import React, { useRef, useState } from "react";
import { useFormContext } from "react-hook-form";

const UploadImage = () => {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();
  const selected = watch("thumbnail");
  const imageRef = useRef(null);

  const selectImage = () => {
    imageRef.current.click();
  };

  const handleImageSelection = (e) => {
    const fileList = e.target.files;
    if (fileList.length > 0) {
      setValue("thumbnail", fileList, { shouldValidate: true });
    }
  };

  return (
    <div>
      <div className="mb-2">
        <button
          type="button"
          className="bg-neutral-600/40 border-transparent rounded-lg text-3xl p-6 cursor-pointer"
          onClick={selectImage}
        >
          <Plus size={30} />
        </button>

        <input
          ref={imageRef}
          type="file"
          accept="image/*"
          hidden
          onChange={handleImageSelection}
        />
      </div>

      {selected?.[0] ? (
        <p className="text-xs text-neutral-400">
          Selected File: {watch("thumbnail")[0].name}
        </p>
      ) : (
        <span className="text-xs text-neutral-400 block">
          Upload a Thumbnail Image
        </span>
      )}

      {errors.thumbnail && (
        <p className="text-red-500 text-xs mt-1">{errors.thumbnail.message}</p>
      )}
    </div>
  );
};

export default UploadImage;
