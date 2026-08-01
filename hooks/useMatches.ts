// hooks/useMatches.ts
import { matchesService } from "@/services/matchesService";
import { GetMatchesResponse, MatchesRequest } from "@/types/matches";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import { Alert } from "react-native";

import { useSession } from "@/hooks/useSession";
import { matchesServices } from "@/services/matchesService";
import { SESSION_KEYS } from "@/types/common";
import { MatchesListResponse } from "@/types/matches";

type UseMyMatchesResponse = {
  data: GetMatchesResponse;
  isLoading: boolean;
  isError: boolean;
  isFetching: boolean;
  error: Error | null;
  refetch: () => void;
};

export const useMyMatches = (data: MatchesRequest): UseMyMatchesResponse => {
  //  CRITICAL: Only run query when both IDs are available
  const isReady = Boolean(data.matriId?.trim() && data.memberId?.trim());

  const query = useQuery({
    //  CRITICAL: Proper query key with all dependencies
    queryKey: ["matches", "my-matches", data.matriId, data.memberId, data.page],

    //  CRITICAL: Only enable when ready
    enabled: isReady,

    queryFn: async () => {
      if (!isReady) {
        console.warn("⚠️ Query called before ready");
        return {
          data: [],
          total_count: 0,
          page: 1,
          page_size: 0,
        };
      }

      try {
        const result = await matchesService.getMyMatches(data);
        console.log("✅ Query successful:", {
          itemCount: result.data.length,
          totalCount: result.total_count,
        });
        return result;
      } catch (error) {
        console.error(" Query failed:", error);
        throw error;
      }
    },

    //  CRITICAL: Retry configuration for network issues
    retry: 2,
    retryDelay: (attemptIndex) => {
      const delay = Math.min(1000 * Math.pow(2, attemptIndex), 10000);
      console.log(`🔄 Retrying in ${delay}ms (attempt ${attemptIndex + 1})`);
      return delay;
    },

    //  CRITICAL: Cache timing for release builds
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes

    //  CRITICAL: Don't throw on error - handle gracefully
    throwOnError: false,
  }) as UseQueryResult<GetMatchesResponse, Error>;

  return {
    data: query.data || {
      data: [],
      total_count: 0,
      continue_request: false,
      errmessage: "Error",
      errormessage: "Error",
      status: "failed",
      tocken: "",
    },
    isLoading: query.isLoading,
    isError: query.isError,
    isFetching: query.isFetching,
    error: query.error,
    refetch: () => {
      console.log("🔄 Manual refetch triggered");
      query.refetch();
    },
  };
};

export const useMoreMatches = (page: number = 1) => {
  return useQuery({
    queryKey: ["matches", "more-matches", page],
    queryFn: () => matchesService.getMoreMatches(page, 10),
  });
};

export const useLikeProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (profileId: string) => matchesService.likeProfile(profileId),
    onSuccess: (data) => {
      console.log("Profile liked:", data.message);
      // Invalidate matches to refresh the list
      queryClient.invalidateQueries({ queryKey: ["matches"] });
    },
    onError: (error: any) => {
      const errorMsg =
        error.response?.data?.message || "Failed to like profile";
      Alert.alert("Error", errorMsg);
    },
  });
};

export const useSkipProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (profileId: string) => matchesService.skipProfile(profileId),
    onSuccess: (data) => {
      console.log("Profile skipped:", data.message);
      queryClient.invalidateQueries({ queryKey: ["matches"] });
    },
    onError: (error: any) => {
      const errorMsg =
        error.response?.data?.message || "Failed to skip profile";
      Alert.alert("Error", errorMsg);
    },
  });
};

export const useSendInterest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      profileId,
      message,
    }: {
      profileId: string;
      message?: string;
    }) => matchesService.sendInterest(profileId, message),
    onSuccess: (data) => {
      Alert.alert("Success", data.message || "Interest sent successfully");
      queryClient.invalidateQueries({ queryKey: ["matches"] });
    },
    onError: (error: any) => {
      const errorMsg =
        error.response?.data?.message || "Failed to send interest";
      Alert.alert("Error", errorMsg);
    },
  });
};

/**
 * Preview mode: single page (used for the horizontal scroll rows on
 * MoreMatchesTab — just needs the first ~10 items).
 */
export const useMatchesPreview = (endpointBase: string, sectionKey: string) => {
  const { data: sessionData } = useSession([
    SESSION_KEYS.USER_ID,
    SESSION_KEYS.MATRI_ID,
  ]);
  const memberId = sessionData?.[SESSION_KEYS.USER_ID] || "";
  const matriId = sessionData?.[SESSION_KEYS.MATRI_ID] || "";

  return useQuery({
    queryKey: ["matches-preview", sectionKey, memberId],
    enabled: !!memberId && !!matriId,
    queryFn: () =>
      matchesServices.getMatchesList(endpointBase, {
        matriId,
        memberId,
        page: 1,
      }),
  });
};

export const useMatchesFullList = (
  endpointBase: string,
  sectionKey: string,
) => {
  const { data: sessionData } = useSession([
    SESSION_KEYS.USER_ID,
    SESSION_KEYS.MATRI_ID,
  ]);
  const memberId = sessionData?.[SESSION_KEYS.USER_ID] || "";
  const matriId = sessionData?.[SESSION_KEYS.MATRI_ID] || "";

  return useInfiniteQuery({
    queryKey: ["matches-full", sectionKey, memberId],
    enabled: !!memberId && !!matriId,
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      matchesServices.getMatchesList(endpointBase, {
        matriId,
        memberId,
        page: pageParam,
      }),
    getNextPageParam: (lastPage: MatchesListResponse, allPages) => {
      // Matches Java: stop if fewer than 10 items OR total_count reached
      if (!lastPage.data || lastPage.data.length < 10) return undefined;
      if (lastPage.continue_request === false) return undefined;
      return allPages.length + 1;
    },
  });
};
