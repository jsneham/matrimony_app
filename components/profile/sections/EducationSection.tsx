// components/profile/sections/EducationSection.tsx
import React, { useMemo } from "react";
import { View } from "react-native";
import { LookupItem } from "@/types/metadata";
import { UserProfile } from "@/types/profile";
import { EditRow, EditSectionHeader } from "@/components/profile/ProfileEditComponents";

const INCOME_OPTIONS: LookupItem[] = [
  { id: "< 25 Lakh",  name: "< 25 Lakh"  },
  { id: "25-50 Lakh", name: "25-50 Lakh" },
  { id: "50-1 Cr",    name: "50-1 Cr"    },
  { id: "1-5 Cr",     name: "1-5 Cr"     },
  { id: "5+ Cr",      name: "5+ Cr"      },
];

interface EducationSectionProps {
  sectionId: string;
  profile?: UserProfile;
  educations: LookupItem[];
  occupations: LookupItem[];
  onLayout: (sectionId: string, event: any) => void;
  openModal: (
    title: string,
    field: string,
    options: LookupItem[],
    currentValue?: string
  ) => void;
}

export const EducationSection: React.FC<EducationSectionProps> = ({
  sectionId,
  profile,
  educations,
  occupations,
  onLayout,
  openModal,
}) => (
  <View
    onLayout={(e) => onLayout(sectionId, e)}
    className="bg-white mb-4"
  >
    <EditSectionHeader title="Education & Career" />

    <EditRow
      label="Education"
      value={profile?.educationName}
      onPress={() =>
        openModal("Education", "education", educations, profile?.educationDetail)
      }
    />

    <EditRow
      label="Occupation"
      value={profile?.occupationName}
      onPress={() =>
        openModal("Occupation", "occupation", occupations, profile?.occupation)
      }
    />

    <EditRow
      label="Annual Income"
      value={profile?.income}
      onPress={() =>
        openModal("Annual Income", "income", INCOME_OPTIONS, profile?.income)
      }
    />
  </View>
);
