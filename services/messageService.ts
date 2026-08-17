import {
  ChatConversationResponse,
  ConversationListResponse,
  SendMessageResponse,
} from "@/types/message";
import { api } from "./api";

export const messageServices = {
  // ✅ confirmed: AppConstants.newmessage_list — page_number in body, not URL
  getConversationList: async (
    matriId: string,
    page: number,
  ): Promise<ConversationListResponse> => {
    const response = await api.post("message/massages_list_api", {
      // TODO: confirm real path string for AppConstants.newmessage_list
      page_number: page,
      matri_id: matriId,
    });
    return response.data;
  },

  // ✅ confirmed: AppConstants.conversation
  getConversation: async (
    memberId: string,
    matriId: string,
    otherId: string,
  ): Promise<ChatConversationResponse> => {
    const response = await api.post("message/conversation_list_api", {
      // TODO: confirm real path string for AppConstants.conversation
      member_id: memberId,
      matri_id: matriId,
      other_id: otherId,
    });
    return response.data;
  },

  // ✅ confirmed: AppConstants.send_message (from earlier)
  sendMessage: async (
    matriId: string,
    otherId: string,
    message: string,
  ): Promise<SendMessageResponse> => {
    const body = {
      msg_status: "sent",
      message,
      receiver_id: otherId,
      matri_id: matriId,
    };

    try {
      const response = await api.post("message/send_message", body);
      return response.data;
    } catch (err) {
      throw err;
    }
  },
};
