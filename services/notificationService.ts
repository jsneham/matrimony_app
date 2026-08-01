import {
  NotificationListResponse,
  NotificationPageRequest,
} from "@/types/notifications";
import { api } from "./api";

export const notificationServices = {
  // Get paginated notification list
  getNotificationList: async (
    data: NotificationPageRequest,
  ): Promise<NotificationListResponse> => {
    const body = {
      member_id: data.memberId,
      page_number: data.pageNumber,
    };
    console.log("Notification List Request:", body);
    const response = await api.post(
      "common_request/get_notification_list",
      body,
    );

    console.log("Notification List Response:", response.data);
    return response.data;
  },
};
