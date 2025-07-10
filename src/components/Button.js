import { cn } from "@/lib/utils";
import React from "react";

const Button = ({ className = "", children, ...props }) => {
  return (
    <button
      {...props}
      className={cn("px-4 py-2 cursor-pointer rounded bg-red-600", className)}
    >
      {children}
    </button>
  );
};

export default Button;
