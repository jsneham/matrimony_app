// components/profile/sections/ReligionSection.tsx
import {
  EditRow,
  EditSectionHeader,
} from "@/components/profile/ProfileEditComponents";
import { LookupItem } from "@/types/metadata";
import { UserProfile } from "@/types/profile";
import React from "react";
import { Alert, View } from "react-native";

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
    currentValue?: string,
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
    className="mb-12 mx-5"
    style={{ backgroundColor: '#f9fafb', borderTopLeftRadius: 16, borderTopRightRadius: 16, borderBottomLeftRadius: 16, borderBottomRightRadius: 16 }}
  >
    <EditSectionHeader title="Faith & Astro" />

    <EditRow
      label="Religion"
      value={profile?.religion_name}
      onPress={() =>
        openModal("Religion", "religion", religions, selectedReligionId)
      }
    />

    <EditRow
      label="Caste"
      value={profile?.caste_name}
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
      isLast
      label="Manglik"
      value={profile?.manglik}
      onPress={() =>
        openModal("Manglik", "manglik", mangliks, profile?.manglik)
      }
    />
  </View>
);
