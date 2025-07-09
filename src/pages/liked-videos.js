import { Heart } from "lucide-react";
import Link from "next/link";

const LikedVideos = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center space-y-6">
      <Heart size={120} />
      <div className="flex flex-col items-center">
        <p className="text-lg">Watch your liked videos</p>
        <p className="text-xs mt-1">Sign in to watch your liked videos.</p>
        <Link
          href="/sign-in"
          className="mt-4 text-xs font-medium px-4 py-2 bg-red-600 rounded-full hover:bg-red-700 transition-all"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default LikedVideos;
