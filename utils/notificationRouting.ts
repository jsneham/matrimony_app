import { NotificationApiItem } from "@/types/notifications";
import { router } from "expo-router";

/**
 * Mirrors the Android NotificationBean routing switch.
 * TODO: confirm/adjust each route path to match your actual Expo Router file structure.
 */
export function navigateForNotification(item: NotificationApiItem) {
  const senderId = item.sender_id;

  switch (item.notification_type) {
    case "payment_received":
      router.push("/(membership)");
      break;

    case "plan_expired":
      //   router.push("/plans");
      break;

    case "featured_profile":
      //   router.push("/profile/me");
      break;

    case "profile_photo_approval":
      router.push("/(profile)/EditPhotosMoreScreen");
      break;

    case "id_proof_photo_approval":
      router.push("/(profile)/EditPhotosMoreScreen");
      break;

    case "video_approval":
      router.push("/(profile)/EditPhotosMoreScreen");
      break;

    case "viewed_contact_details":
    case "viewed_profile":
      //   if (senderId) {
      //     router.push({
      //       pathname: "/profile/[memberId]",
      //       params: { memberId: senderId },
      //     });
      //   }
      break;

    case "add_shortlist":
      //   router.push("/shortlisted");
      break;

    case "like_member":
      //   router.push("/likes");
      break;

    case "interest_receive":
      //   router.push({
      //     pathname: "/interests",
      //     params: { tab: "receive" },
      //   });
      break;

    case "reminder_interest_receive":
    case "accepted_interest_receive":
    case "rejected_interest_receive":
      //   router.push("/interests");
      break;

    case "message":
      router.push("/(tabs)/message");
      break;

    case "photo_request":
      router.push("/(profile)/EditPhotosMoreScreen");
      break;

    default:
      // Nothing — matches Java's default case
      break;
  }
}
