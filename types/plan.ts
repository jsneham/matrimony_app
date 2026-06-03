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
