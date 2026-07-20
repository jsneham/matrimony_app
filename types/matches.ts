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

export type VisitorCardProps = {
  name: string;
  age: string;
  height: string;
  photoUri?: string;
  isPremium?: boolean;
  isLocked?: boolean;
};

// ─── Mock Data ────────────────────────────────────────────────────────────────

export const PROFILE_VISITORS: VisitorCardProps[] = [
  {
    name: "H Radhakrishna",
    age: "38",
    height: `5' 7"`,
    photoUri:
      "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?w=300&h=400&fit=crop",
    isPremium: true,
    isLocked: true,
  },
  {
    name: "Shekhar Gawade",
    age: "28",
    height: `5' 8"`,
    photoUri:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=400&fit=crop",
  },
  {
    name: "Ajay Ghanekar",
    age: "30",
    height: `5' 9"`,
    photoUri:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=400&fit=crop",
  },
  {
    name: "Sumit Gaikwad",
    age: "32",
    height: `5' 10"`,
  },
  {
    name: "Male Demo login",
    age: "26",
    height: "Above 7'",
  },
];
