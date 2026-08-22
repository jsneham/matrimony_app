import { useSession } from "@/hooks/useSession";
import { searchService } from "@/services/searchService";
import { SESSION_KEYS } from "@/types/common";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useSavedSearches = () => {
  const { data: sessionData } = useSession([SESSION_KEYS.MATRI_ID]);
  const matriId = sessionData?.[SESSION_KEYS.MATRI_ID] || "";

  return useInfiniteQuery({
    queryKey: ["saved-searches", matriId],
    enabled: !!matriId,
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      searchService.getSavedSearches(matriId, pageParam),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.continueRequest ? allPages.length + 1 : undefined,
  });
};
