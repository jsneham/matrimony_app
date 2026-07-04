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
            profile?.marital_status,
            true,
          )
        }
      />

      <EditRow
        label="Age Preference"
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
        label="Height Preference"
        value={`${profile?.part_height}`}
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
        label="Eating habit"
        value={profile?.part_diet}
        onPress={() =>
          openModal("Eating habit", "eating", eating, profile?.part_diet)
        }
      />
      <EditRow
        label="Smoking"
        value={profile?.part_smoke}
        onPress={() =>
          openModal("Smoking", "smoking", smoking, profile?.part_smoke)
        }
      />
      <EditRow
        label="Drinking"
        value={profile?.part_drink}
        onPress={() =>
          openModal("Drinking", "drinking", drinking, profile?.part_drink)
        }
      />

      <EditRow
        label="Mother Tongue"
        value={profile?.part_mother_tongue_str}
        onPress={() =>
          openModal(
            "Mother Tongue",
            "motherTongue",
            languages,
            profile?.part_mother_tongue,
          )
        }
      />
    </View>
  );
};
