import { AppTab } from "@/types/dashboard";
import { FormSection, TabConfig } from "@/types/profile";
import { icons } from "./icons";

export const tabs: AppTab[] = [
  { name: "index", title: "Home", icon: icons.home },
  { name: "matches", title: "Matches", icon: icons.home },
  { name: "explore", title: "Explore", icon: icons.home },
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
    title: "Frequently Asked Questions",
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
    icon: "check-circle",
    title: "Get Profile Verified",
  },
  {
    id: "2",
    icon: "edit-3",
    title: "Preview & Update Profile",
  },
  {
    id: "3",
    icon: "sliders",
    title: "Update Partner Preferences",
  },
  {
    id: "4",
    icon: "image",
    title: "Manage Photos",
  },
  {
    id: "5",
    icon: "eye-off",
    title: "Photo Privacy Settings",
  },
  {
    id: "6",
    icon: "shield",
    title: "Contact Privacy Settings",
  },
  {
    id: "7",
    icon: "life-buoy",
    title: "Safety & Support Center",
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

export const PROFILE_TABS = [
  { key: "index", label: "Profile", icon: null },
  { key: "partner-preference", label: "Preferences", icon: null },
  { key: "photos-more", label: "Photos & More", icon: null },
];

export const PROFILE_SECTIONS_DATA: FormSection[] = [
  {
    sectionId: "basics_main",
    title: "Basics",
    tabId: "basics",
    fields: [
      {
        id: "maritalStatus",
        label: "Marital Status",
        value: "Never Married",
        subtext: "Never Married",
      },
      {
        id: "height",
        label: "Height",
        value: "5'7'' (170 cm)",
        subtext: "5'7'' (170 cm)",
      },
      {
        id: "age",
        label: "Age",
        value: "38 years",
        subtext: "38 years (01/01/1985)",
      },
      {
        id: "motherTongue",
        label: "Mother Tongue",
        value: "Marathi",
        subtext: "Marathi",
      },
      {
        id: "heightPreference",
        label: "Height Preference",
        value: "5'7'' (170 cm)",
        subtext: "Can't Edit",
        isEditable: false,
      },
    ],
  },
  {
    sectionId: "location",
    title: "Location",
    tabId: "basics",
    fields: [
      {
        id: "country",
        label: "Country",
        value: "India",
        subtext: "India",
      },
      {
        id: "state",
        label: "State",
        value: "Maharashtra",
        subtext: "Maharashtra",
      },
      {
        id: "city",
        label: "City",
        value: "",
        subtext: "Select City",
        actionLabel: "Select City",
      },
      {
        id: "ancestralOrigin",
        label: "Ancestral Origin (Hometown)",
        value: "",
        subtext: "Enter Ancestral Origin",
        actionLabel: "Enter Ancestral Origin",
      },
    ],
  },
  {
    sectionId: "religion",
    title: "Religion & Caste",
    tabId: "faith",
    fields: [
      {
        id: "religion",
        label: "Religion",
        value: "Hindu",
        subtext: "Hindu",
      },
      {
        id: "caste",
        label: "Caste",
        value: "Brahmin",
        subtext: "Brahmin",
      },
      {
        id: "manglik",
        label: "Manglik",
        value: "No",
        subtext: "No",
      },
      {
        id: "gotra",
        label: "Gotra",
        value: "Vasishtha",
        subtext: "Vasishtha",
      },
    ],
  },
  {
    sectionId: "education",
    title: "Education & Career",
    tabId: "career",
    fields: [
      {
        id: "education",
        label: "Education",
        value: "Bachelors",
        subtext: "Bachelors Degree",
      },
      {
        id: "occupation",
        label: "Occupation",
        value: "Software Engineer",
        subtext: "Software Engineer",
      },
      {
        id: "income",
        label: "Annual Income",
        value: "50-1 Cr",
        subtext: "₹50 Lakh - ₹1 Crore",
      },
    ],
  },
  {
    sectionId: "lifestyle",
    title: "Lifestyle",
    tabId: "lifestyle",
    fields: [
      {
        id: "diet",
        label: "Diet",
        value: "Vegetarian",
        subtext: "Vegetarian",
      },
      {
        id: "smoking",
        label: "Smoking",
        value: "No",
        subtext: "No",
      },
      {
        id: "drinking",
        label: "Drinking",
        value: "Occasionally",
        subtext: "Occasionally",
      },
      {
        id: "exercise",
        label: "Exercise",
        value: "Regularly",
        subtext: "Regularly",
      },
    ],
  },
];

export const PROFILE_TABS_CONFIG: TabConfig[] = [
  { id: "basics", label: "Basics" },
  { id: "faith", label: "Faith & Astro" },
  { id: "career", label: "Career" },
  { id: "lifestyle", label: "Lifestyle" },
  { id: "family", label: "Family" },
];
