export type MatchAction = {
  is_shortlist: number;
  is_interest: string;
  is_like: string;
  is_block: number;
  is_login: number;
  is_view: number;
};

export type MatchProfile = {
  id: string;
  matri_id: string;
  username: string;
  firstname: string;
  lastname: string;
  gender: string;

  age: string;
  height: string;

  religion_name: string;
  caste_name: string;
  mtongue_name: string;

  country_name: string;
  state_name: string;
  city_name: string;

  education_name: string;
  occupation_name: string;
  designation_name: string;

  income: string;
  profile_description: string;

  photo1: string | null;
  photo1_approve: string;
  photoUrl: string;

  photo_protect: string;
  photo_password: string | null;
  photo_view_status: string;
  photo_view_count: number;

  plan_status: string;

  badge: string;
  badgeUrl: string;
  color: string;

  action: MatchAction[];

  // Allow additional fields from API
  [key: string]: any;
};

export type GetMatchesResponse = {
  data: MatchProfile[];
  total_count: number;
  continue_request: boolean;
  tocken: string;
  status: string;
  errormessage: string;
  errmessage: string;
};

export type MatchesRequest = {
  matriId: string;
  memberId: string;
  page: number;
};

export type MatchCardProps = {
  profile: MatchProfile;
};
