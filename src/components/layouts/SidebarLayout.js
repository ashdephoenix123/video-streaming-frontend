import React, { useState } from "react";
import Navbar from "../Navbar";
import Link from "next/link";
import { routes } from "@/constants";
import Subscriptions from "../Subscriptions";

const SideBarLayout = ({ children }) => {
  const [active, setActive] = useState("home");

  let paths = routes.map((route) => {
    const { icon: Icon, label } = route;
    return (
      <li
        key={route.id}
        className={`text-xs  rounded-lg font-medium cursor-pointer hover:bg-neutral-600/40 hover:transition-all active:bg-neutral-600/30 select-none ${
          route.id === active ? "bg-neutral-600/40" : ""
        }`}
        onClick={() => setActive(route.id)}
      >
        <Link className="flex items-center gap-4 px-2 py-2" href={route.href}>
          <Icon size={20} />
          {label}
        </Link>
      </li>
    );
  });

  return (
    <div>
      <Navbar />
      <div className="flex gap-4">
        <div className="basis-36 shrink-0 hidden lg:block">
          <ul className="list-none">{paths}</ul>
          <Subscriptions />
        </div>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
};

export default SideBarLayout;
