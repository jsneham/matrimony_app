// components/profile/sections/ReligionSection.tsx
import React from "react";
import { View, Alert } from "react-native";
import { LookupItem } from "@/types/metadata";
import { UserProfile } from "@/types/profile";
import { EditRow, EditSectionHeader } from "@/components/profile/ProfileEditComponents";

interface ReligionSectionProps {
  sectionId: string;
  profile?: UserProfile;
  religions: LookupItem[];
  castes: LookupItem[];
  gotras: LookupItem[];
  mangliks: LookupItem[];
  selectedReligionId: string;
  onLayout: (sectionId: string, event: any) => void;
  openModal: (
    title: string,
    field: string,
    options: LookupItem[],
    currentValue?: string
  ) => void;
}

export const ReligionSection: React.FC<ReligionSectionProps> = ({
  sectionId,
  profile,
  religions,
  castes,
  gotras,
  mangliks,
  selectedReligionId,
  onLayout,
  openModal,
}) => (
  <View
    onLayout={(e) => onLayout(sectionId, e)}
    className="bg-white mb-4"
  >
    <EditSectionHeader title="Religion & Caste" />

    <EditRow
      label="Religion"
      value={profile?.religionName}
      onPress={() =>
        openModal("Religion", "religion", religions, selectedReligionId)
      }
    />

    <EditRow
      label="Caste"
      value={profile?.casteName}
      onPress={() => {
        if (!selectedReligionId) {
          Alert.alert("Select Religion", "Please select a Religion first.");
          return;
        }
        openModal("Caste", "caste", castes, profile?.caste);
      }}
    />

    <EditRow
      label="Gotra"
      value={profile?.gothra}
      onPress={() => openModal("Gotra", "gotra", gotras, profile?.gothra)}
    />

    <EditRow
      label="Manglik"
      value={profile?.manglik}
      onPress={() => openModal("Manglik", "manglik", mangliks, profile?.manglik)}
    />
  </View>
);
