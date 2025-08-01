import axiosToken from "@/axios/tokenAxios";
import { constants } from "@/constants";
import { useUser } from "@/contexts/UserContext";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { Pencil } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import Loading from "../Loading";

const AccountDescription = () => {
  const { user, addUserData } = useUser();
  const imgRef = useRef(null);
  const [preview, setPreview] = useState(
    user && user?.avatarURL ? user.avatarURL : "/default-user.jpg"
  );

  const handleClick = () => {
    imgRef.current.click();
  };

  const { mutate, isPending } = useMutation({
    mutationFn: async (e) => {
      const file = e.target.files?.[0];
      if (!file) {
        toast.error("Please uplaod a file");
        return;
      }

      try {
        const formData = new FormData();
        formData.append("avatar", file);
        const response = await axiosToken.post(
          constants.apiURL + "/user/upload-avatar",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status != 200) {
          setPreview(response.data.imageUrl);
          toast.success("Avatar updated!");
        }
      } catch (error) {
        console.log(error);
        toast.error("Avatar update failed!");
      }
    },
    onSuccess: async () => {
      const getUser = await axiosToken.get(
        constants.apiURL + `/user/${user?.userId}`
      );
      await addUserData(getUser.data);
      // Invalidate and refetch the 'todos' query after successful mutation
      // queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return (
    <div className="flex gap-6">
      <div className="relative group w-24 h-24 md:w-[150px] md:h-[150px]">
        <Image
          src={preview}
          alt={`${user?.username}'s avatar`}
          fill
          priority
          className="object-cover rounded-full"
        />
        <button
          onClick={handleClick}
          className={cn(
            "absolute inset-0 rounded-full opacity-0 group-hover:opacity-80 bg-neutral-600 z-10 transition-all duration-200 flex items-center justify-center cursor-pointer",
            isPending && "opacity-80"
          )}
        >
          {isPending ? <Loading size={32} /> : <Pencil size={32} />}
        </button>
      </div>
      <input
        hidden
        type="file"
        ref={imgRef}
        accept="image/png, image/jpeg, image/webp"
        onChange={mutate}
      />
      <div className="space-y-2 flex flex-col justify-center">
        <h1 className="text-xl md:text-3xl font-bold tracking-tight">
          {user?.username}
        </h1>
        <p className="text-xs text-neutral-400">&#x2022; {user?.email} </p>
      </div>
    </div>
  );
};

export default AccountDescription;
