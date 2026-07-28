// components/profile/sections/BasicSection.tsx
import {
  EditRow,
  EditSectionHeader,
} from "@/components/profile/ProfileEditComponents";
import { LookupItem } from "@/types/metadata";
import { EditableFieldDescriptor, UserProfile } from "@/types/profile";
import { checkValue } from "@/utils/checkValue";
import { getHeightInCm } from "@/utils/convertHeight";
import { format } from "date-fns";
import React from "react";
import { View } from "react-native";
import { NonEditableText } from "./NonEditableText";

interface BasicsSectionProps {
  sectionId: string;
  profile?: UserProfile;
  maritalStatuses: LookupItem[];
  languages: LookupItem[];
  height: LookupItem[];
  age: LookupItem[];
  profileby: LookupItem[];
  reference: LookupItem[];
  totalChildren: LookupItem[];
  statusChildren: LookupItem[];
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

export const BasicsSection: React.FC<BasicsSectionProps> = ({
  sectionId,
  profile,
  maritalStatuses,
  languages,
  height,
  age,
  profileby,
  reference,
  totalChildren,
  statusChildren,
  onLayout,
  openModal,
}) => {
  return (
    <View
      onLayout={(e) => onLayout(sectionId, e)}
      className="mt-12 mb-12 mx-5"
      style={{
        backgroundColor: "#f9fafb",
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
      }}
    >
      <EditSectionHeader title="Basics" />

      <NonEditableText
        isFirst
        editable={checkValue(`${profile?.firstname} ${profile?.lastname}`)}
        label="Full Name"
        value={`${profile?.firstname} ${profile?.lastname}`}
        onPress={() =>
          openModal(
            "Full Name",
            "fullName",
            [],
            `${profile?.firstname} ${profile?.lastname}`, // currentValue (4th param)
            false, // isMultiSelect (5th param)
            [
              // editableTextFields (6th param)
              {
                field: "firstname",
                label: "First Name",

                placeholder: "First Name",
              },
              {
                field: "lastname",
                label: "Last Name",
                placeholder: "Last Name",
              },
            ],
          )
        }
      />

      <EditRow
        editable={checkValue(profile?.marital_status ?? "")}
        label="Marital Status"
        value={profile?.marital_status}
        onPress={() =>
          openModal(
            "Marital Status",
            "maritalStatus",
            maritalStatuses,
            profile?.marital_status,
          )
        }
      />

      <EditRow
        editable={checkValue(profile?.height_str ?? "")}
        label="Height"
        value={`${profile?.height_str} (${getHeightInCm(profile?.height_str ?? "0")} cm)`}
        onPress={() =>
          openModal("Height", "height", height, profile?.height_str)
        }
      />

      <EditRow
        editable={checkValue(profile?.age ?? "")}
        label="Age"
        value={`${profile?.age} (${format(profile?.birthdate ?? new Date(), "dd/MM/yyyy")})`}
        onPress={() => openModal("Age", "age", age, profile?.age)}
      />

      <EditRow
        label="Mother Tongue"
        value={profile?.mtongue_name}
        onPress={() =>
          openModal(
            "Mother Tongue",
            "motherTongue",
            languages,
            profile?.mother_tongue,
          )
        }
      />

      {profile?.marital_status !== "Never Married" && (
        <>
          <EditRow
            label="No. of Children"
            value={profile?.total_children}
            onPress={() =>
              openModal(
                "No. of Children",
                "totalChildren",
                totalChildren,
                profile?.total_children,
              )
            }
          />

          <EditRow
            label="Children Living with"
            value={profile?.status_children}
            onPress={() =>
              openModal(
                "Children Living with",
                "statusChildren",
                statusChildren,
                profile?.status_children,
              )
            }
          />
        </>
      )}

      <EditRow
        label="Profile created by"
        value={profile?.profileby}
        onPress={() =>
          openModal(
            "Profile created by",
            "profileby",
            profileby,
            profile?.profileby,
          )
        }
      />

      <EditRow
        isLast
        label="Referred by"
        value={profile?.reference}
        onPress={() =>
          openModal("Referred by", "reference", reference, profile?.reference)
        }
      />

      {/* <EditRow
      label="Height Preference"
      value={profile?.mtongue_name}
      onPress={() =>
        openModal(
          "Height Preference",
          "motherTongue",
          languages,
          profile?.mtongue_name,
        )
      }
    /> */}
    </View>
  );
};
