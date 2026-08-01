import { notificationServices } from "@/services/notificationService";
import { NotificationListResponse } from "@/types/notifications";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useNotifications = (memberId: string) => {
  return useInfiniteQuery({
    queryKey: ["notifications", memberId],
    enabled: !!memberId,
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      notificationServices.getNotificationList({
        memberId,
        pageNumber: pageParam,
      }),
    getNextPageParam: (lastPage: NotificationListResponse, allPages) => {
      // No more data available on server — matches Java's setMoreDataAvailable(false)
      if (!lastPage.data || lastPage.data.length === 0) {
        return undefined;
      }
      return allPages.length + 1;
    },
  });
};
