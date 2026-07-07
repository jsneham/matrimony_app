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
    currentValue?: string | string[],
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
        value={profile?.part_education_str}
        onPress={() =>
          openModal(
            "Education",
            "part_education",
            educations,
            profile?.part_education?.split(",").filter(Boolean) ?? [],
            true,
          )
        }
      />

      <EditRow
        label="Work Sector"
        value={profile?.part_employee_in}
        onPress={() =>
          openModal(
            "Work Sector",
            "part_employee_in",
            workSector,
            profile?.part_employee_in?.split(",").filter(Boolean) ?? [],
            true,
          )
        }
      />
      <EditRow
        label="Occupation"
        value={profile?.part_occupation_str}
        onPress={() =>
          openModal(
            "Occupation",
            "part_occupation",
            occupations,
            profile?.part_occupation?.split(",").filter(Boolean) ?? [],
            true,
          )
        }
      />

      <EditRow
        isLast
        label="Annual Income"
        value={profile?.part_income}
        onPress={() =>
          openModal(
            "Annual Income",
            "part_income",
            income,
            profile?.part_income?.split(",").filter(Boolean) ?? [],
          )
        }
      />
    </View>
  );
};
