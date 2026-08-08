import { NotificationApiItem } from "@/types/notifications";
import { Href, router } from "expo-router";

export function navigateForNotification(item: NotificationApiItem) {
  const senderId = item.sender_id;
  const openPhotosTab = () =>
    router.push({
      pathname: "/(profile)",
      params: { tab: "photos" },
    } as Href);

  switch (item.notification_type) {
    case "payment_received":
      router.push("/(membership)");
      break;

    case "plan_expired":
      router.push("/membership");
      break;

    case "featured_profile":
      router.push({
        pathname: "/profile/[matriId]",
        params: { matriId: senderId },
      });
      break;

    case "profile_photo_approval":
      openPhotosTab();
      break;

    case "id_proof_photo_approval":
      openPhotosTab();
      break;

    case "video_approval":
      openPhotosTab();
      break;

    case "viewed_contact_details":
    case "viewed_profile":
      if (senderId) {
        router.push({
          pathname: "/profile/[matriId]",
          params: { matriId: senderId },
        });
      }
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
      router.push({
        pathname: "/message/chat/[other_matriId]",
        params: { other_matriId: senderId },
      });
      break;

    case "photo_request":
      openPhotosTab();
      break;

    default:
      break;
  }
}
