import { SearchFilterParams, SearchResultResponse } from "@/types/searchResult";
import { api } from "./api";

export const searchServices = {
  // ✅ confirmed endpoint (AppConstants.search_result) + page appended, matching Java
  getSearchResults: async (
    params: SearchFilterParams,
    page: number,
  ): Promise<SearchResultResponse> => {
    const response = await api.post(`search/result/${page}`, params);
    return response.data;
  },
};
