// components/profile/sections/BasicSection.tsx
import {
  EditRow,
  EditSectionHeader,
} from "@/components/profile/ProfileEditComponents";
import { LookupItem } from "@/types/metadata";
import { EditableFieldDescriptor, UserProfile } from "@/types/profile";
import React from "react";
import { View } from "react-native";
import { NonEditableText } from "../sections/NonEditableText";

interface BasicsSectionProps {
  sectionId: string;
  profile?: UserProfile;
  maritalStatuses: LookupItem[];
  languages: LookupItem[];
  height: LookupItem[];
  age: LookupItem[];

  onLayout: (sectionId: string, event: any) => void;
  openModal: (
    title: string,
    field: string,
    options: LookupItem[],
    currentValue?: string | string[],
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
  onLayout,
  openModal,
}) => {
  return (
    <View
      onLayout={(e) => onLayout(sectionId, e)}
      className="mt-14 mx-5"
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
        isFirst
        label="Marital Status"
        value={profile?.looking_for}
        onPress={() =>
          openModal(
            "Marital Status",
            "looking_for",
            maritalStatuses,
            profile?.looking_for?.split(",").filter(Boolean) ?? [],
            true,
          )
        }
      />

      <NonEditableText
        label="Age Preference"
        value={
          profile?.part_frm_age && profile?.part_to_age
            ? `${age.find((a) => a.id === profile.part_frm_age)?.val ?? ""} - ${age.find((a) => a.id === profile.part_to_age)?.val ?? ""}`
            : undefined
        }
        onPress={() =>
          openModal(
            "Age Preference",
            "part_age_range",
            [],
            [profile?.part_frm_age ?? "", profile?.part_to_age ?? ""], // currentValue — [fromId, toId]
            false,
            [
              {
                field: "part_age_range", // unused directly, but required by the type
                label: "Age Preference",
                type: "range",
                options: age,
                fromField: "part_frm_age",
                toField: "part_to_age",
              },
            ],
          )
        }
      />

      <NonEditableText
        label="Height Preference"
        value={
          profile?.part_height && profile?.part_height_to
            ? `${height.find((h) => h.id === profile.part_height)?.val ?? ""} - ${height.find((h) => h.id === profile.part_height_to)?.val ?? ""}`
            : undefined
        }
        onPress={() =>
          openModal(
            "Height Preference",
            "part_height_range",
            [],
            [profile?.part_height ?? "", profile?.part_height_to ?? ""],
            false,
            [
              {
                field: "part_height_range",
                label: "Height Preference",
                type: "range",
                options: height,
                fromField: "part_height",
                toField: "part_height_to",
              },
            ],
          )
        }
      />

      <EditRow
        isLast
        label="Mother Tongue"
        value={profile?.part_mother_tongue_str}
        onPress={() =>
          openModal(
            "Mother Tongue",
            "part_mother_tongue",
            languages,
            profile?.part_mother_tongue?.split(",").filter(Boolean) ?? [],
            true,
          )
        }
      />
    </View>
  );
};
