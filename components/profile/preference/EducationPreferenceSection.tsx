// components/profile/sections/EducationSection.tsx
import {
  EditRow,
  EditSectionHeader,
} from "@/components/profile/ProfileEditComponents";
import { LookupItem } from "@/types/metadata";
import { EditableFieldDescriptor, UserProfile } from "@/types/profile";
import React from "react";
import { View } from "react-native";

interface EducationSectionProps {
  sectionId: string;
  profile?: UserProfile;
  educations: LookupItem[];
  workSector: LookupItem[];
  income: LookupItem[];
  occupations: LookupItem[];
  designation: LookupItem[];
  onLayout: (sectionId: string, event: any) => void;
  openModal: (
    title: string,
    field: string,
    options: LookupItem[],
    currentValue?: string,
    isMultiSelect?: boolean,
    editableTextFields?: EditableFieldDescriptor[],
  ) => void;
}

export const EducationPreferenceSection: React.FC<EducationSectionProps> = ({
  sectionId,
  profile,
  educations,
  workSector,
  income,
  occupations,
  designation,
  onLayout,
  openModal,
}) => {
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
      <EditSectionHeader title="Education & Career" />

      <EditRow
        label="Education"
        value={profile?.education_name}
        onPress={() =>
          openModal(
            "Education",
            "education",
            educations,
            profile?.education_detail,
          )
        }
      />

      <EditRow
        label="Work Sector"
        value={profile?.employee_in}
        onPress={() =>
          openModal(
            "Work Sector",
            "workSector",
            workSector,
            profile?.employee_in,
          )
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
            profile?.occupation,
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
};
