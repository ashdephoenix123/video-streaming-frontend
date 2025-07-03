import { cn } from "@/lib/utils";
import React from "react";

const TextField = ({
  label,
  name,
  type = "text",
  elem: Element = "input",
  error = "",
  className = "",
  ...props
}) => {
  return (
    <div className="space-y-1 flex flex-col">
      {label && (
        <label htmlFor={name} className="text-neutral-400 text-xs mt-2">
          {label}
        </label>
      )}
      <Element
        type={type}
        name={name}
        id={name}
        className={cn(
          "bg-neutral-600 outline-hidden px-3 py-2 text-sm rounded-lg",
          className
        )}
        {...props}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default TextField;
