import { create } from "zustand";

interface MetadataStoreState {
  // Selected IDs
  selectedCountryId: string;
  selectedStateId: string;
  selectedCityId: string;
  selectedReligionId: string;
  selectedCasteId: string;

  // Actions
  setCountryId: (id: string) => void;
  setStateId: (id: string) => void;
  setCityId: (id: string) => void;
  setReligionId: (id: string) => void;
  setCasteId: (id: string) => void;
  setInitialValues: (countryId: string, stateId: string, religionId: string) => void;

  // Reset helpers
  resetLocation: () => void;
  resetFaith: () => void;
  resetAll: () => void;
}

export const useMetadataStore = create<MetadataStoreState>((set) => ({
  // Initial states
  selectedCountryId: "",
  selectedStateId: "",
  selectedCityId: "",
  selectedReligionId: "",
  selectedCasteId: "",

  // Actions with automatic cascading resets
  setCountryId: (id: string) =>
    set({
      selectedCountryId: id,
      selectedStateId: "", // Cascading reset: changing Country clears selected State
      selectedCityId: "",  // Cascading reset: changing Country clears selected City
    }),

  setStateId: (id: string) =>
    set({
      selectedStateId: id,
      selectedCityId: "",  // Cascading reset: changing State clears selected City
    }),

  setCityId: (id: string) =>
    set({
      selectedCityId: id,
    }),

  setReligionId: (id: string) =>
    set({
      selectedReligionId: id,
      selectedCasteId: "", // Cascading reset: changing Religion clears selected Caste
    }),

  setCasteId: (id: string) =>
    set({
      selectedCasteId: id,
    }),

  // Set values on load without clearing dependent items
  setInitialValues: (countryId: string, stateId: string, religionId: string) =>
    set({
      selectedCountryId: countryId,
      selectedStateId: stateId,
      selectedReligionId: religionId,
    }),

  resetLocation: () =>
    set({
      selectedCountryId: "",
      selectedStateId: "",
      selectedCityId: "",
    }),

  resetFaith: () =>
    set({
      selectedReligionId: "",
      selectedCasteId: "",
    }),

  resetAll: () =>
    set({
      selectedCountryId: "",
      selectedStateId: "",
      selectedCityId: "",
      selectedReligionId: "",
      selectedCasteId: "",
    }),
}));
