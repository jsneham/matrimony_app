// hooks/useProfileEditModal.ts
import { useMetadataStore } from "@/hooks/useMetadataStore";
import { useUpdateProfile } from "@/hooks/useProfileMutations";
import { EditableFieldDescriptor } from "@/types/profile";
import { useState } from "react";
import { Alert } from "react-native";

export interface ModalConfig {
  visible: boolean;
  title: string;
  field: string;
  options?: { id: string; val: string }[];
  selectedValue?: string | string[]; // Support single or multi-select
  isMultiSelect?: boolean; // Toggle between single and multi-select
  editableTextFields?: EditableFieldDescriptor[];
  editableFieldsData?: Array<{
    key: string;
    label: string;
    value: string;
    placeholder: string;
  }>;
}

const EMPTY_MODAL: ModalConfig = {
  visible: false,
  title: "",
  field: "",
  options: [],
  selectedValue: "",
  isMultiSelect: false,
  editableTextFields: [],
  editableFieldsData: [],
};

export const useProfileEditModal = ({ memberId }: { memberId: string }) => {
  const [modalConfig, setModalConfig] = useState<ModalConfig>(EMPTY_MODAL);
  const updateProfileMutation = useUpdateProfile();
  const { setCountryId, setStateId, setReligionId } = useMetadataStore();
  const [editableFieldsData, setEditableFieldsData] = useState<
    Record<string, string>
  >({});

  // Open a searchable selector modal
  const openModal = (
    title: string,
    field: string,
    options?: { id: string; val: string }[],
    currentValue?: string | string[],
    isMultiSelect: boolean = false, // Default to single-select
    editableTextFields?: EditableFieldDescriptor[],
  ) => {
    setModalConfig({
      visible: true,
      title,
      field,
      options,
      selectedValue: currentValue,
      isMultiSelect,
      editableTextFields,
    });

    if (editableTextFields?.length) {
      setEditableFieldsData((prev) => {
        const next = { ...prev };
        editableTextFields.forEach(({ field: key }) => {
          if (next[key] === undefined) {
            next[key] = Array.isArray(currentValue)
              ? ""
              : (currentValue as string) || "";
          }
        });
        return next;
      });
    }
  };

  // Close without selection
  const closeModal = () => {
    setModalConfig((prev) => ({ ...prev, visible: false }));
    setEditableFieldsData({});
  };

  const onEditableFieldChange = (key: string, text: string) => {
    setEditableFieldsData((prev) => ({ ...prev, [key]: text }));
  };

  // Handle single option selection (for single-select modals)
  const handleSelect = (field: string, item: { id: string; val: string }) => {
    saveProfile(field, item);
  };

  // Handle multiple option selection (for multi-select modals)
  const handleMultiSelect = (
    field: string,
    items: { id: string; val: string }[],
  ) => {
    // For multi-select, we typically save all selected items together
    // This varies by field - customize as needed
    if (items.length === 0) {
      Alert.alert("Please select at least one option");
      return;
    }

    saveProfile(field, items[0]); // Or handle differently based on field
  };

  // Main save logic
  const saveProfile = (
    field: string,
    item: { id: string; val: string } | { id: string; val: string }[],
  ) => {
    // Handle array or single item
    const itemData = Array.isArray(item) ? item[0] : item;

    const payload: Record<string, string> = {};
    payload.member_id = memberId;

    switch (field) {
      case "maritalStatus":
        payload.marital_status = itemData.id;
        break;

      case "height":
        payload.height = itemData.id;
        payload.height_str = itemData.val;
        break;

      // case "age":
      //   payload.age = itemData.id;
      //   break;

      case "motherTongue":
        payload.mother_tongue = itemData.id;
        // payload.mtongeName = itemData.val;
        break;

      case "country":
        setCountryId(itemData.id); // cascades: resets state + city in Zustand
        payload.country_id = itemData.id;
        // payload.countryName = itemData.val;
        // payload.stateId = "";
        // payload.stateName = "";
        // payload.cityId = "";
        // payload.cityName = "";
        break;

      case "state":
        setStateId(itemData.id); // cascades: resets city in Zustand
        payload.state_id = itemData.id;
        // payload.stateName = itemData.val;
        // payload.cityId = "";
        // payload.cityName = "";
        break;

      case "city":
        payload.city = itemData.id;
        // payload.cityName = itemData.val;
        break;

      case "religion":
        setReligionId(itemData.id); // cascades: resets caste in Zustand
        payload.religion = itemData.id;
        // payload.religionName = itemData.val;
        // payload.caste = "";
        // payload.casteName = "";
        break;

      case "caste":
        payload.caste = itemData.id;
        payload.casteName = itemData.val;
        break;

      case "education":
        payload.education_detail = itemData.id;
        // payload.educationName = itemData.val;
        break;

      case "occupation":
        payload.occupation = itemData.id;
        // payload.occupationName = itemData.val;
        break;

      case "gotra":
        payload.gothra = itemData.id;
        break;

      case "manglik":
        payload.manglik = itemData.id;
        break;

      case "income":
        payload.income = itemData.id;
        break;

      case "health":
        payload.physical_info = itemData.id;
        break;

      case "bloodGroup":
        payload.blood_group = itemData.id;
        break;

      case "skinTone":
        payload.complexion = itemData.id;
        break;

      case "drinking":
        payload.drink = itemData.id;
        break;

      case "smoking":
        payload.smoke = itemData.id;
        break;

      case "eating":
        payload.diet = itemData.id;
        break;

      case "body_type":
        payload.bodytype = itemData.id;
        break;

      case "weight":
        payload.weight = itemData.id;
        break;

      case "horoscope":
        payload.horoscope = itemData.id;
        break;

      case "moonsign":
        payload.moonsign = itemData.id;
        break;

      case "education":
        payload.education_detail = itemData.id;
        break;

      case "workSector":
        payload.employee_in = itemData.id;
        break;

      case "income":
        payload.income = itemData.id;
        break;
      case "occupation":
        payload.occupation = itemData.id;
        break;
      case "designation":
        payload.designation = itemData.id;
        break;

      case "familyType":
        payload.family_type = itemData.id;
        break;
      case "familyStatus":
        payload.family_status = itemData.id;
        break;
      case "noOfBrothers":
        payload.no_of_brothers = itemData.id;
        break;
      case "noOfMarriedBrothers":
        payload.no_of_married_brothers = itemData.id;
        break;
      case "noOfSisters":
        payload.no_of_sisters = itemData.id;
        break;
      case "noOfMarriedSisters":
        payload.no_of_married_sisters = itemData.id;
        break;

      default:
        console.warn(`Unknown field: ${field}`);
        return;
    }

    updateProfileMutation.mutate(payload, {
      onSuccess: (response) => {
        closeModal();
        // Alert.alert("Success", "Profile updated successfully!");
      },
      onError: (err: any) => {
        console.error("❌ Error updating profile:", err);
        const errorMessage =
          err?.response?.data?.message ||
          err?.message ||
          "Something went wrong while saving.";
        Alert.alert("Update Failed", errorMessage);
      },
    });
  };

  const handleEditTextSave = () => {
    console.log("handleEditTextSave");
    if (!modalConfig.field) return;

    const payload: Record<string, string> = {};
    payload.member_id = memberId;

    switch (modalConfig.field) {
      case "fullName":
        payload.firstname = editableFieldsData.firstname || "";
        payload.lastname = editableFieldsData.lastname || "";
        break;

      case "address":
        payload.address = editableFieldsData.address || "";
        break;

      case "subcaste":
        payload.subcaste = editableFieldsData.subcaste || "";
        break;

      case "birthtime":
        payload.birthtime = editableFieldsData.birthtime || "";
        break;

      case "birthplace":
        payload.birthplace = editableFieldsData.birthplace || "";
        break;

      case "profession":
        payload.professional_additional_info =
          editableFieldsData.professional_additional_info || "";
        break;

      case "organisationName":
        payload.organisationName = editableFieldsData.organisationName || "";
        break;

      case "fatherName":
        payload.father_name = editableFieldsData.father_name || "";
        break;

      case "fatherOccupation":
        payload.father_occupation = editableFieldsData.father_occupation || "";
        break;

      case "motherName":
        payload.mother_name = editableFieldsData.mother_name || "";
        break;
      case "motherOccupation":
        payload.mother_occupation = editableFieldsData.mother_occupation || "";
        break;
      case "familyDetails":
        payload.family_details = editableFieldsData.family_details || "";
        break;

      // Add more cases as needed
      default:
        console.warn(`Unknown field: ${modalConfig.field}`);
        return;
    }

    updateProfileMutation.mutate(payload, {
      onSuccess: (response) => {
        console.log("✅ Editable fields saved successfully:", response);
        closeModal();
      },
      onError: (err: any) => {
        console.error("❌ Error saving editable fields:", err);
        const errorMessage =
          err?.response?.data?.message ||
          err?.message ||
          "Something went wrong while saving.";
        Alert.alert("Update Failed", errorMessage);
      },
    });
  };

  return {
    modalConfig,
    openModal,
    closeModal,
    handleSelect,
    handleMultiSelect,
    isSaving: updateProfileMutation.isPending,
    handleEditTextSave,
    editableFieldsData,
    onEditableFieldChange,
  };
};
