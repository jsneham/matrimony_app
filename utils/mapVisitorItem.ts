import { VisitorApiItem, VisitorCardProps } from "@/types/matches";

export function mapVisitorItem(
  item: VisitorApiItem,
  size: "large" | "small",
): VisitorCardProps {
  return {
    name: item.username,
    age: item.age,
    height: item.height,
    photoUri: item.photoUrl || item.photo1,
    isPremium: item.badge?.toLowerCase() === "gold" || !!item.badgeUrl,
    isLocked: item.photo_view_status === "locked", // TODO: confirm actual value meaning "locked"
    size,
  };
}
