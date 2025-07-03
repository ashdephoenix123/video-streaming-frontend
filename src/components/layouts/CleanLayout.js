import React, { useState } from "react";
import Navbar from "../Navbar";

const CleanLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div>{children}</div>
    </div>
  );
};

export default CleanLayout;
