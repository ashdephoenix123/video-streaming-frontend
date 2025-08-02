import { subProfileTabs } from "@/constants";
import ProfileTabs from "./ProfileTabs";
import SubVideos from "./SubVideos";

const SubActions = ({ videos }) => {
  const active = "videos";
  const activeContent = () => {
    switch (active) {
      case "videos":
        return <SubVideos data={videos} />;

      default:
        return <></>;
    }
  };
  return (
    <div className="space-y-4 mb-6">
      <ProfileTabs
        active={"videos"}
        updateActiveTab={() => {}}
        profileTabs={subProfileTabs}
      />
      <div>{activeContent()}</div>
    </div>
  );
};

export default SubActions;
