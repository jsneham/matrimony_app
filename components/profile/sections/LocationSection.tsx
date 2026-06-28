// components/profile/sections/LocationSection.tsx
import {
  EditableText,
  EditRow,
  EditSectionHeader,
} from "@/components/profile/ProfileEditComponents";
import { LookupItem } from "@/types/metadata";
import { UserProfile } from "@/types/profile";
import React, { useState } from "react";
import { Alert, View } from "react-native";
import { NonEditableText } from "./NonEditableText";

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
    currentValue?: string,
    isMultiSelect?: boolean,
    editableTextFields?: React.ReactNode[],
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
}) => {
  const [address, setAddress] = useState(profile?.address ?? "");

  return (
    <View
      onLayout={(e) => onLayout(sectionId, e)}
      className="mb-12 mx-5"
      style={{
        backgroundColor: "#f9fafb",
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
      }}
    >
      <EditSectionHeader title="Location" />

      <EditRow
        label="Country"
        value={profile?.country_name}
        onPress={() =>
          openModal("Country", "country", countries, profile?.country_name)
        }
      />

      <EditRow
        label="State"
        value={profile?.state_name}
        onPress={() => {
          if (!selectedCountryId) {
            Alert.alert("Select Country", "Please select a Country first.");
            return;
          }
          openModal("State", "state", states, profile?.state_name);
        }}
      />

      <EditRow
        label="City"
        value={profile?.city_name}
        onPress={() => {
          if (!selectedStateId) {
            Alert.alert("Select State", "Please select a State first.");
            return;
          }
          openModal("City", "city", cities, profile?.city_name);
        }}
      />

      <NonEditableText
        isLast
        label="Ancestral Origin (Native Place)"
        value={profile?.address}
        onPress={() =>
          openModal(
            "Ancestral Origin (Native Place)",
            "address",
            [],
            profile?.address, // currentValue (4th param)
            false,
            [
              <EditableText
                key="address"
                isLast={true}
                label="Ancestral Origin (Native Place)"
                value={address}
                onChangeText={setAddress}
                placeholder="Select Ancestral Origin"
              />,
            ],
          )
        }
      />
    </View>
  );
};
