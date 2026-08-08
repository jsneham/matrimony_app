import { VisitorApiItem, VisitorCardProps } from "@/types/matches";
import { PlanStatus } from "@/types/profile";
import { getPlanAwareName, normalizePlanStatus } from "@/utils/profileHelpers";

export function mapVisitorItem(
  item: VisitorApiItem,
  size: "large" | "small",
  planStatus?: string | null,
): VisitorCardProps {
  if (!item) {
    return {
      name: "",
      age: "",
      height: "",
      photoUri: undefined,
      isPremium: false,
      isLocked: false,
      size,
    };
  }

  // photoUrl is the base folder path (e.g. "https://www.milann.in/assets/photos/"),
  // photo1 is just the filename — they must be concatenated to form a real image URL.
  const isPhotoApproved =
    item.photo1_approve?.trim().toUpperCase() === "APPROVED";
  const photoUri =
    isPhotoApproved && item.photoUrl && item.photo1
      ? `${item.photoUrl}${item.photo1}`
      : undefined;
  const isMemberPaid =
    normalizePlanStatus(item.plan_status) === PlanStatus.PAID;
  const badgeUri =
    isMemberPaid && item.badgeUrl && item.badge
      ? `${item.badgeUrl}${item.badge}`
      : undefined;

  return {
    name: getPlanAwareName(
      planStatus,
      item.firstname,
      item.lastname,
      item.username,
    ),
    age: item.age ?? "",
    height: item.height ?? "",
    photoUri,
    isPremium: !!badgeUri,
    badgeUri,
    isLocked:
      planStatus === PlanStatus.NOT_PAID || planStatus === PlanStatus.EXPIRED,
    size,
    // ||
    // item.photo_view_status === "locked", // TODO: confirm actual value meaning "locked"
  };
}
