import { Clock, Heart, History, House, ListVideo } from "lucide-react";

export const constants = {
  apiURL: process.env.NEXT_PUBLIC_API_URL,
};

export const routes = [
  {
    id: "home",
    href: "/",
    label: "Home",
    icon: House,
  },
  {
    id: "history",
    href: "/history",
    label: "History",
    icon: History,
  },
  {
    id: "your-videos",
    href: "/your-videos",
    label: "Your Videos",
    icon: ListVideo,
  },
  {
    id: "watch-later",
    href: "/watch-later",
    label: "Watch later",
    icon: Clock,
  },
  {
    id: "liked-videos",
    href: "/liked-videos",
    label: "Liked Videos",
    icon: Heart,
  },
];
// The above routes can be later made to a route like - /username/your-videos or /username/history

export const profileTabs = [
  {
    id: "home",
    label: "Home",
  },
  {
    id: "videos",
    label: "Videos",
  },
  {
    id: "create",
    label: "Create",
  },
];
