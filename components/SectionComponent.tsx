import { FormSection, SectionRef } from "@/types/profile";
import React, { useCallback } from "react";
import { LayoutChangeEvent, View } from "react-native";
import { Text } from "@/components/ui/Text";
import { FormFieldComponent } from "./FormFieldComponent";
/**
 * Render a section with title and fields
 */
export const SectionComponent = ({
  section,
  sectionRefs,
}: {
  section: FormSection;
  sectionRefs: React.RefObject<SectionRef>;
}) => {
  /**
   * Record section layout for scroll tracking
   */
  const handleSectionLayout = useCallback(
    (sectionId: string, event: LayoutChangeEvent) => {
      const { y, height } = event.nativeEvent.layout;
      sectionRefs.current[sectionId] = { y, height };
    },
    [],
  );

  return (
    <View
      key={section.sectionId}
      onLayout={(event) => handleSectionLayout(section.sectionId, event)}
      className="bg-white mb-4"
    >
      {/* Section Header */}
      <View className="px-5 py-3 bg-gray-50 border-b border-gray-100">
        <Text className="text-black font-bold text-sm">{section.title}</Text>
      </View>

      {/* Section Fields */}
      {section.fields.map((field) => (
        <FormFieldComponent key={field.id} field={field} />
      ))}
    </View>
  );
};
