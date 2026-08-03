export function maskMobile(mobile: string): string {
  if (!mobile) return "N/A";
  const digits = mobile.replace(/\D/g, "");
  const last4 = digits.slice(-4);
  return `${"*".repeat(Math.max(digits.length - 4, 6))}${last4}`;
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
