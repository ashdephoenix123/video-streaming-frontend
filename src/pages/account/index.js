import AccountDescription from "@/components/account/AccountDescription";
import Actions from "@/components/account/Actions";
import Loading from "@/components/Loading";
import { messages } from "@/constants";
import { useUser } from "@/contexts/UserContext";
import * as cookie from "cookie";

const Account = () => {
  const { user } = useUser();
  if (!user) {
    return (
      <div className="w-full flex justify-center">
        <Loading size={32} />
      </div>
    );
  }

  return (
    <div className="lg:pl-12 space-y-4">
      <AccountDescription />
      <Actions />
    </div>
  );
};

export default Account;

export async function getServerSideProps({ req, res }) {
  try {
    const token = cookie.parse(req.headers.cookie)?.token;
    console.log("token", token);
    if (!token) {
      return {
        redirect: {
          destination: "/sign-in",
          permanent: false,
        },
      };
    }
    return {
      props: {},
    };
  } catch (error) {
    return {
      props: {
        error: messages.error,
      },
    };
  }
}
