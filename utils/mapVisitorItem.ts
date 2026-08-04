import { VisitorApiItem, VisitorCardProps } from "@/types/matches";
import { getPlanAwareName } from "@/utils/profileHelpers";

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
  const photoUri =
    item.photoUrl && item.photo1 ? `${item.photoUrl}${item.photo1}` : undefined;

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
    isPremium: item.badge?.toLowerCase() === "gold" || !!item.badgeUrl,
    isLocked: item.photo_view_status === "locked", // TODO: confirm actual value meaning "locked"
    size,
  };
}
