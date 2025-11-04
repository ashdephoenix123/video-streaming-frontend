import AccountDescription from "@/components/account/AccountDescription";
import Actions from "@/components/account/Actions";
import Loading from "@/components/Loading";
import { useUser } from "@/contexts/UserContext";
import { getCookie } from "cookies-next/server";

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
    const token = getCookie("token", { req, res });
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
    console.error("GSSP Error (account):", error);
    return {
      props: {},
    };
  }
}
