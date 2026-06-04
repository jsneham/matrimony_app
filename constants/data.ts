import { AppTab } from "@/types/dashboard";
import { icons } from "./icons";

export const tabs: AppTab[] = [
  { name: "index", title: "Home", icon: icons.home },
  { name: "matches", title: "Matches", icon: icons.home },
  { name: "interest", title: "Interest", icon: icons.home },
  { name: "message", title: "Message", icon: icons.home },
  { name: "membership", title: "Membership", icon: icons.home },
];

export const TABS = [
  { key: "search", label: "Search", icon: "search-outline" as const },
  { key: "index", label: "My Matches", icon: null },
  { key: "more-matches", label: "More Matches", icon: null },
];
