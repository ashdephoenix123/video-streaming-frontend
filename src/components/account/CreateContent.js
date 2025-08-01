import { constants } from "@/constants";
import { schema } from "@/schema/validationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Backdrop from "../Backdrop";
import Loading from "../Loading";
import TextField from "../TextField";
import UploadVideo from "./UploadVideo";
import Button from "../Button";
import { useState } from "react";

const defaultValues = {
  video: null,
  title: "",
  description: "",
};

const CreateContent = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : null;
  const userId = user.userId || null;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = methods;

  const onSubmit = async (data) => {
    const { video, title, description } = data;
    const formData = new FormData();
    formData.append("video", video[0]);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("userId", userId);

    try {
      const res = await axios.post(`${constants.apiURL}/upload`, formData, {
        withCredentials: true,
        headers: {
          "x-title": title,
          "x-user-id": userId,
        },
        onUploadProgress: (progressEvent) => {
          console.log(progressEvent);
          const percentage = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percentage);
        },
      });
      if (res.status != 200) {
        toast.error("Some error occured!");
        return;
      }
      toast.success("Upload successful!");
      reset(defaultValues);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative">
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 max-w-md p-4"
        >
          <UploadVideo />

          <TextField
            label="Title*"
            name="title"
            {...register("title")}
            error={errors.title?.message}
          />
          <TextField
            label="Description"
            name="description"
            type="text"
            elem="textarea"
            rows={5}
            className="resize-none"
            {...register("description")}
            error={errors.description?.message}
          />
          <Button type="submit">Upload</Button>
        </form>
      </FormProvider>
      {isSubmitting && (
        <Backdrop>
          <Loading />
          <span className="ml-2 text-lg font-medium">
            {uploadProgress}% Upload completed...
          </span>
        </Backdrop>
      )}
    </div>
  );
};

export default CreateContent;
