import React from "react";

const Backdrop = ({ children }) => {
  return (
    <div className="absolute top-0 bg-neutral-200/20 w-full h-full flex justify-center items-center rounded-md">
      {children}
    </div>
  );
};

export default Backdrop;
