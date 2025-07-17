import { cn } from "@/lib/utils";
import React from "react";

const Button = ({ className = "", variant, children, ...props }) => {
  const colors = {
    secondary: "bg-white text-black",
    tertiary: "bg-neutral-700 text-white",
  };

  return (
    <button
      {...props}
      className={cn(
        "px-4 py-2 cursor-pointer rounded bg-red-600",
        variant && colors[variant],
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
