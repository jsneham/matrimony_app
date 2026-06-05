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

export const Account_TABS = [
  { key: "index", label: "My Account", icon: null },
  { key: "app-settings", label: "App Settings", icon: null },
  { key: "help-support", label: "Help & Support", icon: null },
];

export const helpSupportMenu = [
  {
    id: "1",
    icon: "safe-square",
    title: "Stay Safe",
    subtitle: "Online Safety, fraud prevention, etc",
  },
  {
    id: "2",
    icon: "help-circle",
    title: "FAQs",
    subtitle: "Frequently asked questions can be found here",
  },
  {
    id: "3",
    icon: "information",
    title: "About Us",
    subtitle: "Know more about us",
  },
  {
    id: "4",
    icon: "file-document",
    title: "Terms & Conditions",
    subtitle: "Terms of Service, Usage & other conditions",
  },
  {
    id: "5",
    icon: "shield-account",
    title: "Privacy Policy",
    subtitle: "Data policy, consents & more",
  },
  {
    id: "6",
    icon: "cash-refund",
    title: "Refund Policy",
    subtitle: "Know about the refund policy",
  },
  {
    id: "7",
    icon: "delete",
    title: "Delete Account",
    subtitle: "Delete your account permanently from here",
  },
  {
    id: "8",
    icon: "logout",
    title: "Logout",
    subtitle: "Logout from this device",
  },
];

export const MY_ACCOUNT_MENU = [
  {
    id: "1",
    icon: "shield-check",
    title: "Profile Verification",
    subtitle: "Get Profile Verified for better responses",
  },
  {
    id: "2",
    icon: "bookmark",
    title: "Membership",
    subtitle: "View your current plan & other premium plans",
  },
  {
    id: "3",
    icon: "account-edit",
    title: "Update Profile & Partner Preferences",
    subtitle: "Preview & Update profile set partner preferences",
  },
  {
    id: "4",
    icon: "photo-filter",
    title: "Manage Photos",
    subtitle: "Manage your profile photos & horoscope image",
  },
];

export const APP_SETTINGS_MENU = [
  {
    id: "1",
    icon: "phone-android",
    title: "Contact Viewed",
    subtitle: "Contact info viewed by you & who viewed yours",
    route: "/contact-viewed",
  },
  {
    id: "2",
    icon: "account-cancel",
    title: "Blocked Profiles",
    subtitle: "Control which members you want to block",
    route: "/blocked-profiles",
  },
  {
    id: "3",
    icon: "alert-circle",
    title: "Report Profile or Misuse",
    subtitle: "Report something inappropriate you noticed",
    route: "/report-profile",
  },
  {
    id: "4",
    icon: "lock-reset",
    title: "Change Password",
    subtitle: "Set a new password for your account",
    route: "/change-password",
  },
];
