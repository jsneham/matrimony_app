// services/matchesService.ts
import { ApiResponse, ProfileRequest, UserProfile } from "@/types/profile";
import { api } from "./api";

export const userServices = {
  // Get my profile data
  getMyProfile: async (
    data: ProfileRequest,
  ): Promise<ApiResponse<UserProfile>> => {
    const body = {
      member_id: data.memberId,
    };

    const response = await api.post("my-profile/get_my_profile", body);

    return response.data;
  },
};
