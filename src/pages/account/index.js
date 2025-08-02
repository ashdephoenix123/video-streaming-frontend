import AccountDescription from "@/components/account/AccountDescription";
import Actions from "@/components/account/Actions";
import Loading from "@/components/Loading";
import { messages } from "@/constants";
import { useUser } from "@/contexts/UserContext";
import { getCookie } from "cookies-next/server";
import React from "react";

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
    const token = await getCookie("token", { req, res });
    console.log("accounts page user token", token);
    console.log("req", req);
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
