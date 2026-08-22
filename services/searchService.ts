import {
  IdSearchParams,
  KeywordSearchParams,
  SavedSearchItem,
  SavedSearchListResponse,
} from "@/types/search";
import { SearchFilterParams, SearchResultResponse } from "@/types/searchResult";
import { getOppositeGender } from "@/utils/gender";
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

export const buildIdSearchParams = (
  memberId: string,
  ownGender: string | undefined,
  matriId: string,
): IdSearchParams => ({
  member_id: memberId,
  txt_id_search: matriId,
  gender: getOppositeGender(ownGender),
});

export const buildKeywordSearchParams = (
  memberId: string,
  ownGender: string | undefined,
  keyword: string,
  withPhotoOnly: boolean,
): KeywordSearchParams => ({
  member_id: memberId,
  keyword,
  photo_search: withPhotoOnly ? "photo_search" : "",
  gender: getOppositeGender(ownGender),
});

const checkNull = (val?: string): string =>
  val && val.trim().length > 0 ? `${val}, ` : "";

const checkAge = (fromAge?: string, toAge?: string): string =>
  fromAge && toAge ? `${fromAge} - ${toAge} yrs, ` : "";

const checkHeight = (fromHeight?: string, toHeight?: string): string =>
  fromHeight && toHeight ? `${fromHeight} - ${toHeight}, ` : "";

const mapSavedSearchItem = (obj: any): SavedSearchItem => {
  const detailRaw =
    checkAge(obj.from_age, obj.to_age) +
    checkHeight(obj.from_height_str, obj.to_height_str) +
    checkNull(obj.marital_status) +
    checkNull(obj.religion_str) +
    checkNull(obj.caste_str) +
    checkNull(obj.mother_tongue_str) +
    checkNull(obj.country_str) +
    checkNull(obj.state_str) +
    checkNull(obj.city_str) +
    checkNull(obj.education_str) +
    checkNull(obj.occupation_str) +
    checkNull(obj.employee_in) +
    checkNull(obj.income?.replace(",", "").replace("Rs", " Rs")) +
    checkNull(obj.diet) +
    checkNull(obj.drink) +
    checkNull(obj.smoking) +
    checkNull(obj.complexion) +
    checkNull(obj.bodytype) +
    checkNull(obj.keyword) +
    checkNull(obj.id_search) +
    checkNull(obj.with_photo === "photo_search" ? "With Photo" : "");

  const detail = detailRaw.trim().replace(/,$/, ""); // trim trailing ", "

  return {
    id: obj.id,
    name: obj.search_name,
    searchPageType: obj.search_page_nm,
    detail,
    searchData: obj,
  };
};

export const searchService = {
  // Real network call — matches Java's getListdata(page)
  getSavedSearches: async (
    matriId: string,
    page: number,
  ): Promise<{
    totalCount: number;
    continueRequest: boolean;
    items: SavedSearchItem[];
  }> => {
    const response = await api.post(`search/saved//${page}`, {
      matri_id: matriId,
    });
    const data: SavedSearchListResponse = response.data;

    return {
      totalCount: data.total_count,
      continueRequest: data.continue_request,
      items: Array.isArray(data.data) ? data.data.map(mapSavedSearchItem) : [],
    };
  },
};
