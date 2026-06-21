// components/profile/sections/LifestyleSection.tsx
import {
  EditRow,
  EditSectionHeader,
} from "@/components/profile/ProfileEditComponents";
import React from "react";
import { View } from "react-native";

interface LifestyleSectionProps {
  sectionId: string;
  onLayout: (sectionId: string, event: any) => void;
}

export const LifestyleSection: React.FC<LifestyleSectionProps> = ({
  sectionId,
  onLayout,
}) => (
  <View
    onLayout={(e) => onLayout(sectionId, e)}
    className="mb-12 mx-5"
    style={{ backgroundColor: '#f9fafb', borderTopLeftRadius: 16, borderTopRightRadius: 16, borderBottomLeftRadius: 16, borderBottomRightRadius: 16 }}
  >
    <EditSectionHeader title="Lifestyle" />

    <EditRow
      label="Diet"
      onPress={() => {}}
    />

    <EditRow
      label="Smoke"
      onPress={() => {}}
    />

    <EditRow
      isLast
      label="Drink"
      onPress={() => {}}
    />
  </View>
);
