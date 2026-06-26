// components/profile/sections/EducationSection.tsx
import {
  EditRow,
  EditSectionHeader,
} from "@/components/profile/ProfileEditComponents";
import { LookupItem } from "@/types/metadata";
import { UserProfile } from "@/types/profile";
import React from "react";
import { View } from "react-native";

interface EducationSectionProps {
  sectionId: string;
  profile?: UserProfile;
  educations: LookupItem[];
  occupations: LookupItem[];
  income: LookupItem[];
  onLayout: (sectionId: string, event: any) => void;
  openModal: (
    title: string,
    field: string,
    options: LookupItem[],
    currentValue?: string,
  ) => void;
}

export const EducationSection: React.FC<EducationSectionProps> = ({
  sectionId,
  profile,
  educations,
  occupations,
  income,
  onLayout,
  openModal,
}) => (
  <View
    onLayout={(e) => onLayout(sectionId, e)}
    className="mb-12 mx-5"
    style={{ backgroundColor: '#f9fafb', borderTopLeftRadius: 16, borderTopRightRadius: 16, borderBottomLeftRadius: 16, borderBottomRightRadius: 16 }}
  >
    <EditSectionHeader title="Education & Career" />

    <EditRow
      label="Education"
      value={profile?.education_name}
      onPress={() =>
        openModal("Education", "education", educations, profile?.education_name)
      }
    />

    <EditRow
      label="Occupation"
      value={profile?.occupation_name}
      onPress={() =>
        openModal(
          "Occupation",
          "occupation",
          occupations,
          profile?.occupation_name,
        )
      }
    />

    <EditRow
      isLast
      label="Annual Income"
      value={profile?.income}
      onPress={() =>
        openModal("Annual Income", "income", income, profile?.income)
      }
    />
  </View>
);
