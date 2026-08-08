export type NotificationType =
  | "payment_received"
  | "plan_expired"
  | "featured_profile"
  | "profile_photo_approval"
  | "id_proof_photo_approval"
  | "video_approval"
  | "viewed_contact_details"
  | "viewed_profile"
  | "add_shortlist"
  | "like_member"
  | "interest_receive"
  | "reminder_interest_receive"
  | "accepted_interest_receive"
  | "rejected_interest_receive"
  | "message"
  | "photo_request"
  | string; // fallback for unknown/future types

export type NotificationApiItem = {
  id: string;
  notification_type: NotificationType;
  title: string;
  message: string;
  created_on: string;
  sender_id: string;
  photo_url: string;
  read_status: string;
  receiver_id: string;
};

export type NotificationListResponse = {
  total_count?: string;
  data: NotificationApiItem[];
};

export type NotificationPageRequest = {
  memberId: string;
  pageNumber: number;
  appType: string;
};
