// services/matchesService.ts
import { GetMatchesResponse, MatchesRequest } from "@/types/matches";
import { api } from "./api";

// Get my matches
const validateMatchesResponse = (
  data: GetMatchesResponse,
): GetMatchesResponse => {
  console.log("📊 Validating response:", {
    hasData: !!data,
    dataType: typeof data,
    dataKeys: typeof data === "object" ? Object.keys(data) : "N/A",
  });

  // Handle different response formats
  let matches = Array.isArray(data?.data) ? data.data : [];

  // If response itself is array
  if (Array.isArray(data)) {
    matches = data;
  }

  // Ensure all matches have string IDs
  const validatedMatches = matches.map((item: any) => ({
    ...item,
    id: String(item.id || Math.random()), // Fallback to random if no ID
  }));

  const totalCount =
    typeof data?.total_count === "number" ? data.total_count : matches.length;

  const response: GetMatchesResponse = {
    data: validatedMatches,
    total_count: totalCount,
    errmessage: data.errmessage,
    errormessage: data.errormessage,
    continue_request: data.continue_request,
    status: data.status,
    tocken: data.tocken,
  };

  console.log("✅ Response validated:", {
    matchCount: validatedMatches.length,
    totalCount: response.total_count,
    hasIds: validatedMatches.every((m) => m.id),
  });

  return response;
};

export const matchesService = {
  getMyMatches: async (data: MatchesRequest): Promise<GetMatchesResponse> => {
    try {
      const body = {
        member_id: data.memberId,
        matri_id: data.matriId,
      };

      console.log("🔄 Fetching matches:", {
        endpoint: `matches/search_now/${data.page}`,
        matriId: data.matriId ? "✅" : "",
        memberId: data.memberId ? "✅" : "",
        page: data.page,
      });

      const response = await api.post(`matches/search_now/${data.page}`, body);

      console.log("Raw API response:", {
        status: response.status,
        dataType: typeof response.data,
        isArray: Array.isArray(response.data),
        firstItem: Array.isArray(response.data)
          ? response.data[0]
          : response.data?.data?.[0],
      });

      //  CRITICAL: Validate response before returning
      const validatedResponse = validateMatchesResponse(response.data);

      return validatedResponse;
    } catch (error: any) {
      console.error(" getMyMatches error:", {
        message: error?.message,
        status: error?.response?.status,
        statusText: error?.response?.statusText,
        endpoint: error?.config?.url,
        responseData: error?.response?.data,
      });

      // Return empty response on error instead of throwing
      // This prevents app crash in release builds
      return {
        data: [],
        total_count: 0,
        status: "",
        continue_request: false,
        errmessage: "",
        tocken: "",
        errormessage: "",
      };
    }
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
