import React from "react";
import SideBarLayout from "./SidebarLayout";
import CleanLayout from "./CleanLayout";

const Layout = ({ variant, children }) => {
  if (variant === "clean") {
    return <CleanLayout>{children}</CleanLayout>;
  }
  return <SideBarLayout>{children}</SideBarLayout>;
};

export default Layout;
