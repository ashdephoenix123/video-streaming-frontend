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
    href: "/",
    label: "History",
    icon: History,
  },
  {
    id: "your-videos",
    href: "/",
    label: "Your Videos",
    icon: ListVideo,
  },
  {
    id: "watch-later",
    href: "/",
    label: "Watch later",
    icon: Clock,
  },
  {
    id: "liked-videos",
    href: "/",
    label: "Liked Videos",
    icon: Heart,
  },
];
