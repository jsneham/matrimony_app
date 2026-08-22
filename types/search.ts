export type IdSearchParams = {
  member_id: string;
  txt_id_search: string;
  gender: string;
};

export type KeywordSearchParams = {
  member_id: string;
  keyword: string;
  photo_search: string;
  gender: string;
};

export type QuickSearchParams = IdSearchParams | KeywordSearchParams;

export type SavedSearchItem = {
  id: string;
  name: string;
  searchPageType: string;
  detail: string;
  searchData: Record<string, string>;
};

export type SavedSearchListResponse = {
  total_count: number;
  continue_request: boolean;
  data: any[];
};
