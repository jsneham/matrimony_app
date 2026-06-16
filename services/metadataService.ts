// services/metadataService.ts
import {
    AppMetadata,
    CasteItem,
    CityItem,
    LookupItem,
    StateItem,
} from "@/types/metadata";
import { api } from "./api";

// Defensive helper to map a raw lookup item to a standardized LookupItem
const mapRawItem = (item: any): LookupItem => {
  if (!item) return { id: "", val: "" };
  const id =
    item.id !== undefined && item.id !== null
      ? String(item.id)
      : item.value !== undefined
        ? String(item.value)
        : "";
  const val =
    item.val !== undefined && item.val !== null
      ? String(item.val)
      : item.title !== undefined
        ? String(item.title)
        : id;
  return { id, val };
};

// Map caste items including their parent religion relationship
const mapCasteItem = (item: any): CasteItem => ({
  ...mapRawItem(item),
  religionId:
    item.religion_id !== undefined && item.religion_id !== null
      ? String(item.religion_id)
      : "",
});

// Map state items including their parent country relationship
const mapStateItem = (item: any): StateItem => ({
  ...mapRawItem(item),
  countryId:
    item.country_id !== undefined && item.country_id !== null
      ? String(item.country_id)
      : "",
});

// Map city items including their parent state relationship
const mapCityItem = (item: any): CityItem => ({
  ...mapRawItem(item),
  stateId:
    item.state_id !== undefined && item.state_id !== null
      ? String(item.state_id)
      : "",
});

export const metadataService = {
  // Fetches all common static/dropdown options in a single API call
  getAppMetadata: async (): Promise<AppMetadata> => {
    console.log(
      "🔄 Fetching common lookup data from API: common_request/get_common_list_ddr...",
    );

    try {
      // Using POST to match current app pattern and automatically inject common interceptor parameters
      const response = await api.post("common_request/get_common_list_ddr");
      const payload = response.data || {};

      // Standardize raw data source in case of nested "data" envelope
      const src = payload.data || payload;
      console.log("src", src);

      // Map and return standard client-side AppMetadata structure
      return {
        religions: Array.isArray(src.religion_list)
          ? src.religion_list.map(mapRawItem)
          : [],
        castes: Array.isArray(src.caste_list)
          ? src.caste_list.map(mapCasteItem)
          : [],
        countries: Array.isArray(src.country_list)
          ? src.country_list.map(mapRawItem)
          : [],
        states: Array.isArray(src.state_list)
          ? src.state_list.map(mapStateItem)
          : [],
        cities: Array.isArray(src.city_list)
          ? src.city_list.map(mapCityItem)
          : [],
        educations: Array.isArray(src.education_list)
          ? src.education_list.map(mapRawItem)
          : [],
        occupations: Array.isArray(src.occupation_list)
          ? src.occupation_list.map(mapRawItem)
          : [],
        languages: Array.isArray(src.language_list)
          ? src.language_list.map(mapRawItem)
          : [],
        stars: Array.isArray(src.star_list)
          ? src.star_list.map(mapRawItem)
          : [],
        heights: Array.isArray(src.height_list)
          ? src.height_list.map(mapRawItem)
          : [],
        maritalStatuses: Array.isArray(src.marital_status)
          ? src.marital_status.map(mapRawItem)
          : [],
        gotras: Array.isArray(src.gotra_list)
          ? src.gotra_list.map(mapRawItem)
          : [],
        mangliks: Array.isArray(src.manglik_list)
          ? src.manglik_list.map(mapRawItem)
          : [],
        weight: Array.isArray(src.weight_list)
          ? src.weight_list.map(mapRawItem)
          : [],
        totalChildren: Array.isArray(src.total_children)
          ? src.total_children.map(mapRawItem)
          : [],
        statusChildren: Array.isArray(src.status_children)
          ? src.status_children.map(mapRawItem)
          : [],
        staffs: Array.isArray(src.staff_list)
          ? src.staff_list.map(mapRawItem)
          : [],
        smoke: Array.isArray(src.smoke) ? src.smoke.map(mapRawItem) : [],
        residence: Array.isArray(src.residence)
          ? src.residence.map(mapRawItem)
          : [],
        reference: Array.isArray(src.reference)
          ? src.reference.map(mapRawItem)
          : [],
        profileBy: Array.isArray(src.profileby)
          ? src.profileby.map(mapRawItem)
          : [],
        physicalInfo: Array.isArray(src.physical_info)
          ? src.physical_info.map(mapRawItem)
          : [],
        noOfBrothers: Array.isArray(src.no_of_brothers)
          ? src.no_of_brothers.map(mapRawItem)
          : [],
        noMarriSister: Array.isArray(src.no_marri_sister)
          ? src.no_marri_sister.map(mapRawItem)
          : [],
        noMarriBrother: Array.isArray(src.no_marri_brother)
          ? src.no_marri_brother.map(mapRawItem)
          : [],
        mothertongue: Array.isArray(src.mothertongue_list)
          ? src.mothertongue_list.map(mapRawItem)
          : [],
        moonsign: Array.isArray(src.moonsign_list)
          ? src.moonsign_list.map(mapRawItem)
          : [],
        income: Array.isArray(src.income) ? src.income.map(mapRawItem) : [],
        horoscope: Array.isArray(src.horoscope)
          ? src.horoscope.map(mapRawItem)
          : [],
        gender: Array.isArray(src.gender) ? src.gender.map(mapRawItem) : [],
        familyType: Array.isArray(src.family_type)
          ? src.family_type.map(mapRawItem)
          : [],
        familyStatus: Array.isArray(src.family_status)
          ? src.family_status.map(mapRawItem)
          : [],
        employeeIn: Array.isArray(src.employee_in)
          ? src.employee_in.map(mapRawItem)
          : [],
        drink: Array.isArray(src.drink) ? src.drink.map(mapRawItem) : [],
        diet: Array.isArray(src.diet) ? src.diet.map(mapRawItem) : [],
        designations: Array.isArray(src.designation_list)
          ? src.designation_list.map(mapRawItem)
          : [],
        complexion: Array.isArray(src.complexion)
          ? src.complexion.map(mapRawItem)
          : [],
        bodyType: Array.isArray(src.bodytype)
          ? src.bodytype.map(mapRawItem)
          : [],
        bloodGroup: Array.isArray(src.blood_group)
          ? src.blood_group.map(mapRawItem)
          : [],
        ageRang: Array.isArray(src.age_rang)
          ? src.age_rang.map(mapRawItem)
          : [],
      };
    } catch (error) {
      console.error("❌ Failed to fetch app metadata:", error);
      // Return empty fallback lists to prevent screen crashes
      return {
        religions: [],
        castes: [],
        countries: [],
        states: [],
        cities: [],
        educations: [],
        occupations: [],
        languages: [],
        stars: [],
        heights: [],
        maritalStatuses: [],
        gotras: [],
        mangliks: [],
        weight: [],
        totalChildren: [],
        statusChildren: [],
        staffs: [],
        smoke: [],
        residence: [],
        reference: [],
        profileBy: [],
        physicalInfo: [],
        noOfBrothers: [],
        noMarriSister: [],
        noMarriBrother: [],
        mothertongue: [],
        moonsign: [],
        income: [],
        horoscope: [],
        gender: [],
        familyType: [],
        familyStatus: [],
        employeeIn: [],
        drink: [],
        diet: [],
        designations: [],
        complexion: [],
        bodyType: [],
        bloodGroup: [],
        ageRang: [],
      };
    }
  },
};
