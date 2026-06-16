// types/metadata.ts

export type LookupItem = {
  id: string;
  val: string;
};

export type CasteItem = {
  religionId: string;
} & LookupItem;

export type StateItem = {
  countryId: string;
} & LookupItem;

export type CityItem = {
  stateId: string;
} & LookupItem;

// Unified frontend payload representing all app metadata/lookups
export type AppMetadata = {
  religions: LookupItem[];
  castes: CasteItem[];
  countries: LookupItem[];
  states: StateItem[];
  cities: CityItem[];
  educations: LookupItem[];
  occupations: LookupItem[];
  languages: LookupItem[];
  stars: LookupItem[];
  heights: LookupItem[];
  maritalStatuses: LookupItem[];
  gotras: LookupItem[];
  mangliks: LookupItem[];
  weight: LookupItem[];
  totalChildren: LookupItem[];
  statusChildren: LookupItem[];
  staffs: LookupItem[];
  smoke: LookupItem[];
  residence: LookupItem[];
  reference: LookupItem[];
  profileBy: LookupItem[];
  physicalInfo: LookupItem[];
  noOfBrothers: LookupItem[];
  noMarriSister: LookupItem[];
  noMarriBrother: LookupItem[];
  mothertongue: LookupItem[];
  moonsign: LookupItem[];
  income: LookupItem[];
  horoscope: LookupItem[];
  gender: LookupItem[];
  familyType: LookupItem[];
  familyStatus: LookupItem[];
  employeeIn: LookupItem[];
  drink: LookupItem[];
  diet: LookupItem[];
  designations: LookupItem[];
  complexion: LookupItem[];
  bodyType: LookupItem[];
  bloodGroup: LookupItem[];
  ageRang: LookupItem[];
};

// Typing for raw API response to easily map backend structures
export type RawLookupItem = {
  id?: string | number;
  name?: string;
  title?: string;
  value?: string;
  religion_id?: string | number;
  country_id?: string | number;
  state_id?: string | number;
};

export interface RawCommonListDdrResponse {
  status?: string;
  religion_list?: RawLookupItem[];
  caste_list?: RawLookupItem[];
  country_list?: RawLookupItem[];
  state_list?: RawLookupItem[];
  city_list?: RawLookupItem[];
  education_list?: RawLookupItem[];
  occupation_list?: RawLookupItem[];
  language_list?: RawLookupItem[];
  star_list?: RawLookupItem[];
  height_list?: RawLookupItem[];
  marital_status_list?: RawLookupItem[];
  gotra_list?: RawLookupItem[];
  manglik_list?: RawLookupItem[];
  weight_list?: RawLookupItem[];
  total_children?: RawLookupItem[];
  status_children?: RawLookupItem[];
  staff_list?: RawLookupItem[];
  smoke?: RawLookupItem[];
  residence?: RawLookupItem[];
  reference?: RawLookupItem[];
  profileBy?: RawLookupItem[];
  physicalInfo?: RawLookupItem[];
  noOfBrothers?: RawLookupItem[];
  noMarriSister?: RawLookupItem[];
  noMarriBrother?: RawLookupItem[];
  mothertongue?: RawLookupItem[];
  moonsign?: RawLookupItem[];
  income?: RawLookupItem[];
  horoscope?: RawLookupItem[];
  gender?: RawLookupItem[];
  familyType?: RawLookupItem[];
  familyStatus?: RawLookupItem[];
  employeeIn?: RawLookupItem[];
  drink?: RawLookupItem[];
  diet?: RawLookupItem[];
  designations?: RawLookupItem[];
  complexion?: RawLookupItem[];
  bodyType?: RawLookupItem[];
  bloodGroup?: RawLookupItem[];
  ageRang?: RawLookupItem[];
}
