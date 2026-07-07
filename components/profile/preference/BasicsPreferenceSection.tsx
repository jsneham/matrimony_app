// components/profile/sections/BasicSection.tsx
import {
  EditRow,
  EditSectionHeader,
} from "@/components/profile/ProfileEditComponents";
import { LookupItem } from "@/types/metadata";
import { EditableFieldDescriptor, UserProfile } from "@/types/profile";
import React from "react";
import { View } from "react-native";

interface BasicsSectionProps {
  sectionId: string;
  profile?: UserProfile;
  maritalStatuses: LookupItem[];
  languages: LookupItem[];
  height: LookupItem[];
  age: LookupItem[];
  eating: LookupItem[];
  drinking: LookupItem[];
  smoking: LookupItem[];
  onLayout: (sectionId: string, event: any) => void;
  openModal: (
    title: string,
    field: string,
    options: LookupItem[],
    currentValue?: string,
    isMultiSelect?: boolean,
    editableTextFields?: EditableFieldDescriptor[],
  ) => void;
}

export const BasicsPreferenceSection: React.FC<BasicsSectionProps> = ({
  sectionId,
  profile,
  maritalStatuses,
  languages,
  height,
  age,
  eating,
  drinking,
  smoking,
  onLayout,
  openModal,
}) => {
  return (
    <View
      onLayout={(e) => onLayout(sectionId, e)}
      className="mt-12 mb-12 mx-5"
      style={{
        backgroundColor: "#f9fafb",
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
      }}
    >
      <EditSectionHeader title="Basics" />

      <EditRow
        label="Marital Status"
        value={profile?.looking_for}
        onPress={() =>
          openModal(
            "Marital Status",
            "looking_for",
            maritalStatuses,
            profile?.looking_for,
            true,
          )
        }
      />

      <EditRow
        label="Age Preference (From)"
        value={`${profile?.part_frm_age}`}
        onPress={() =>
          openModal(
            "Age Preference",
            "part_frm_age",
            age,
            profile?.part_frm_age,
          )
        }
      />

      <EditRow
        label="Age Preference (To)"
        value={`${profile?.part_to_age}`}
        onPress={() =>
          openModal("Age Preference", "part_to_age", age, profile?.part_to_age)
        }
      />

      <EditRow
        label="Height Preference (From)"
        value={`${profile?.part_height_str}`}
        onPress={() =>
          openModal(
            "Height Preference",
            "part_height",
            height,
            profile?.part_height,
          )
        }
      />

      <EditRow
        label="Height Preference (To)"
        value={`${profile?.part_height_to_str}`}
        onPress={() =>
          openModal(
            "Height Preference",
            "part_height_to",
            height,
            profile?.part_height_to,
          )
        }
      />

      <EditRow
        label="Mother Tongue"
        value={profile?.part_mother_tongue_str}
        onPress={() =>
          openModal(
            "Mother Tongue",
            "part_mother_tongue",
            languages,
            profile?.part_mother_tongue,
            true,
          )
        }
      />
    </View>
  );
};
