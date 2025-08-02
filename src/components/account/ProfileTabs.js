import { cn } from "@/lib/utils";
import React from "react";

const ProfileTabs = ({ active, updateActiveTab, profileTabs }) => {
  let allTabs = profileTabs.map((tab) => (
    <li key={tab.id} class="me-2">
      <div
        onClick={() => updateActiveTab(tab.id)}
        class={cn(
          "inline-block p-4 border-b-2 rounded-t-lg cursor-pointer",
          active === tab.id
            ? "text-red-500 border-red-500"
            : "border-transparent hover:border-gray-300"
        )}
      >
        {tab.label}
      </div>
    </li>
  ));

  return (
    <div class="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
      <ul class="flex flex-wrap -mb-px">{allTabs}</ul>
    </div>
  );
};

export default ProfileTabs;
