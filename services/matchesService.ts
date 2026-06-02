// services/matchesService.ts
import { GetMatchesResponse, MatchesRequest } from "@/types/matches";
import { api } from "./api";

export const matchesService = {
  // Get my matches
  getMyMatches: async (data: MatchesRequest): Promise<GetMatchesResponse> => {
    const body = {
      member_id: data.memberId,
    };

    console.log("Request Body:", body);

    const response = await api.post(`matches/search_now/${data.page}`, body);

    console.log("Response:", response.data);

    return response.data;
  },

  getMyMatches1: async (data: MatchesRequest): Promise<GetMatchesResponse> => {
    console.log("matchesService.getMyMatches called with data:", data);
    const params = {
      matri_id: data.matriId,
      member_id: data.memberId,
      page: data.page,
    };

    console.log("getMyMatches params:", params);

    const response = await api.get("search/result/", { params });
    console.log("getMyMatches API Response:", response.data);
    return response.data;
  },

  // Get more matches
  getMoreMatches: async (
    page: number = 1,
    limit: number = 10,
  ): Promise<GetMatchesResponse> => {
    const response = await api.get("/matches/more-matches", {
      params: {
        page,
        limit,
      },
    });
    return response.data;
  },

  // Like/interest in a profile
  likeProfile: async (
    profileId: string,
  ): Promise<{ status: string; message: string }> => {
    const response = await api.post("/matches/like", { profile_id: profileId });
    return response.data;
  },

  // Skip/ignore a profile
  skipProfile: async (
    profileId: string,
  ): Promise<{ status: string; message: string }> => {
    const response = await api.post("/matches/skip", { profile_id: profileId });
    return response.data;
  },

  // Send interest/message
  sendInterest: async (
    profileId: string,
    message?: string,
  ): Promise<{ status: string; message: string }> => {
    const response = await api.post("/matches/send-interest", {
      profile_id: profileId,
      message,
    });
    return response.data;
  },
};
