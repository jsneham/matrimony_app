export type OtherUserProfile = {
  id: string;
  matri_id: string;
  username: string;
  status: string; // "APPROVED" → shows "Verified" badge
  age: string;
  height: string;
  marital_status: string;
  bodytype: string;
  weight: string;
  complexion: string;
  physical_info: string;
  mother_tongue: string;
  mtongue_name: string;
  city_name: string;
  state_name: string;
  country_name: string;
  residence: string;
  diet: string;
  drink: string;
  smoke: string;
  education_name: string;
  employee_in: string;
  income: string;
  occupation_name: string;
  designation_name: string | null;
  hobby: string | null;
  languages_known: string; // e.g. "7,5,58" — TODO: needs a name lookup, currently shown raw
  religion_name: string;
  caste_name: string;
  gothra: string | null;
  horoscope: string;
  moonsign: string; // TODO: raw id, needs lookup table for display text
  star: string; // TODO: raw id, needs lookup table for display text
  manglik: string | null;
  blood_group: string;
  birthdate: string;
  birthplace: string | null;
  mobile: string;
  contact_view_security: string;
  profileby: string;
  assign_to_staff: string;
  father_name: string;
  father_occupation: string;
  mother_name: string;
  mother_occupation: string;
  no_of_brothers: string;
  no_of_married_brother: string;
  no_of_sisters: string;
  no_of_married_sister: string;
  family_status: string;
  family_type: string;
  part_expect: string; // "Looking For (Expectations)"
  part_frm_age: string;
  part_to_age: string;
  part_height: string; // inches
  part_height_to: string; // inches
  part_mother_tongue: string | null;
  part_religion: string | null;
  part_caste: string | null;
  part_country_living: string | null;
  part_education: string | null;
  part_occupation: string | null;
  photo1: string | null;
  photo2: string | null;
  photo3: string | null; // added
  photo4: string | null; // added
  photoUrl: string;
  photo_view_status?: string; // TODO: confirm — Java mentions this for photo protection logic
  photo_view_count?: string;
  logged_in: string; // "1" = online
};

export type OtherProfileResponse = {
  status: string;
  data: OtherUserProfile;
};
