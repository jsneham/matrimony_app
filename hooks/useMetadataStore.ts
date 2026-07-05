// hooks/useMetadataStore.ts
import { create, StoreApi, UseBoundStore } from "zustand";

interface MetadataStoreState {
  selectedCountryId: string;
  selectedStateId: string;
  selectedCityId: string;
  selectedReligionId: string;
  selectedCasteId: string;

  setCountryId: (id: string) => void;
  setStateId: (id: string) => void;
  setCityId: (id: string) => void;
  setReligionId: (id: string) => void;
  setCasteId: (id: string) => void;
  setInitialValues: (
    countryId: string,
    stateId: string,
    religionId: string,
  ) => void;

  resetLocation: () => void;
  resetFaith: () => void;
  resetAll: () => void;
}

export type MetadataStoreHook = UseBoundStore<StoreApi<MetadataStoreState>>;

// Factory — each call produces a fully independent store instance
const createMetadataStore = (): MetadataStoreHook =>
  create<MetadataStoreState>((set) => ({
    selectedCountryId: "",
    selectedStateId: "",
    selectedCityId: "",
    selectedReligionId: "",
    selectedCasteId: "",

    setCountryId: (id: string) =>
      set({
        selectedCountryId: id,
        selectedStateId: "",
        selectedCityId: "",
      }),

    setStateId: (id: string) =>
      set({
        selectedStateId: id,
        selectedCityId: "",
      }),

    setCityId: (id: string) =>
      set({
        selectedCityId: id,
      }),

    setReligionId: (id: string) =>
      set({
        selectedReligionId: id,
        selectedCasteId: "",
      }),

    setCasteId: (id: string) =>
      set({
        selectedCasteId: id,
      }),

    setInitialValues: (
      countryId: string,
      stateId: string,
      religionId: string,
    ) =>
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

// Two fully independent stores — one per screen's own selection state
export const useProfileMetadataStore = createMetadataStore();
export const usePreferenceMetadataStore = createMetadataStore();
