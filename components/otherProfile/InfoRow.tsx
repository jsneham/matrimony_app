import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";
import { Text } from "@/components/ui/Text";

export const InfoRow = ({
  icon,
  text,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  text: string;
}) => (
  <View className="flex-row items-center px-5 py-3">
    <Ionicons name={icon} size={20} color="#111827" style={{ width: 28 }} />
    <Text className="text-base text-gray-900 flex-1 ml-2">{text}</Text>
  </View>
);

export const SectionHeading = ({ title }: { title: string }) => (
  <Text className="text-xl font-bold text-gray-900 px-5 pt-6 pb-2">
    {title}
  </Text>
);

export default InfoRow;
