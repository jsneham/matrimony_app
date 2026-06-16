// components/profile/sections/LocationSection.tsx
import React from "react";
import { View, Alert } from "react-native";
import { LookupItem } from "@/types/metadata";
import { UserProfile } from "@/types/profile";
import { EditRow, EditSectionHeader } from "@/components/profile/ProfileEditComponents";

interface LocationSectionProps {
  sectionId: string;
  profile?: UserProfile;
  countries: LookupItem[];
  states: LookupItem[];
  cities: LookupItem[];
  selectedCountryId: string;
  selectedStateId: string;
  onLayout: (sectionId: string, event: any) => void;
  openModal: (
    title: string,
    field: string,
    options: LookupItem[],
    currentValue?: string
  ) => void;
}

export const LocationSection: React.FC<LocationSectionProps> = ({
  sectionId,
  profile,
  countries,
  states,
  cities,
  selectedCountryId,
  selectedStateId,
  onLayout,
  openModal,
}) => (
  <View
    onLayout={(e) => onLayout(sectionId, e)}
    className="bg-white mb-4"
  >
    <EditSectionHeader title="Location" />

    <EditRow
      label="Country"
      value={profile?.countryName}
      onPress={() =>
        openModal("Country", "country", countries, profile?.countryId)
      }
    />

    <EditRow
      label="State"
      value={profile?.stateName}
      onPress={() => {
        if (!selectedCountryId) {
          Alert.alert("Select Country", "Please select a Country first.");
          return;
        }
        openModal("State", "state", states, profile?.stateId);
      }}
    />

    <EditRow
      label="City"
      value={profile?.cityName}
      onPress={() => {
        if (!selectedStateId) {
          Alert.alert("Select State", "Please select a State first.");
          return;
        }
        openModal("City", "city", cities, profile?.cityId);
      }}
    />
  </View>
);
