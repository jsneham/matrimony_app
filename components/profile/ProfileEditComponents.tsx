import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// 1. Clickable row that opens selection sheets
interface EditRowProps {
  label: string;
  value?: string;
  onPress: () => void;
  placeholder?: string;
}

export const EditRow: React.FC<EditRowProps> = ({
  label,
  value,
  onPress,
  placeholder,
}) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.7}
    className="px-5 py-4 border-b border-gray-100 flex-row justify-between items-center bg-white"
  >
    <View className="flex-1">
      <Text className="text-xs font-semibold text-gray-400 mb-1">{label}</Text>
      <Text
        className={`text-base ${
          value ? "text-gray-900 font-medium" : "text-gray-300 font-normal"
        }`}
      >
        {value || placeholder || `Select ${label}`}
      </Text>
    </View>
    <Ionicons name="chevron-forward" size={16} color="#9ca3af" />
  </TouchableOpacity>
);

// 2. Section divider headers
export const EditSectionHeader: React.FC<{ title: string }> = ({ title }) => (
  <View className="px-5 py-3 bg-gray-50 border-b border-gray-100">
    <Text className="text-black font-bold text-sm">{title}</Text>
  </View>
);

// 3. Top Banner displaying completion level and verification link
interface ProfileProgressBannerProps {
  percentage: number;
}

export const ProfileProgressBanner: React.FC<ProfileProgressBannerProps> = ({
  percentage,
}) => (
  <View className="flex-row items-center justify-between mx-5 h-[34px] my-3 bg-white px-3 rounded-xl">
    <Text className="text-gray font-regular text-sm">
      Profile is {percentage}% updated.
    </Text>
    <TouchableOpacity className="flex-row items-center">
      <Text className="text-black text-sm font-bold">Verify Profile</Text>
      <Ionicons
        name="pencil"
        size={14}
        color="black"
        style={{ marginLeft: 6 }}
      />
    </TouchableOpacity>
  </View>
);

// 4. Foreground blocker with loading spinners during updates
interface LoadingOverlayProps {
  visible: boolean;
  label: string;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  visible,
  label,
}) => {
  if (!visible) return null;
  return (
    <View className="absolute inset-0 bg-white/60 z-50 items-center justify-center">
      <ActivityIndicator size="large" color="#db2777" />
      <Text className="mt-2 text-pink-600 font-bold text-sm">{label}</Text>
    </View>
  );
};
