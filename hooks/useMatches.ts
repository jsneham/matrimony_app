// hooks/useMatches.ts
import { matchesService } from "@/services/matchesService";
import { GetMatchesResponse, MatchProfile } from "@/types/matches";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { Alert } from "react-native";

import { useSession } from "@/hooks/useSession";
import { matchesServices } from "@/services/matchesService";
import { SESSION_KEYS } from "@/types/common";
import { MatchesListResponse } from "@/types/matches";
import { useMemo } from "react";

type UseMyMatchesResponse = {
  data: GetMatchesResponse;
  isLoading: boolean;
  isError: boolean;
  isFetching: boolean;
  error: Error | null;
  refetch: () => void;
};

type UseMyMatchesParams = {
  matriId: string;
  memberId: string;
};

export const useMyMatches = ({ matriId, memberId }: UseMyMatchesParams) => {
  const isReady = Boolean(matriId?.trim() && memberId?.trim());

  const query = useInfiniteQuery({
    queryKey: ["matches", "my-matches", matriId, memberId],
    enabled: isReady,
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      matchesService.getMyMatches({ matriId, memberId, page: pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      const loadedSoFar = allPages.reduce(
        (sum, p) => sum + (p.data?.length ?? 0),
        0,
      );
      if (loadedSoFar >= (lastPage.total_count ?? 0)) return undefined;
      return allPages.length + 1;
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 2,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 10000),
    throwOnError: false,
  });

  const matches = useMemo<MatchProfile[]>(() => {
    const seen = new Set<string>();
    const flat: MatchProfile[] = [];
    query.data?.pages.forEach((page) => {
      (page.data ?? []).forEach((item) => {
        const key = String(item.matri_id ?? item.id);
        if (!seen.has(key)) {
          seen.add(key);
          flat.push({ ...item, id: String(item.id) });
        }
      });
    });
    return flat;
  }, [query.data]);

  return {
    matches,
    totalCount: query.data?.pages?.[0]?.total_count ?? 0,
    isLoading: query.isLoading,
    isError: query.isError,
    isFetchingNextPage: query.isFetchingNextPage,
    isRefetching: query.isRefetching,
    hasNextPage: Boolean(query.hasNextPage),
    fetchNextPage: () => query.fetchNextPage(),
    refetch: () => query.refetch(),
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
