export type SearchFilterParams = {
  member_id: string;
  from_age: string;
  to_age: string;
  from_height: string;
  to_height: string;
  looking_for: string;
  religion: string;
  caste: string;
  mothertongue: string;
  country: string;
  state: string;
  city: string;
  education: string;
  occupation: string;
  employee_in: string;
  income: string;
  diet: string;
  drink: string;
  smoking: string;
  complexion: string;
  bodytype: string;
  photo_search: string; // "photo_search" or ""
  gender: string; // opposite of logged-in user's gender
};

// TODO: field names are best-guess based on other confirmed endpoints
// (matches/search_now shares this shape) — verify against a real response.
export type SearchResultItem = {
  id: string;
  matri_id: string;
  username: string;
  age: string;
  height: string;
  city_name: string;
  religion_name: string;
  occupation_name: string;
  income: string;
  education_name: string;
  profileby: string; // "Self" | "Sibling" | etc. → "Profile managed by ..."
  photo1: string | null;
  photoUrl: string;
  photo_view_status: string; // gates blur/lock
  badge: string; // e.g. "Pro Max"
  logged_in: string; // "1" = show "Active Today"
  action: {
    is_like: string;
    is_block: number;
    is_shortlist: number;
    is_interest: string;
  }[];
};

export type SearchResultResponse = {
  status: string;
  total_count: number;
  continue_request: boolean;
  data: SearchResultItem[];
};
