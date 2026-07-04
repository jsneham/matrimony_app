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

    console.log("Request Body:", body);

    const response = await api.post("my-profile/get_my_profile", body);

    console.log("Response:", JSON.stringify(response.data));

    return response.data;
  },
};
