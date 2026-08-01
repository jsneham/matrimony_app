export type NotificationApiItem = {
  id: string;
  type?: string; // TODO: confirm actual field name/values from your API
  title: string;
  message: string; // TODO: confirm actual field name (message/body/description?)
  created_at: string; // TODO: confirm actual field name/format
  member_id?: string;
  image?: string;
};

export type NotificationListResponse = {
  total_count?: string;
  data: NotificationApiItem[];
};

export type NotificationPageRequest = {
  memberId: string;
  pageNumber: number;
};
