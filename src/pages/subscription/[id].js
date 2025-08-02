import { useSubDetails } from "@/axios/api";
import AccountDescription from "@/components/account/AccountDescription";
import Actions from "@/components/account/Actions";
import Loading from "@/components/Loading";
import { messages } from "@/constants";
import { useUser } from "@/contexts/UserContext";
import { getCookie } from "cookies-next/server";
import { useRouter } from "next/router";
import React from "react";

const Subscription = () => {
  const { query } = useRouter();
  const accID = query.id;
  const { data, isFetching } = useSubDetails({ userId: accID });
  console.log(isFetching, data);

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

export default Subscription;

export async function getServerSideProps({ req, res }) {
  try {
    const token = await getCookie("token", { req, res });
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
