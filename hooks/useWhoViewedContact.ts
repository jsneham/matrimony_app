// hooks/useWhoViewedContact.ts
import { useSession } from "@/hooks/useSession";
import { getWhoViewedContact } from "@/services/matchesService";
import { SESSION_KEYS } from "@/types/common";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useWhoViewedContact = () => {
  const { data: sessionData } = useSession([
    SESSION_KEYS.USER_ID,
    SESSION_KEYS.MATRI_ID,
  ]);
  const memberId = sessionData?.[SESSION_KEYS.USER_ID] || "";
  const matriId = sessionData?.[SESSION_KEYS.MATRI_ID] || "";

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
