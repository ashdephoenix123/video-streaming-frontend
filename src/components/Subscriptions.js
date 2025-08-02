import { useMySubscriptions } from "@/axios/api";
import Image from "next/image";
import Link from "next/link";

const Subscriptions = () => {
  const { data } = useMySubscriptions();
  console.log(data?.data);

  let paths = data?.data.map((user) => {
    const { avatarURL, username, _id } = user.userId;
    return (
      <li
        key={_id}
        className={`text-xs rounded-lg font-medium cursor-pointer select-none`}
      >
        <Link
          className="flex items-center gap-2 px-2 py-1"
          href={"/subscription/" + _id}
        >
          <Image
            src={avatarURL}
            alt={username + "- avatar"}
            width={28}
            height={28}
            className="rounded-full"
          />
          {username}
        </Link>
      </li>
    );
  });

  return (
    <div className="mt-4 space-y-2 text-xs font-medium tracking-wide">
      <h3>Subscriptions</h3>
      <ul className="list-none space-y-0">{paths}</ul>
    </div>
  );
};

export default Subscriptions;
