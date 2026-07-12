// hooks/useProfileEditModal.ts
import { useUpdateProfile } from "@/hooks/useProfileMutations";
import { EditableFieldDescriptor } from "@/types/profile";
import { useState } from "react";
import { Alert } from "react-native";

export interface ModalConfig {
  visible: boolean;
  title: string;
  field: string;
  options?: { id: string; val: string }[];
  selectedValue?: string | string[];
  isMultiSelect?: boolean;
  editableTextFields?: EditableFieldDescriptor[];
}

const EMPTY_MODAL: ModalConfig = {
  visible: false,
  title: "",
  field: "",
  options: [],
  selectedValue: "",
  isMultiSelect: false,
  editableTextFields: [],
};

export const useProfileEditModal = ({
  memberId,
  setCountryId,
  setStateId,
  setReligionId,
}: {
  memberId: string;
  setCountryId?: (id: string | string[]) => void;
  setStateId?: (id: string | string[]) => void;
  setReligionId?: (id: string | string[]) => void;
}) => {
  const [modalConfig, setModalConfig] = useState<ModalConfig>(EMPTY_MODAL);
  const updateProfileMutation = useUpdateProfile();
  const [editableFieldsData, setEditableFieldsData] = useState<
    Record<string, string>
  >({});

  // Open a searchable selector modal
  const openModal = (
    title: string,
    field: string,
    options?: { id: string; val: string }[],
    currentValue?: string | string[],
    isMultiSelect: boolean = false,
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
        editableTextFields.forEach((descriptor) => {
          if (
            descriptor.type === "range" &&
            descriptor.fromField &&
            descriptor.toField
          ) {
            const [fromVal, toVal] = Array.isArray(currentValue)
              ? currentValue
              : ["", ""];
            if (next[descriptor.fromField] === undefined) {
              next[descriptor.fromField] = fromVal || "";
            }
            if (next[descriptor.toField] === undefined) {
              next[descriptor.toField] = toVal || "";
            }
          } else {
            const key = descriptor.field;
            if (next[key] === undefined) {
              next[key] = Array.isArray(currentValue)
                ? ""
                : (currentValue as string) || "";
            }
          }
        });
        return next;
      });
    }
  };

  // Close without selection
  const closeModal = () => {
    setModalConfig((prev) => ({ ...prev, visible: false }));
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
    if (items.length === 0) {
      Alert.alert("Please select at least one option");
      return;
    }
    saveProfile(field, items);
  };

  // Main save logic
  const saveProfile = (
    field: string,
    item: { id: string; val: string } | { id: string; val: string }[],
  ) => {
    const items = Array.isArray(item) ? item : [item];
    const itemData = items[0];
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

      case "motherTongue":
        payload.mother_tongue = itemData.id;
        break;

      case "country":
        setCountryId?.(itemData.id);
        payload.country_id = itemData.id;
        payload.state_id = "";
        payload.state_name = "";
        payload.city = "";
        payload.city_name = "";
        break;

      case "state":
        setStateId?.(itemData.id);
        payload.state_id = itemData.id;
        payload.city = "";
        payload.city_name = "";
        break;

      case "city":
        payload.city = itemData.id;
        break;

      case "religion":
        setReligionId?.(itemData.id);
        payload.religion = itemData.id;
        payload.caste = "";
        payload.caste_name = "";
        break;

      case "caste":
        payload.caste = itemData.id;
        break;

      case "education":
        payload.education_detail = itemData.id;
        break;

      case "occupation":
        payload.occupation = itemData.id;
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

      case "workSector":
        payload.employee_in = itemData.id;
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
        payload.no_of_married_brother = itemData.id;
        break;
      case "noOfSisters":
        payload.no_of_sisters = itemData.id;
        break;
      case "noOfMarriedSisters":
        payload.no_of_married_sister = itemData.id;
        break;
      case "totalChildren":
        payload.total_children = itemData.id;
        break;
      case "statusChildren":
        payload.status_children = itemData.id;
        break;
      case "profileby":
        payload.profileby = itemData.id;
        break;
      case "reference":
        payload.reference = itemData.id;
        break;

      case "spokenLanguages":
        payload.languages_known = items.map((i) => i.id).join(",");
        break;

      case "looking_for":
        payload.looking_for = items.map((i) => i.id).join(",");
        break;

      case "part_diet":
        payload.part_diet = items.map((i) => i.id).join(",");
        break;

      case "part_smoke":
        payload.part_smoke = items.map((i) => i.id).join(",");
        break;

      case "part_drink":
        payload.part_drink = items.map((i) => i.id).join(",");
        break;

      case "part_mother_tongue":
        payload.part_mother_tongue = items.map((i) => i.id).join(",");
        break;

      case "part_country_living":
        setCountryId?.(items.map((i) => i.id));
        payload.part_country_living = items.map((i) => i.id).join(",");
        break;

      case "part_state":
        setStateId?.(items.map((i) => i.id));
        payload.part_state = items.map((i) => i.id).join(",");
        break;

      case "part_city":
        payload.part_city = items.map((i) => i.id).join(",");
        break;

      case "part_religion":
        setReligionId?.(items.map((i) => i.id));
        payload.part_religion = items.map((i) => i.id).join(",");
        break;

      case "part_caste":
        payload.part_caste = items.map((i) => i.id).join(",");
        break;

      case "part_manglik":
        payload.part_manglik = itemData.id;
        break;

      case "part_income":
        payload.part_income = itemData.id;
        break;

      case "part_occupation":
        payload.part_occupation = items.map((i) => i.id).join(",");
        break;

      case "part_employee_in":
        payload.part_employee_in = items.map((i) => i.id).join(",");
        break;

      case "part_education":
        payload.part_education = items.map((i) => i.id).join(",");
        break;

      default:
        console.warn(`Unknown field: ${field}`);
        return;
    }

    updateProfileMutation.mutate(payload, {
      onSuccess: () => {
        closeModal();
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

  // 👇 Now takes the fields data explicitly, instead of reading from hook state.
  // This lets the modal pass its own local draft, so Cancel never touches saved data.
  const handleEditTextSave = (fieldsData: Record<string, string>) => {
    if (!modalConfig.field) return;

    const payload: Record<string, string> = {};
    payload.member_id = memberId;

    switch (modalConfig.field) {
      case "fullName":
        payload.firstname = fieldsData.firstname || "";
        payload.lastname = fieldsData.lastname || "";
        break;

      case "address":
        payload.address = fieldsData.address || "";
        break;

      case "subcaste":
        payload.subcaste = fieldsData.subcaste || "";
        break;

      case "birthtime":
        payload.birthtime = fieldsData.birthtime || "";
        break;

      case "birthplace":
        payload.birthplace = fieldsData.birthplace || "";
        break;

      case "profession":
        payload.professional_additional_info =
          fieldsData.professional_additional_info || "";
        break;

      case "organisationName":
        payload.organisationName = fieldsData.organisationName || "";
        break;

      case "fatherName":
        payload.father_name = fieldsData.fatherName || "";
        break;

      case "fatherOccupation":
        payload.father_occupation = fieldsData.fatherOccupation || "";
        break;

      case "motherName":
        payload.mother_name = fieldsData.motherName || "";
        break;
      case "motherOccupation":
        payload.mother_occupation = fieldsData.motherOccupation || "";
        break;
      case "familyDetails":
        payload.family_details = fieldsData.familyDetails || "";
        break;
      case "gotra":
        payload.gothra = fieldsData.gotra || "";
        break;

      case "part_age_range":
        payload.part_frm_age = fieldsData.part_frm_age || "";
        payload.part_to_age = fieldsData.part_to_age || "";
        break;

      case "part_height_range":
        payload.part_height = fieldsData.part_height || "";
        payload.part_height_to = fieldsData.part_height_to || "";
        break;

      default:
        console.warn(`Unknown field: ${modalConfig.field}`);
        return;
    }

    updateProfileMutation.mutate(payload, {
      onSuccess: () => {
        setEditableFieldsData(fieldsData); // commit locally only after a successful save
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
  };
};
