// hooks/useMatches.ts
import { matchesService } from "@/services/matchesService";
import { GetMatchesResponse, MatchesRequest } from "@/types/matches";
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import { Alert } from "react-native";

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
