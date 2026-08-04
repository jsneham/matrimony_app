export type ConversationListItem = {
  id: string;
  otherID: string;
  content: string;
  sent_on: string;
  unread_count: string;
  photo_url: string;
  username: string;
  firstname?: string;
  lastname?: string;
};

export type ConversationListResponse = {
  status: string;
  continue_request: boolean;
  total_count: number;
  data: ConversationListItem[];
};

export type OppositeUserData = {
  id: string;
  photo_url: string;
  logged_in: string; // "1" = online
  username?: string;
};

export type ChatMessageItem = {
  id: string;
  sender: string;
  receiver: string;
  content: string;
  sent_on: string;
  is_sent_receive: string; // TODO: confirm values — likely "sent" | "receive" or similar
  photo_url: string;
};

export type ChatConversationResponse = {
  status: string;
  total_count: number;
  opposite_user_data: OppositeUserData;
  data: ChatMessageItem[];
};

export type SendMessageResponse = {
  status: string;
  errmessage: string;
};
