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
  name?: string;
  age?: string;
  height?: string;
  photoUri?: string;
  isPremium?: boolean;
  badgeUri?: string;
  isLocked?: boolean;
  size?: "large" | "small";
  placeholderColor?: string;
};

export type MatchSectionKey =
  | "profile_visitors"
  | "recently_joined"
  | "recently_active"
  | "viewed_your_contact"
  | "matchmaker_matches"
  | "all_matches"
  | "members_looking_for_you"
  | "visited_by_you"
  | "contact_viewed"
  | "blocked_members";

export type VisitorApiItem = {
  id?: string;
  matri_id: string;
  user_id?: string;
  username?: string;
  firstname?: string;
  lastname?: string;
  photo1: string;
  photo1_approve: string;
  photoUrl: string;
  photo_view_count: string;
  photo_view_status: string;
  photo_protect?: string;
  photo_password?: string;
  badge: string;
  badgeUrl: string;
  color: string;
  age: string;
  height: string;
  caste_name: string;
  religion_name: string;
  city_name: string;
  country_name: string;
  state_name: string;
  education_name: string;
  designation_name?: string;
  occupation_name?: string;
  mtongue_name?: string;
  profileby: string;
  plan_status: string;
  action: Record<string, any>[];
};

export type BlockedApiItem = {
  matri_id: string;
  user_id: string;
  username: string;
  photo1: string;
  photo1_approve: string;
  photo_view_status: string;
  photo_view_count: string;
  photoUrl: string;
  birthdate: string;
  height: string;
  caste_name: string;
  religion_name: string;
  city_name: string;
  state_name: string;
  country_name: string;
};

export type SimpleListResponse = {
  status: string;
  data: VisitorApiItem[];
};

export type PaginatedListResponse = {
  total_count: number;
  continue_request: boolean;
  data: VisitorApiItem[];
};

export type BlockedListResponse = {
  total_count: number;
  continue_request: boolean;
  data: BlockedApiItem[];
};

export type MatchSectionConfig = {
  key: string;
  title: string;
  description: string;
  isPremiumSection?: boolean;
  cardSize: "large" | "small";
  isPaginated: boolean; // true = useInfiniteQuery, false = useQuery
};

export type MatchesListResponse = {
  total_count: number;
  continue_request: boolean;
  data: VisitorApiItem[];
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

export const RECENTLY_JOINED_MATCHES: VisitorCardProps[] = [
  {
    photoUri:
      "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=300&h=400&fit=crop",
    isPremium: true,
  },
  {
    photoUri:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&h=400&fit=crop",
  },
  {
    photoUri:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=300&h=400&fit=crop",
  },
  {},
  {},
];

export const RECENTLY_ACTIVE_MATCHES: VisitorCardProps[] = [
  {
    photoUri:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=300&h=400&fit=crop",
    isPremium: true,
  },
  {
    photoUri:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=400&fit=crop",
  },
  {
    photoUri:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=400&fit=crop",
  },
  {},
  {},
];

export const VIEWED_YOUR_CONTACT: VisitorCardProps[] = [
  {
    photoUri:
      "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?w=300&h=400&fit=crop",
  },
  {
    photoUri:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=400&fit=crop",
  },
  {
    photoUri:
      "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=300&h=400&fit=crop",
  },
  {},
  {},
];

export const MATCHMAKER_MATCHES: VisitorCardProps[] = [
  { placeholderColor: "#8b8b8b" },
  { placeholderColor: "#8b8b8b" },
  { placeholderColor: "#8b8b8b" },
  {},
  {},
];

export const ALL_MATCHES: VisitorCardProps[] = [
  {
    photoUri:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=400&fit=crop",
  },
  {
    photoUri:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=400&fit=crop",
  },
  {
    photoUri:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=300&h=400&fit=crop",
  },
  {},
  {},
];

export const MEMBERS_LOOKING_FOR_YOU: VisitorCardProps[] = [
  {
    photoUri:
      "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?w=300&h=400&fit=crop",
  },
  {
    photoUri:
      "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=300&h=400&fit=crop",
  },
  {
    photoUri:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=400&fit=crop",
  },
  {},
  {},
];

export const VISITED_BY_YOU: VisitorCardProps[] = [
  {
    photoUri:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=400&fit=crop",
  },
  {
    photoUri:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=300&h=400&fit=crop",
  },
  {},
  {},
  {},
];

export const CONTACT_VIEWED: VisitorCardProps[] = [
  {
    photoUri:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&h=400&fit=crop",
  },
  {
    photoUri:
      "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?w=300&h=400&fit=crop",
  },
  {},
  {},
  {},
];

export const BLOCKED_MEMBERS: VisitorCardProps[] = [
  {
    photoUri:
      "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=300&h=400&fit=crop",
  },
  {},
  {},
  {},
  {},
];
