import { TimerReset } from "lucide-react";
import Link from "next/link";
import React from "react";

const History = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center space-y-6">
      <TimerReset size={120} />
      <div className="space-y-2 flex flex-col items-center">
        <p className="text-lg">Keep track of what you watch</p>
        <Link
          href="/sign-in"
          className="text-xs font-medium px-4 py-2 bg-red-600 rounded-full hover:bg-red-700 transition-all"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default History;
