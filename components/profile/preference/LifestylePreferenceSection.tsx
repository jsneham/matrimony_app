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
  eating: LookupItem[];
  drinking: LookupItem[];
  smoking: LookupItem[];
  onLayout: (sectionId: string, event: any) => void;
  openModal: (
    title: string,
    field: string,
    options: LookupItem[],
    currentValue?: string | string[],
    isMultiSelect?: boolean,
  ) => void;
}

export const LifestylePreferenceSection: React.FC<LifestyleSectionProps> = ({
  sectionId,
  profile,
  eating,
  drinking,
  smoking,
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
      label="Eating habit"
      value={profile?.part_diet}
      onPress={() =>
        openModal("Eating habit", "part_diet", eating, profile?.part_diet, true)
      }
    />
    <EditRow
      label="Smoking"
      value={profile?.part_smoke}
      onPress={() =>
        openModal("Smoking", "part_smoke", smoking, profile?.part_smoke, true)
      }
    />
    <EditRow
      label="Drinking"
      value={profile?.part_drink}
      onPress={() =>
        openModal("Drinking", "part_drink", drinking, profile?.part_drink, true)
      }
    />
  </View>
);
