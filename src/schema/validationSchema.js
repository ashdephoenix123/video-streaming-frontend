// validationSchema.js
import * as yup from "yup";

export const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string(),
  video: yup
    .mixed()
    .required("Video file is required")
    .test("fileSize", "File is too large (max 30MB)", (value) => {
      return value && value[0]?.size <= 30 * 1024 * 1024; // 30MB
    })
    .test("fileType", "Only MP4 files are allowed", (value) => {
      return value && ["video/mp4"].includes(value[0]?.type);
    }),
  thumbnail: yup
    .mixed()
    .required("Thumbnail Image is required!")
    .test("fileSize", "File is too large (max 2MB)", (value) => {
      return value && value[0]?.size <= 2 * 1024 * 1024; // 2MB
    }),
});
