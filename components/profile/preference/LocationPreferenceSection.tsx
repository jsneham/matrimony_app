// components/profile/sections/LocationSection.tsx
import {
    EditRow,
    EditSectionHeader,
} from "@/components/profile/ProfileEditComponents";
import { LookupItem } from "@/types/metadata";
import { EditableFieldDescriptor, UserProfile } from "@/types/profile";
import React from "react";
import { Alert, View } from "react-native";

interface LocationSectionProps {
  sectionId: string;
  profile?: UserProfile;
  countries: LookupItem[];
  states: LookupItem[];
  cities: LookupItem[];
  selectedCountryId: string[];
  selectedStateId: string[];
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

export const LocationPreferenceSection: React.FC<LocationSectionProps> = ({
  sectionId,
  profile,
  countries,
  states,
  cities,
  selectedCountryId,
  selectedStateId,
  onLayout,
  openModal,
}) => {
  return (
    <View
      onLayout={(e) => onLayout(sectionId, e)}
      className="mx-5 mb-12"
      style={{
        marginTop: 18,
        backgroundColor: "#f9fafb",
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
      }}
    >
      <EditSectionHeader title="Location" />

      <EditRow
        isFirst
        label="Country"
        value={profile?.part_country_living_str}
        onPress={() =>
          openModal(
            "Country",
            "part_country_living",
            countries,
            profile?.part_country_living?.split(",").filter(Boolean) ?? [],
            true,
          )
        }
      />

      <EditRow
        label="State"
        value={profile?.part_state_str}
        onPress={() => {
          if (!selectedStateId?.length) {
            Alert.alert("Select Country", "Please select a Country first.");
            return;
          }
          openModal(
            "State",
            "part_state",
            states,
            profile?.part_state?.split(",").filter(Boolean) ?? [],
            true,
          );
        }}
      />

      <EditRow
        isLast
        label="City"
        value={profile?.part_city_str}
        onPress={() => {
          if (!selectedStateId) {
            Alert.alert("Select State", "Please select a State first.");
            return;
          }
          openModal(
            "City",
            "part_city",
            cities,
            profile?.part_city?.split(",").filter(Boolean) ?? [],
            true,
          );
        }}
      />
    </View>
  );
};
