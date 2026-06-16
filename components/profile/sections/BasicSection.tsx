// components/profile/sections/BasicSection.tsx
import React from "react";
import { View } from "react-native";
import { LookupItem } from "@/types/metadata";
import { UserProfile } from "@/types/profile";
import { EditRow, EditSectionHeader } from "@/components/profile/ProfileEditComponents";

interface BasicsSectionProps {
  sectionId: string;
  profile?: UserProfile;
  maritalStatuses: LookupItem[];
  languages: LookupItem[];
  onLayout: (sectionId: string, event: any) => void;
  openModal: (
    title: string,
    field: string,
    options: LookupItem[],
    currentValue?: string
  ) => void;
}

export const BasicsSection: React.FC<BasicsSectionProps> = ({
  sectionId,
  profile,
  maritalStatuses,
  languages,
  onLayout,
  openModal,
}) => (
  <View
    onLayout={(e) => onLayout(sectionId, e)}
    className="bg-white mb-4"
  >
    <EditSectionHeader title="Basics" />

    <EditRow
      label="Marital Status"
      value={profile?.maritalStatus}
      onPress={() =>
        openModal("Marital Status", "maritalStatus", maritalStatuses, profile?.maritalStatus)
      }
    />

    <EditRow
      label="Mother Tongue"
      value={profile?.mtongeName}
      onPress={() =>
        openModal("Mother Tongue", "motherTongue", languages, profile?.motherTongue)
      }
    />
  </View>
);
