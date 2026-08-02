// services/matchesService.ts
import {
  BlockedListResponse,
  GetMatchesResponse,
  MatchesListResponse,
  MatchesRequest,
  PaginatedListResponse,
  SimpleListResponse,
} from "@/types/matches";
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

export const matchesServices = {
  getMatchesList: async (
    endpointBase: string,
    params: { matriId: string; memberId: string; page: number },
  ): Promise<MatchesListResponse> => {
    const url = `${endpointBase}${params.page}`;

    const body = {
      matri_id: params.matriId,
      member_id: params.memberId,
    };

    const response = await api.post(url, body);
    return response.data;
  },
};

// ── Simple pattern: member_id only, no pagination, { status, data } ──────
async function getSimpleList(
  endpoint: string,
  memberId: string,
): Promise<SimpleListResponse> {
  const body = { member_id: memberId };
  const response = await api.post(endpoint, body);
  return response.data;
}

export function getRecentlyJoined(memberId: string) {
  return getSimpleList("my-dashboard/recent-profile", memberId); // TODO: confirm exact path string (only had constant NAME confirmed, not value)
}

export function getRecentlyActive(memberId: string) {
  return getSimpleList("my-dashboard/recently-login", memberId); // ✅ confirmed — NO page number appended
}

// ── Paginated pattern: matri_id + member_id, page number in URL path ─────
async function getPaginatedList(
  endpointBase: string,
  matriId: string,
  memberId: string,
  page: number,
): Promise<PaginatedListResponse> {
  const body = { matri_id: matriId, member_id: memberId };
  const response = await api.post(`${endpointBase}${page}`, body);
  return response.data;
}

export function getWhoViewedProfile(
  matriId: string,
  memberId: string,
  page: number,
) {
  return getPaginatedList(
    "my-profile/who_viewed_profile_app/",
    matriId,
    memberId,
    page,
  ); // ✅ confirmed
}

export function getWhoViewedContact(
  matriId: string,
  memberId: string,
  page: number,
) {
  return getPaginatedList(
    "my-profile/who_viewed_contact_app/",
    matriId,
    memberId,
    page,
  ); // ⚠️ used for both "Viewed your Contact" AND "Contact Viewed" — needs verification, likely wrong for one of them
}

export function getIViewedProfile(
  matriId: string,
  memberId: string,
  page: number,
) {
  return getPaginatedList(
    "my-profile/i_viewed_profile_app/",
    matriId,
    memberId,
    page,
  ); // ✅ confirmed ("Visited by you")
}

export function getAllMatches(matriId: string, memberId: string, page: number) {
  return getPaginatedList("search/result/", matriId, memberId, page); // ✅ confirmed
}

// ── Blocked members: matri_id ONLY, different response shape ─────────────
export async function getBlockedMembers(
  matriId: string,
  page: number,
): Promise<BlockedListResponse> {
  const body = { matri_id: matriId };
  const response = await api.post(`my-profile/block-list/${page}`, body); // ✅ confirmed
  return response.data;
}

// ── NOT YET CONFIRMED — placeholders, will 404 until real paths are known ─
export function getMatchmakerMatches(
  matriId: string,
  memberId: string,
  page: number,
) {
  return getPaginatedList(
    "matches/matchmaker-matches/",
    matriId,
    memberId,
    page,
  ); // TODO: confirm real path
}

export function getMembersLookingForYou(
  matriId: string,
  memberId: string,
  page: number,
) {
  return getPaginatedList("matches/looking-for-you/", matriId, memberId, page); // TODO: confirm real path
}
