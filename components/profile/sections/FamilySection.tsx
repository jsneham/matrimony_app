// components/profile/sections/FamilySection.tsx
import {
    EditRow,
    EditSectionHeader,
} from "@/components/profile/ProfileEditComponents";
import { LookupItem } from "@/types/metadata";
import { EditableFieldDescriptor, UserProfile } from "@/types/profile";
import React from "react";
import { View } from "react-native";
import { NonEditableText } from "./NonEditableText";

interface FamilySectionProps {
  sectionId: string;
  profile?: UserProfile;
  familyType: LookupItem[];
  familyStatus: LookupItem[];
  noOfBrothers: LookupItem[];
  noOfMarriedBrothers: LookupItem[];
  noOfSisters: LookupItem[];
  noOfMarriedSisters: LookupItem[];
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

export const FamilySection: React.FC<FamilySectionProps> = ({
  sectionId,
  profile,
  familyType,
  familyStatus,
  noOfBrothers,
  noOfMarriedBrothers,
  noOfSisters,
  noOfMarriedSisters,
  onLayout,
  openModal,
}) => {
  return (
    <View
      onLayout={(e) => onLayout(sectionId, e)}
      className="mx-5 mb-12"
      style={{
        marginTop: 18,
        backgroundColor: "#f9fafb",
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
      }}
    >
      <EditSectionHeader title="Family" />

      <EditRow
        isFirst
        label="Family Type"
        value={profile?.family_type}
        onPress={() =>
          openModal(
            "Family Type",
            "familyType",
            familyType,
            profile?.family_type,
          )
        }
      />

      <EditRow
        label="Family Status"
        value={profile?.family_status}
        onPress={() =>
          openModal(
            "Family Status",
            "familyStatus",
            familyStatus,
            profile?.family_status,
          )
        }
      />

      <NonEditableText
        isLast={false}
        label="Father's Name"
        value={profile?.father_name}
        onPress={() =>
          openModal(
            "Father's Name",
            "fatherName",
            [],
            profile?.father_name,
            false,
            [
              {
                field: "fatherName",
                label: "Father's Name",
                placeholder: "Father's Name",
                isMultiline: false,
              },
            ],
          )
        }
      />

      <NonEditableText
        isLast={false}
        label="Father's Occupation"
        value={profile?.father_occupation}
        onPress={() =>
          openModal(
            "Father's Occupation",
            "fatherOccupation",
            [],
            profile?.father_occupation,
            false,
            [
              {
                field: "fatherOccupation",
                label: "Father's Occupation",

                placeholder: "Father's Occupation",

                isMultiline: false,
              },
            ],
          )
        }
      />

      <NonEditableText
        isLast={false}
        label="Mother's Name"
        value={profile?.mother_name}
        onPress={() =>
          openModal(
            "Mother's Name",
            "motherName",
            [],
            profile?.mother_name, // currentValue (4th param)
            false,
            [
              {
                field: "motherName",
                label: "Mother's Name",

                placeholder: "Mother's Name",

                isMultiline: false,
              },
            ],
          )
        }
      />

      <NonEditableText
        isLast={false}
        label="Mother's Occupation"
        value={profile?.mother_occupation}
        onPress={() =>
          openModal(
            "Mother's Occupation",
            "motherOccupation",
            [],
            profile?.mother_occupation, // currentValue (4th param)
            false,
            [
              {
                field: "motherOccupation",
                label: "Mother's Occupation",
                placeholder: "Mother's Occupation",
                isMultiline: false,
              },
            ],
          )
        }
      />

      <EditRow
        label="No. Of Brother(s)"
        value={profile?.no_of_brothers}
        onPress={() =>
          openModal(
            "No. Of Brother(s)",
            "noOfBrothers",
            noOfBrothers,
            profile?.no_of_brothers,
          )
        }
      />
      {profile?.no_of_brothers && parseInt(profile.no_of_brothers) > 0 && (
        <EditRow
          label="Married Brother(s)"
          value={profile?.no_of_married_brother}
          onPress={() =>
            openModal(
              "Married Brother(s)",
              "noOfMarriedBrothers",
              noOfMarriedBrothers,
              profile?.no_of_married_brother,
            )
          }
        />
      )}

      <EditRow
        label="No. Of Sister(s)"
        value={profile?.no_of_sisters}
        onPress={() =>
          openModal(
            "No. Of Sister(s)",
            "noOfSisters",
            noOfSisters,
            profile?.no_of_sisters,
          )
        }
      />

      {profile?.no_of_sisters && parseInt(profile.no_of_sisters) > 0 && (
        <EditRow
          label="Married Sister(s)"
          value={profile?.no_of_married_sister}
          onPress={() =>
            openModal(
              "Married Sister(s)",
              "noOfMarriedSisters",
              noOfMarriedSisters,
              profile?.no_of_married_sister,
            )
          }
        />
      )}

      <NonEditableText
        isLast
        label="About Family"
        value={profile?.family_details}
        onPress={() =>
          openModal(
            "About Family",
            "familyDetails",
            [],
            profile?.family_details, // currentValue (4th param)
            false,
            [
              {
                field: "familyDetails",
                label: "About Family",
                placeholder: "About Family",
                isMultiline: true,
              },
            ],
          )
        }
      />
    </View>
  );
};
