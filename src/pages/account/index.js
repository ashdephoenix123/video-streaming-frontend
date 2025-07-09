import AccountDescription from "@/components/account/AccountDescription";
import Actions from "@/components/account/Actions";
import { messages } from "@/constants";
import { getCookie } from "cookies-next/server";
import React from "react";

const Account = () => {
  return (
    <div className="pl-12 space-y-4">
      <AccountDescription />
      <Actions />
    </div>
  );
};

export default Account;

export async function getServerSideProps({ req, res }) {
  try {
    const token = await getCookie("token", { req, res });
    if (!token) {
      return {
        redirect: {
          destination: "sign-in",
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
