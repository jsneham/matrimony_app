import { useSession } from "@/hooks/useSession";
import {
    getAllMatches,
    getBlockedMembers,
    getIViewedProfile,
    getMatchmakerMatches,
    getMembersLookingForYou,
    getRecentlyActive,
    getRecentlyJoined,
    getWhoViewedContact,
    getWhoViewedProfile,
} from "@/services/matchesService";
import { SESSION_KEYS } from "@/types/common";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

function useMemberSession() {
  const { data: sessionData } = useSession([
    SESSION_KEYS.USER_ID,
    SESSION_KEYS.MATRI_ID,
  ]);
  return {
    memberId: sessionData?.[SESSION_KEYS.USER_ID] || "",
    matriId: sessionData?.[SESSION_KEYS.MATRI_ID] || "",
  };
}

// ── Simple (non-paginated) hooks ──────────────────────────────────────────

export const useRecentlyJoined = () => {
  const { memberId } = useMemberSession();
  return useQuery({
    queryKey: ["matches", "recently-joined", memberId],
    enabled: !!memberId,
    queryFn: () => getRecentlyJoined(memberId),
  });
};

export const useRecentlyActive = () => {
  const { memberId } = useMemberSession();
  return useQuery({
    queryKey: ["matches", "recently-active", memberId],
    enabled: !!memberId,
    queryFn: () => getRecentlyActive(memberId),
  });
};

// ── Paginated hooks ────────────────────────────────────────────────────────

export const useWhoViewedProfile = () => {
  const { memberId, matriId } = useMemberSession();
  return useInfiniteQuery({
    queryKey: ["matches", "who-viewed-profile", memberId],
    enabled: !!memberId && !!matriId,
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      getWhoViewedProfile(matriId, memberId, pageParam),
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.data || lastPage.data.length < 10) return undefined;
      if (lastPage.continue_request === false) return undefined;
      return allPages.length + 1;
    },
  });
};

export const useWhoViewedContact = () => {
  const { memberId, matriId } = useMemberSession();
  return useInfiniteQuery({
    queryKey: ["matches", "who-viewed-contact", memberId],
    enabled: !!memberId && !!matriId,
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      getWhoViewedContact(matriId, memberId, pageParam),
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.data || lastPage.data.length < 10) return undefined;
      if (lastPage.continue_request === false) return undefined;
      return allPages.length + 1;
    },
  });
};

export const useIViewedProfile = () => {
  const { memberId, matriId } = useMemberSession();
  return useInfiniteQuery({
    queryKey: ["matches", "i-viewed-profile", memberId],
    enabled: !!memberId && !!matriId,
    initialPageParam: 1,
    queryFn: ({ pageParam }) => getIViewedProfile(matriId, memberId, pageParam),
    getNextPageParam: (lastPage, allPages) =>
      !lastPage.data || lastPage.data.length === 0
        ? undefined
        : allPages.length + 1,
  });
};

export const useAllMatches = () => {
  const { memberId, matriId } = useMemberSession();
  return useInfiniteQuery({
    queryKey: ["matches", "all-matches", memberId],
    enabled: !!memberId && !!matriId,
    initialPageParam: 1,
    queryFn: ({ pageParam }) => getAllMatches(matriId, memberId, pageParam),
    getNextPageParam: (lastPage, allPages) =>
      !lastPage.data || lastPage.data.length === 0
        ? undefined
        : allPages.length + 1,
  });
};

export const useBlockedMembers = () => {
  const { matriId } = useMemberSession();
  return useInfiniteQuery({
    queryKey: ["matches", "blocked-members", matriId],
    enabled: !!matriId,
    initialPageParam: 1,
    queryFn: ({ pageParam }) => getBlockedMembers(matriId, pageParam),
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.data || lastPage.data.length < 10) return undefined;
      if (lastPage.continue_request === false) return undefined;
      return allPages.length + 1;
    },
  });
};

export const useMatchmakerMatches = () => {
  const { memberId, matriId } = useMemberSession();
  return useInfiniteQuery({
    queryKey: ["matches", "matchmaker-matches", memberId],
    enabled: !!memberId && !!matriId,
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      getMatchmakerMatches(matriId, memberId, pageParam),
    getNextPageParam: (lastPage, allPages) =>
      !lastPage.data || lastPage.data.length === 0
        ? undefined
        : allPages.length + 1,
  });
};

export const useMembersLookingForYou = () => {
  const { memberId, matriId } = useMemberSession();
  return useInfiniteQuery({
    queryKey: ["matches", "members-looking-for-you", memberId],
    enabled: !!memberId && !!matriId,
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      getMembersLookingForYou(matriId, memberId, pageParam),
    getNextPageParam: (lastPage, allPages) =>
      !lastPage.data || lastPage.data.length === 0
        ? undefined
        : allPages.length + 1,
  });
};
