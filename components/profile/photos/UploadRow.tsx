import { Feather } from "@expo/vector-icons";
import { Camera } from "lucide-react-native";
import React from "react";
import { Text, View } from "react-native";
import { GuidelinesLink } from "./GuidelinesLink";

export const UploadRow = ({
  label,
  heading,
  note,
}: {
  label: string;
  heading: string;
  note: string;
}) => (
  <View>
    <View className="mt-14 mb-4">
      <Text className="text-2xl font-bold text-gray-900">{heading}</Text>
    </View>
    <View className="border-2 border-dashed border-gray-300 rounded-2xl px-4 py-4 flex-row items-center justify-between bg-white">
      <Text className="text-gray-400 font-regular text-base">{label}</Text>
      <View className="w-8 h-8 rounded-full items-center justify-center">
        <Camera size={20} color="#9ca3af" />
      </View>
    </View>
    <View className="flex-row items-center justify-between mt-4">
      <View className="flex-row items-center flex-1">
        <Feather
          name="info"
          size={12}
          color="#8B8B8B"
          style={{ marginRight: 6, marginTop: -2 }}
        />
        <Text className="text-gray font-regular text-sm flex-1">{note}</Text>
      </View>
      <GuidelinesLink />
    </View>
  </View>
);
