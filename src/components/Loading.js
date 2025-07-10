import { Loader } from "lucide-react";
import React from "react";

const Loading = ({ size = 25 }) => {
  return <Loader className="animate-spin" size={size} />;
};

export default Loading;
