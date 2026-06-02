import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const ProfileVisitors = () => {
  return (
    <View className="mt-6 px-4 mb-2">
      <View className="flex-row items-center justify-between mb-3">
        <Text className="text-gray-900 text-lg font-bold">
          Profile Visitors
        </Text>
        <TouchableOpacity>
          <Text className="text-orange-500 text-sm font-semibold">See All</Text>
        </TouchableOpacity>
      </View>
      <View className="bg-white rounded-2xl px-5 py-6 items-center shadow-sm border border-gray-100">
        <Ionicons name="eye-outline" size={32} color="#cbd5e1" />
        <Text className="text-gray-400 text-sm mt-3 text-center">
          Members who viewed your profile will appear here.
        </Text>
      </View>
    </View>
  );
};

export default ProfileVisitors;
