import { useSubDetails } from "@/axios/api";
import SubAccountDescription from "@/components/account/SubAccountDescription";
import SubActions from "@/components/account/SubActions";
import { getCookie } from "cookies-next/server";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Subscription = () => {
  const { query, isReady } = useRouter();
  const [accID, setAccID] = useState(null);
  const { data, isFetching } = useSubDetails({ userId: accID });

  useEffect(() => {
    if (isReady && query.id) {
      setAccID(query.id);
    }
  }, [isReady, query.id]);

  return (
    <div className="lg:pl-12 space-y-4">
      {!isFetching && (
        <>
          <SubAccountDescription
            user={{
              username: data?.data.user.username,
              email: data?.data.user.email,
              userId: data?.data.user._id,
            }}
            preview={data?.data.user.avatarURL}
          />
          {data?.data.videos && <SubActions videos={data?.data.videos} />}
        </>
      )}
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
    console.error("GSSP Error ([id]]):", error);
    return {
      props: {},
    };
  }
}
