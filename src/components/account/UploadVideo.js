import React, { useRef } from "react";
import { useFormContext } from "react-hook-form";
import { Plus } from "lucide-react";

const UploadVideo = () => {
  const inputRef = useRef(null);
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleUpload = (e) => {
    const fileList = e.target.files;
    if (fileList.length > 0) {
      setValue("video", fileList, { shouldValidate: true });
    }
  };

  const selected = watch("video");

  return (
    <div>
      <div className="mb-2">
        <button
          type="button"
          className="bg-neutral-600/40 border-transparent rounded-lg text-3xl p-6 cursor-pointer"
          onClick={handleClick}
        >
          <Plus size={30} />
        </button>
        <input
          hidden
          ref={inputRef}
          type="file"
          accept="video/*"
          onChange={handleUpload}
        />
      </div>

      {selected?.[0] ? (
        <p className="text-xs text-neutral-400">
          Selected File: {watch("video")[0].name}
        </p>
      ) : (
        <span className="text-xs text-neutral-400 block">Upload Video</span>
      )}

      {errors.video && (
        <p className="text-red-500 text-xs mt-1">{errors.video.message}</p>
      )}
    </div>
  );
};

export default UploadVideo;
