import { searchServices } from "@/services/searchService";
import { SearchFilterParams } from "@/types/searchResult";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useSearchResults = (params: SearchFilterParams | null) => {
  return useInfiniteQuery({
    queryKey: ["search-results", params],
    enabled: !!params,
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      searchServices.getSearchResults(params!, pageParam),
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.data || lastPage.data.length === 0) return undefined;
      if (lastPage.continue_request === false) return undefined;
      return allPages.length + 1;
    },
  });
};
