// constants/membershipData.ts
export interface MembershipPlan {
  id: string;
  name: string;
  duration: string;
  daysLeft: number;
  originalPrice: number;
  finalPrice: number;
  discountPercent: number;
  pricePerDay: number;
  features: string[];
  additionalInfo: string[];
  type: "GOLD" | "PLATINUM" | "DIAMOND";
}

export interface MembershipTab {
  id: string;
  title: string;
  description: string;
  plans: MembershipPlan[];
}

export const membershipTabs: MembershipTab[] = [
  {
    id: "call-profiles",
    title: "Call Profiles Directly",
    description: "Contact profiles directly for better connections",
    plans: [
      {
        id: "gold-6",
        name: "GOLD 6 MONTHS",
        duration: "6 Months",
        daysLeft: 180,
        originalPrice: 2498,
        finalPrice: 999,
        discountPercent: 60,
        pricePerDay: 5.55,
        type: "GOLD",
        features: [
          "Download One Pager Bio-Data",
          "500 Full Profile Views",
          "Search & Save Profiles",
          "Contact Matchmaker",
          "30 Contact Numbers of Profile(s)",
        ],
        additionalInfo: [
          "Directly Contact profiles",
          "Get Contact Number of Profiles",
          "Get Contact Number of Matchmaker",
        ],
      },
      {
        id: "gold-12",
        name: "GOLD 12 MONTHS",
        duration: "12 Months",
        daysLeft: 365,
        originalPrice: 4998,
        finalPrice: 1499,
        discountPercent: 70,
        pricePerDay: 4.1,
        type: "GOLD",
        features: [
          "Download One Pager Bio-Data",
          "1000 Full Profile Views",
          "Search & Save Profiles",
          "Contact Matchmaker",
          "60 Contact Numbers of Profile(s)",
        ],
        additionalInfo: [
          "Directly Contact profiles",
          "Get Contact Number of Profiles",
          "Get Contact Number of Matchmaker",
        ],
      },
      {
        id: "platinum-6",
        name: "PLATINUM 6 MONTHS",
        duration: "6 Months",
        daysLeft: 180,
        originalPrice: 3998,
        finalPrice: 1599,
        discountPercent: 60,
        pricePerDay: 8.88,
        type: "PLATINUM",
        features: [
          "Download One Pager Bio-Data",
          "1000 Full Profile Views",
          "Search & Save Profiles",
          "Contact Matchmaker",
          "100 Contact Numbers of Profile(s)",
          "Priority Support",
        ],
        additionalInfo: [
          "Directly Contact profiles",
          "Get Contact Number of Profiles",
          "Get Contact Number of Matchmaker",
          "Priority Customer Support",
        ],
      },
    ],
  },
  {
    id: "message-profiles",
    title: "Message Profiles Directly",
    description: "Send messages to profiles directly",
    plans: [
      {
        id: "msg-gold-3",
        name: "GOLD 3 MONTHS",
        duration: "3 Months",
        daysLeft: 90,
        originalPrice: 1998,
        finalPrice: 699,
        discountPercent: 65,
        pricePerDay: 7.76,
        type: "GOLD",
        features: [
          "Send Unlimited Messages",
          "250 Full Profile Views",
          "Search & Save Profiles",
          "Premium Support",
          "15 Contact Numbers",
        ],
        additionalInfo: [
          "Message profiles directly",
          "Get response notifications",
          "Save favorite profiles",
        ],
      },
    ],
  },
  {
    id: "video-call",
    title: "Video Call Premium",
    description: "Video calls with premium members",
    plans: [
      {
        id: "video-1",
        name: "VIDEO PREMIUM 1 MONTH",
        duration: "1 Month",
        daysLeft: 30,
        originalPrice: 999,
        finalPrice: 299,
        discountPercent: 70,
        pricePerDay: 9.96,
        type: "GOLD",
        features: [
          "Unlimited Video Calls",
          "HD Quality Calls",
          "Screen Share Feature",
          "Call History",
        ],
        additionalInfo: [
          "Connect via video",
          "High-quality audio",
          "Easy call management",
        ],
      },
    ],
  },
];

export type PlanDetail = {
  label: string;
  value: string;
  highlight?: boolean;
};

export const PLAN_BASIC: PlanDetail[] = [
  { label: "Plan Duration", value: "30 Days" },
  { label: "Plan Expiry Date", value: "Jun 29, 2026" },
  { label: "Plan Activation Date", value: "May 30, 2026" },
];

export const PLAN_EXTRA: PlanDetail[] = [
  { label: "View Contact Numbers", value: "5 out of 5" },
  { label: "View Full Profiles", value: "95 out of 100" },
  { label: "Actual Plan Price", value: "INR 998" },
  { label: "Discounted Price (50% Off)", value: "INR 499" },
  { label: "Offer Discount", value: "N/A" },
  { label: "GST (0%)", value: "INR 0" },
  { label: "Final Billed Amount", value: "INR 499", highlight: true },
];

export type CurrentPlanData = {
  plan_name: string;
  currency: string;
  plan_amount: string;
  plan_activated: string;
  plan_expired: string;
  plan_duration: string;
  message_used: string;
  message: string;
  contacts: string;
  contacts_used: string;
  chat: string;
  profile: string;
  profile_used: string;
  tax_percentage: string;
  tax_name: string;
  grand_total: string;
  tax_amount: string;
  discount_amount: string;
  offer_per: string;
};

export type CurrentPlanResponse = {
  status: string;
  is_show: boolean;
  data?: CurrentPlanData;
};

// ── Real API plan types (from AppConstants.plan_list → PremiumPlanBean) ────
// TODO: field names below are GUESSES based on naming conventions seen
// elsewhere in this API. Please share PremiumPlanBean.java to correct.
export type ApiPlanItem = {
  id: string;
  plan_name: string;
  category?: string; // TODO: confirm — might be what groups plans into tabs
  duration: string; // e.g. "6 Months"
  days_left?: string;
  original_price: string;
  final_price: string;
  discount_percent: string;
  price_per_day: string;
  plan_type: string; // "GOLD" | "PLATINUM" | "DIAMOND" — TODO: confirm exact values
  features?: string[]; // TODO: confirm — might be pipe/comma-separated string instead of array
  additional_info?: string[]; // TODO: same as above
};

export type QrCodeItem = {
  // TODO: fields unknown — payment QR code data
  [key: string]: any;
};

export type OfflinePaymentItem = {
  // TODO: fields unknown — bank details for offline payment
  [key: string]: any;
};

export type PlanListResponse = {
  status: string;
  plan_data: ApiPlanItem[];
  scan_pay?: QrCodeItem[];
  offline_payment?: OfflinePaymentItem[];
};
