import React, { useState } from "react";
import ProfileTabs from "./ProfileTabs";
import ProfileHome from "./ProfileHome";
import MyVideos from "./MyVideos";
import CreateContent from "./CreateContent";

const Actions = () => {
  const [active, setActive] = useState("home");

  const updateActiveTab = (id) => {
    setActive(id);
  };

  const activeContent = () => {
    switch (active) {
      case "home":
        return <ProfileHome />;
      case "videos":
        return <MyVideos />;
      case "create":
        return <CreateContent />;

      default:
        return <></>;
    }
  };

  return (
    <div className="space-y-4 mb-6">
      <ProfileTabs active={active} updateActiveTab={updateActiveTab} />
      <div>{activeContent()}</div>
    </div>
  );
};

export default Actions;
