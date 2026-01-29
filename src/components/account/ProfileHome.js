import { useUser } from "@/contexts/UserContext";
import { useRouter } from "next/router";
import Button from "../Button";
import axios from "axios";

const ProfileHome = () => {
  const router = useRouter();
  const { logout } = useUser();

  const loguserOut = async () => {
    await axios.post("/api/user/logout", {});
    await logout();
    router.push("/sign-in");
  };
  return (
    <div className="flex flex-col gap-4">
      <Button className="max-w-max" onClick={loguserOut}>
        Log Out
      </Button>
    </div>
  );
};

export default ProfileHome;
