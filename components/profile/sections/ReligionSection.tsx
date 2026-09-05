// components/profile/sections/ReligionSection.tsx
import {
  EditRow,
  EditSectionHeader,
} from "@/components/profile/ProfileEditComponents";
import { LookupItem } from "@/types/metadata";
import { EditableFieldDescriptor, UserProfile } from "@/types/profile";
import { checkValue } from "@/utils/checkValue";
import React from "react";
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
    currentValue?: string | string[],
    isMultiSelect?: boolean,
    editableTextFields?: EditableFieldDescriptor[],
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
      <EditSectionHeader title="Faith & Astro" />

      <EditRow
        isFirst
        editable={checkValue(profile?.religion_name ?? "")}
        label="Religion"
        value={profile?.religion_name}
        onPress={() =>
          openModal("Religion", "religion", religions, profile?.religion)
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
              {
                field: "subcaste",
                label: "Sub Caste",
                placeholder: "Sub Caste",
                isMultiline: false,
              },
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
              {
                field: "gotra",
                label: "Gotra",
                placeholder: "Gotra",
                isMultiline: false,
              },
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
          openModal("Moonsign", "moonsign", moonsign, profile?.moonsign)
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
              {
                field: "birthtime",
                label: "Birth Time",
                placeholder: "Birth Time",
                type: "time",
              },
            ],
          )
        }
      />

      <NonEditableText
        isLast
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
              {
                field: "birthplace",
                label: "Birth Place",
                placeholder: "Birth Place",
                isMultiline: false,
              },
            ],
          )
        }
      />

      <NonEditableText
        isLast={false}
        label="About Us"
        value={profile?.profile_text}
        onPress={() =>
          openModal(
            "About Us",
            "profile_text",
            [],
            profile?.profile_text, // currentValue (4th param)
            false,
            [
              {
                field: "profile_text",
                label: "About Us",
                placeholder: "About Us",
                isMultiline: true,
              },
            ],
          )
        }
      />
    </View>
  );
};
