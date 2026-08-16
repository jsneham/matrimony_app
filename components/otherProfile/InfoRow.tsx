import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

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
  <Text
    className="px-5 pb-2 text-xl font-bold text-gray-900"
    style={{ paddingTop: 16 }}
  >
    {title}
  </Text>
);

export default InfoRow;
