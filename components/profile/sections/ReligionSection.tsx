// components/profile/sections/ReligionSection.tsx
import {
  EditableText,
  EditRow,
  EditSectionHeader,
} from "@/components/profile/ProfileEditComponents";
import { LookupItem } from "@/types/metadata";
import { UserProfile } from "@/types/profile";
import { checkValue } from "@/utils/checkValue";
import React, { useState } from "react";
import { Alert, View } from "react-native";
import { NonEditableText } from "./NonEditableText";

interface ReligionSectionProps {
  sectionId: string;
  profile?: UserProfile;
  religions: LookupItem[];
  castes: LookupItem[];
  gotras: LookupItem[];
  mangliks: LookupItem[];
  horoscope: LookupItem[];
  moonsign: LookupItem[];
  selectedReligionId: string;
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

export const ReligionSection: React.FC<ReligionSectionProps> = ({
  sectionId,
  profile,
  religions,
  castes,
  gotras,
  mangliks,
  horoscope,
  moonsign,
  selectedReligionId,
  onLayout,
  openModal,
}) => {
  const [gotra, setGotra] = useState(profile?.gothra ?? "");
  const [subcaste, setSubCaste] = useState(profile?.subcaste ?? "");
  const [birthtime, setBirthTime] = useState(profile?.birthtime ?? "");
  const [birthplace, setBirthPlace] = useState(profile?.birthplace ?? "");

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
      <EditSectionHeader title="Faith & Astro" />

      <EditRow
        editable={checkValue(profile?.religion_name ?? "")}
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

      <NonEditableText
        isLast={false}
        label="Sub Caste"
        value={profile?.subcaste}
        onPress={() =>
          openModal(
            "Sub Caste",
            "subcaste",
            [],
            profile?.subcaste, // currentValue (4th param)
            false,
            [
              <EditableText
                key="subcaste"
                isLast={true}
                label="Sub Caste"
                value={subcaste}
                onChangeText={setSubCaste}
                placeholder="Sub Caste"
              />,
            ],
          )
        }
      />

      {/* <EditRow
        label="Gotra"
        value={profile?.gothra}
        onPress={() => openModal("Gotra", "gotra", gotras, profile?.gothra)}
      /> */}

      <NonEditableText
        isLast={false}
        label="Gotra"
        value={profile?.gothra}
        onPress={() =>
          openModal(
            "Gotra",
            "gotra",
            [],
            profile?.gothra, // currentValue (4th param)
            false,
            [
              <EditableText
                key="gotra"
                isLast={true}
                label="Gotra"
                value={gotra}
                onChangeText={setGotra}
                placeholder="Gotra"
              />,
            ],
          )
        }
      />

      <EditRow
        label="Manglik"
        value={profile?.manglik}
        onPress={() =>
          openModal("Manglik", "manglik", mangliks, profile?.manglik)
        }
      />

      <EditRow
        label="Horoscope Belief"
        value={profile?.horoscope}
        onPress={() =>
          openModal(
            "Horoscope Belief",
            "horoscope",
            horoscope,
            profile?.horoscope,
          )
        }
      />

      <EditRow
        label="Moonsign"
        value={profile?.moonsign_str}
        onPress={() =>
          openModal("Moonsign", "moonsign", moonsign, profile?.moonsign_str)
        }
      />

      <NonEditableText
        isLast={false}
        label="Birth Time"
        value={profile?.birthtime}
        onPress={() =>
          openModal(
            "Birth Time",
            "birthtime",
            [],
            profile?.birthtime, // currentValue (4th param)
            false,
            [
              <EditableText
                key="birthtime"
                isLast={true}
                label="Birth Time"
                value={birthtime}
                onChangeText={setBirthTime}
                placeholder="Birth Time"
              />,
            ],
          )
        }
      />

      <NonEditableText
        isLast={false}
        label="Birth Place"
        value={profile?.birthplace}
        onPress={() =>
          openModal(
            "Birth Place",
            "birthplace",
            [],
            profile?.birthplace, // currentValue (4th param)
            false,
            [
              <EditableText
                key="birthplace"
                isLast={true}
                label="Birth Place"
                value={birthplace}
                onChangeText={setBirthTime}
                placeholder="Birth Place"
              />,
            ],
          )
        }
      />
    </View>
  );
};
