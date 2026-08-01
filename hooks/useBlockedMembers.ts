// hooks/useBlockedMembers.ts
import { useSession } from "@/hooks/useSession";
import { getBlockedMembers } from "@/services/matchesService";
import { SESSION_KEYS } from "@/types/common";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useBlockedMembers = () => {
  const { data: sessionData } = useSession([SESSION_KEYS.MATRI_ID]);
  const matriId = sessionData?.[SESSION_KEYS.MATRI_ID] || "";

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
