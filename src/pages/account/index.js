import AccountDescription from "@/components/account/AccountDescription";
import Actions from "@/components/account/Actions";
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
