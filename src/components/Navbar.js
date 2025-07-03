import { Atom, CircleUserRound, UserRound } from "lucide-react";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="h-16 flex items-center justify-between">
      <Link href="/">
        <h1 className="text-lg font-medium flex gap-2">
          <Atom size={25} />
          YouRube
        </h1>
      </Link>

      <Link href="/account">
        <CircleUserRound size={25} />
      </Link>
    </div>
  );
};

export default Navbar;
