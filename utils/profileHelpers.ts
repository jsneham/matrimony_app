import { PlanStatus } from "@/types/profile";

export function maskMobile(mobile: string): string {
  if (!mobile) return "N/A";
  const digits = mobile.replace(/\D/g, "");
  const last4 = digits.slice(-4);
  return `${"*".repeat(Math.max(digits.length - 4, 6))}${last4}`;
}

export function normalizePlanStatus(planStatus?: string | null): PlanStatus {
  const trimmed = (planStatus || "").trim().toLowerCase();

  if (trimmed === "paid") return PlanStatus.PAID;
  if (trimmed === "expired") return PlanStatus.EXPIRED;
  if (trimmed === "not paid" || trimmed === "notpaid" || trimmed === "unpaid") {
    return PlanStatus.NOT_PAID;
  }

  return PlanStatus.NOT_PAID;
}

export function getPlanAwareName(
  planStatus?: string | null,
  firstName?: string | null,
  lastName?: string | null,
  fallbackName?: string | null,
): string {
  const normalized = normalizePlanStatus(planStatus);
  const fallbackParts = fallbackName?.trim().split(/\s+/) ?? [];
  const resolvedFirstName = firstName?.trim() || fallbackParts.shift() || "";
  const resolvedLastName = lastName?.trim() || fallbackParts.join(" ");
  const fullName = [resolvedFirstName, resolvedLastName]
    .filter(Boolean)
    .join(" ")
    .trim();
  const fallback = fallbackName?.trim() || fullName || "User";

  if (normalized === PlanStatus.PAID) {
    return fullName || fallback;
  }

  const first = resolvedFirstName;
  const last = resolvedLastName;

  if (!first && !last) return fallback;

  const maskedFirst = first.charAt(0);
  return `${maskedFirst}${last ? ` ${last}` : ""}`.trim();
}

export function inchesToFeetIn(inches: string | null): string {
  if (!inches) return "N/A";
  const total = parseInt(inches, 10);
  if (isNaN(total)) return "N/A";
  const feet = Math.floor(total / 12);
  const remIn = total % 12;
  return `${feet}ft ${remIn}in`;
}

export function orNotMentioned(value: string | null | undefined): string {
  return value && value.trim() !== "" ? value : "Not Mentioned";
}

// Handles both cases: photo field already being a full URL, or needing
// photoUrl + filename concatenation (as seen in the matches endpoints).
export function resolvePhotoUri(
  photoUrl: string | undefined,
  photoField: string | null | undefined,
): string | undefined {
  if (!photoField) return undefined;
  if (photoField.startsWith("http")) return photoField; // already a full URL
  if (!photoUrl) return undefined;
  return `${photoUrl}${photoField}`;
}
