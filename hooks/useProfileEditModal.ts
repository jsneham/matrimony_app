// hooks/useProfileEditModal.ts
import { useMetadataStore } from "@/hooks/useMetadataStore";
import { useUpdateProfile } from "@/hooks/useProfileMutations";
import { useState } from "react";
import { Alert } from "react-native";

export interface ModalConfig {
  visible: boolean;
  title: string;
  field: string;
  options: { id: string; val: string }[];
  selectedValue?: string;
}

const EMPTY_MODAL: ModalConfig = {
  visible: false,
  title: "",
  field: "",
  options: [],
  selectedValue: "",
};

export const useProfileEditModal = () => {
  const [modalConfig, setModalConfig] = useState<ModalConfig>(EMPTY_MODAL);
  const updateProfileMutation = useUpdateProfile();
  const { setCountryId, setStateId, setReligionId } = useMetadataStore();

  // Open a searchable selector modal
  const openModal = (
    title: string,
    field: string,
    options: { id: string; val: string }[],
    currentValue?: string,
  ) => {
    setModalConfig({
      visible: true,
      title,
      field,
      options,
      selectedValue: currentValue,
    });
  };

  // Close without selection
  const closeModal = () => {
    setModalConfig((prev) => ({ ...prev, visible: false }));
  };

  // Map the selected item to an API payload and save
  const handleSelect = (field: string, item: { id: string; val: string }) => {
    const payload: Record<string, string> = {};
    console.log("field", field);

    switch (field) {
      case "maritalStatus":
        payload.maritalStatus = item.val;
        break;
      case "motherTongue":
        payload.motherTongue = item.id;
        payload.mtongeName = item.val;
        break;
      case "country":
        setCountryId(item.id); // cascades: resets state + city in Zustand
        payload.countryId = item.id;
        payload.countryName = item.val;
        payload.stateId = "";
        payload.stateName = "";
        payload.cityId = "";
        payload.cityName = "";
        break;
      case "state":
        setStateId(item.id); // cascades: resets city in Zustand
        payload.stateId = item.id;
        payload.stateName = item.val;
        payload.cityId = "";
        payload.cityName = "";
        break;
      case "city":
        payload.cityId = item.id;
        payload.cityName = item.val;
        break;
      case "religion":
        setReligionId(item.id); // cascades: resets caste in Zustand
        payload.religion = item.val;
        payload.religionName = item.val;
        payload.caste = "";
        payload.casteName = "";
        break;
      case "caste":
        payload.caste = item.id;
        payload.casteName = item.val;
        break;
      case "education":
        payload.educationDetail = item.id;
        payload.educationName = item.val;
        break;
      case "occupation":
        payload.occupation = item.id;
        payload.occupationName = item.val;
        break;
      case "gotra":
        payload.gothra = item.val;
        break;
      case "manglik":
        payload.manglik = item.val;
        break;
      case "income":
        payload.income = item.val;
        break;
      default:
        return;
    }

    updateProfileMutation.mutate(payload, {
      onError: (err) => {
        Alert.alert("Update Failed", "Something went wrong while saving.");
        console.error(err);
      },
    });
  };

  return {
    modalConfig,
    openModal,
    closeModal,
    handleSelect,
    isSaving: updateProfileMutation.isPending,
  };
};
