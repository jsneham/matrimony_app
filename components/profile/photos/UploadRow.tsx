import { Camera } from "lucide-react-native";
import React from "react";
import { Text, View } from "react-native";
import { GuidelinesLink } from "./GuidelinesLink";

export const UploadRow = ({ label }: { label: string }) => (
  <View>
    <View className="flex-row justify-end mb-2">
      <GuidelinesLink />
    </View>
    <View className="border-2 border-dashed border-gray-300 rounded-2xl px-4 py-5 flex-row items-center justify-between bg-white">
      <Text className="text-gray-400 text-base">{label}</Text>
      <View className="w-8 h-8 rounded-full items-center justify-center">
        <Camera size={20} color="#9ca3af" />
      </View>
    </View>
  </View>
);
