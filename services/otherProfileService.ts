import { OtherProfileResponse } from "@/types/otherProfile";
import { api } from "./api";

export const otherProfileServices = {
  getOtherUserProfile: async (
    otherId: string,
    myUserId: string,
  ): Promise<OtherProfileResponse> => {
    const response = await api.post("search/view_profile_app", {
      member_id: otherId,
      user_id: myUserId,
    });
    return response.data;
  },
};
