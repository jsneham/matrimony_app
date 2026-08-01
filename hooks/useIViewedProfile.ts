// hooks/useIViewedProfile.ts (powers "Visited by you")
import { useSession } from "@/hooks/useSession";
import { getIViewedProfile } from "@/services/matchesService";
import { SESSION_KEYS } from "@/types/common";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useIViewedProfile = () => {
  const { data: sessionData } = useSession([
    SESSION_KEYS.USER_ID,
    SESSION_KEYS.MATRI_ID,
  ]);
  const memberId = sessionData?.[SESSION_KEYS.USER_ID] || "";
  const matriId = sessionData?.[SESSION_KEYS.MATRI_ID] || "";

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
