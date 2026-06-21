// components/profile/sections/FamilySection.tsx
import {
  EditRow,
  EditSectionHeader,
} from "@/components/profile/ProfileEditComponents";
import React from "react";
import { View } from "react-native";

interface FamilySectionProps {
  sectionId: string;
  onLayout: (sectionId: string, event: any) => void;
}

export const FamilySection: React.FC<FamilySectionProps> = ({
  sectionId,
  onLayout,
}) => (
  <View
    onLayout={(e) => onLayout(sectionId, e)}
    className="mb-12 mx-5"
    style={{ backgroundColor: '#f9fafb', borderTopLeftRadius: 16, borderTopRightRadius: 16, borderBottomLeftRadius: 16, borderBottomRightRadius: 16 }}
  >
    <EditSectionHeader title="Family" />

    <EditRow
      label="Family Type"
      onPress={() => {}}
    />

    <EditRow
      label="Family Status"
      onPress={() => {}}
    />

    <EditRow
      isLast
      label="Family Values"
      onPress={() => {}}
    />
  </View>
);
