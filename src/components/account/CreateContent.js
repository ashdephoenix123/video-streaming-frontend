import { Plus } from "lucide-react";
import React, { useRef, useState } from "react";
import TextField from "../TextField";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "@/schema/validationSchema";
import UploadVideo from "./UploadVideo";
import toast from "react-hot-toast";
import { constants } from "@/constants";

const defaultValues = {
  video: null,
  title: "",
  description: "",
};

const CreateContent = () => {
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = methods;

  const onSubmit = async (data) => {
    const { video, title, description } = data;
    const formData = new FormData();
    formData.append("video", video[0]);
    formData.append("title", title);
    formData.append("description", description);

    try {
      const res = await fetch(`${constants.apiURL}/upload`, {
        method: "POST",
        body: formData,
        headers: {
          "x-title": title,
        },
      });

      if (!res.ok) {
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
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
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
        <button type="submit" className="px-4 py-2 rounded bg-red-600">
          Upload
        </button>
      </form>
    </FormProvider>
  );
};

export default CreateContent;
