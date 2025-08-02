import React, { useCallback, useEffect, useState } from "react";
import ProfileTabs from "./ProfileTabs";
import ProfileHome from "./ProfileHome";
import MyVideos from "./MyVideos";
import CreateContent from "./CreateContent";
import { useRouter } from "next/router";
import { profileTabs } from "@/constants";

const Actions = () => {
  const router = useRouter();
  const { tab } = router.query;
  const getActiveTab = useCallback(() => tab ?? "home", [tab]);
  const [active, setActive] = useState(getActiveTab());

  useEffect(() => {
    setActive(getActiveTab());
  }, [tab, getActiveTab]);

  const updateActiveTab = (id) => {
    setActive(id);
    router.push(`/account?tab=${id}`, undefined, { shallow: true });
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
      <ProfileTabs
        active={active}
        updateActiveTab={updateActiveTab}
        profileTabs={profileTabs}
      />
      <div>{activeContent()}</div>
    </div>
  );
};

export default Actions;
