// components/profile/sections/BasicSection.tsx
import {
  EditRow,
  EditSectionHeader,
} from "@/components/profile/ProfileEditComponents";
import { LookupItem } from "@/types/metadata";
import { UserProfile } from "@/types/profile";
import React from "react";
import { View } from "react-native";

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
    currentValue?: string,
    isMultiSelect?: boolean,
  ) => void;
}

export const BasicsSection: React.FC<BasicsSectionProps> = ({
  sectionId,
  profile,
  maritalStatuses,
  languages,
  height,
  age,
  onLayout,
  openModal,
}) => (
  <View
    onLayout={(e) => onLayout(sectionId, e)}
    className="bg-white mb-4  mx-5"
  >
    <EditSectionHeader title="Basics" />

    <EditRow
      editable={false}
      label="Marital Status"
      value={profile?.marital_status}
      onPress={() =>
        openModal(
          "Marital Status",
          "maritalStatus",
          maritalStatuses,
          profile?.marital_status,
        )
      }
    />

    <EditRow
      editable={false}
      label="Height"
      value={profile?.height_str}
      onPress={() => openModal("Height", "height", height, profile?.height_str)}
    />

    <EditRow
      editable={false}
      label="Age"
      value={profile?.age}
      onPress={() => openModal("Age", "age", age, profile?.age)}
    />

    <EditRow
      label="Mother Tongue"
      value={profile?.mtongue_name}
      onPress={() =>
        openModal(
          "Mother Tongue",
          "motherTongue",
          languages,
          profile?.mtongue_name,
        )
      }
    />

    {/* <EditRow
      label="Height Preference"
      value={profile?.mtongue_name}
      onPress={() =>
        openModal(
          "Height Preference",
          "motherTongue",
          languages,
          profile?.mtongue_name,
        )
      }
    /> */}
  </View>
);
