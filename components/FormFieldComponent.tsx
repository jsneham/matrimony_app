import { DummyIcon } from "@/constants/icons";
import { FormField } from "@/types/profile";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

/**
 * Render a single form field
 */
export const FormFieldComponent = ({ field }: { field: FormField }) => (
  <View className="px-5 py-4 border-b border-gray-100 flex-row justify-between items-center">
    <DummyIcon />

    <View className="flex-1">
      <Text className="text-black font-bold text-base mb-1">{field.label}</Text>
      <Text className="text-gray font-regular text-base">
        {field.actionLabel || field.subtext}
      </Text>
    </View>
    <View className="ml-3">
      <Ionicons name="chevron-forward" size={14} color="text-gray" />
    </View>
  </View>
);
