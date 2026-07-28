// components/profile/sections/LifestyleSection.tsx
import {
  EditRow,
  EditSectionHeader,
} from "@/components/profile/ProfileEditComponents";
import { LookupItem } from "@/types/metadata";
import { UserProfile } from "@/types/profile";
import React from "react";
import { View } from "react-native";

interface LifestyleSectionProps {
  sectionId: string;
  profile?: UserProfile;
  languages: LookupItem[];
  weight: LookupItem[];
  bodyType: LookupItem[];
  eating: LookupItem[];
  drinking: LookupItem[];
  smoking: LookupItem[];
  skinTone: LookupItem[];
  bloodGroup: LookupItem[];
  health: LookupItem[];
  onLayout: (sectionId: string, event: any) => void;
  openModal: (
    title: string,
    field: string,
    options: LookupItem[],
    currentValue?: string | string[],
    isMultiSelect?: boolean,
  ) => void;
}

export const LifestyleSection: React.FC<LifestyleSectionProps> = ({
  sectionId,
  profile,
  languages,
  weight,
  bodyType,
  eating,
  drinking,
  smoking,
  skinTone,
  bloodGroup,
  health,
  onLayout,
  openModal,
}) => (
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
    <EditSectionHeader title="Lifestyle" />

    <EditRow
      isFirst
      label="Spoken Languages"
      value={profile?.languages_known_str}
      onPress={() =>
        openModal(
          "Spoken Languages",
          "spokenLanguages",
          languages,
          profile?.languages_known?.split(",").filter(Boolean) ?? [],
          true,
        )
      }
    />

    <EditRow
      label="Weight"
      value={profile?.weight_str}
      onPress={() => openModal("Weight", "weight", weight, profile?.weight)}
    />
    <EditRow
      label="Body Type (Physique)"
      value={profile?.bodytype}
      onPress={() =>
        openModal(
          "Body Type (Physique)",
          "body_type",
          bodyType,
          profile?.bodytype,
        )
      }
    />
    <EditRow
      label="Eating habit"
      value={profile?.diet}
      onPress={() => openModal("Eating habit", "eating", eating, profile?.diet)}
    />
    <EditRow
      label="Smoking"
      value={profile?.smoke}
      onPress={() => openModal("Smoking", "smoking", smoking, profile?.smoke)}
    />
    <EditRow
      label="Drinking"
      value={profile?.drink}
      onPress={() =>
        openModal("Drinking", "drinking", drinking, profile?.drink)
      }
    />
    <EditRow
      label="Skin tone"
      value={profile?.complexion}
      onPress={() =>
        openModal("Skin tone", "skinTone", skinTone, profile?.complexion)
      }
    />
    <EditRow
      label="Blood Group"
      value={profile?.blood_group}
      onPress={() =>
        openModal("Blood Group", "bloodGroup", bloodGroup, profile?.blood_group)
      }
    />
    <EditRow
      isLast
      label="Health/Challenged"
      value={profile?.physical_info}
      onPress={() =>
        openModal("Health/Challenged", "health", health, profile?.physical_info)
      }
    />
  </View>
);
