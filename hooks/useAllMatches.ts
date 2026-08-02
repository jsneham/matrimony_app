// hooks/useAllMatches.ts
import { useSession } from "@/hooks/useSession";
import { getAllMatches } from "@/services/matchesService";
import { SESSION_KEYS } from "@/types/common";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useAllMatches = () => {
  const { data: sessionData } = useSession([
    SESSION_KEYS.USER_ID,
    SESSION_KEYS.MATRI_ID,
  ]);
  const memberId = sessionData?.[SESSION_KEYS.USER_ID] || "";
  const matriId = sessionData?.[SESSION_KEYS.MATRI_ID] || "";

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
