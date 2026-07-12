// hooks/useMetadataStore.ts
import { create, StoreApi, UseBoundStore } from "zustand";

interface MetadataStoreState {
  selectedCountryIds: string[];
  selectedStateIds: string[];
  selectedCityIds: string[];
  selectedReligionIds: string[];
  selectedCasteIds: string[];

  // Setters accept either a single id (single-select screens) or an array (multi-select screens)
  setCountryId: (id: string | string[]) => void;
  setStateId: (id: string | string[]) => void;
  setCityId: (id: string | string[]) => void;
  setReligionId: (id: string | string[]) => void;
  setCasteId: (id: string | string[]) => void;

  setInitialValues: (
    countryId: string | string[],
    stateId: string | string[],
    religionId: string | string[],
  ) => void;

  resetLocation: () => void;
  resetFaith: () => void;
  resetAll: () => void;
}

export type MetadataStoreHook = UseBoundStore<StoreApi<MetadataStoreState>>;

const toArray = (val: string | string[]): string[] =>
  Array.isArray(val) ? val.filter(Boolean) : val ? [val] : [];

// Factory — each call produces a fully independent store instance
const createMetadataStore = (): MetadataStoreHook =>
  create<MetadataStoreState>((set) => ({
    selectedCountryIds: [],
    selectedStateIds: [],
    selectedCityIds: [],
    selectedReligionIds: [],
    selectedCasteIds: [],

    setCountryId: (id) =>
      set({
        selectedCountryIds: toArray(id),
        selectedStateIds: [], // cascading reset: changing Country clears State
        selectedCityIds: [], // cascading reset: changing Country clears City
      }),

    setStateId: (id) =>
      set({
        selectedStateIds: toArray(id),
        selectedCityIds: [], // cascading reset: changing State clears City
      }),

    setCityId: (id) =>
      set({
        selectedCityIds: toArray(id),
      }),

    setReligionId: (id) =>
      set({
        selectedReligionIds: toArray(id),
        selectedCasteIds: [], // cascading reset: changing Religion clears Caste
      }),

    setCasteId: (id) =>
      set({
        selectedCasteIds: toArray(id),
      }),

    // Set values on load without clearing dependent items
    setInitialValues: (countryId, stateId, religionId) =>
      set({
        selectedCountryIds: toArray(countryId),
        selectedStateIds: toArray(stateId),
        selectedReligionIds: toArray(religionId),
      }),

    resetLocation: () =>
      set({
        selectedCountryIds: [],
        selectedStateIds: [],
        selectedCityIds: [],
      }),

    resetFaith: () =>
      set({
        selectedReligionIds: [],
        selectedCasteIds: [],
      }),

    resetAll: () =>
      set({
        selectedCountryIds: [],
        selectedStateIds: [],
        selectedCityIds: [],
        selectedReligionIds: [],
        selectedCasteIds: [],
      }),
  }));

// Two fully independent stores — one per screen's own selection state
export const useProfileMetadataStore = createMetadataStore();
export const usePreferenceMetadataStore = createMetadataStore();
