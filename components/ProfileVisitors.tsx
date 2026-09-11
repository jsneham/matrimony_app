import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Text } from "@/components/ui/Text";

const ProfileVisitors = () => {
  return (
    <View className="mt-14 px-5 mb-2">
      <View className="flex-row items-center justify-between mb-3">
        <Text className="text-gray-900 text-2xl font-bold">
          Profile Visitors
        </Text>
        <TouchableOpacity>
          <Text className="text-orange-500 text-sm font-bold">See All</Text>
        </TouchableOpacity>
      </View>
      <Text className="text-base font-regular text-gray-500">
        See who&apos;s interested. Who visited your profile.
      </Text>
      <View className="mt-5 bg-white rounded-2xl px-5 py-6 items-center border border-gray-100">
        <Ionicons name="eye-outline" size={32} color="#cbd5e1" />
        <Text className="text-gray-400 text-sm mt-3 text-center font-regular">
          Members who viewed your profile will appear here.
        </Text>
      </View>
    </View>
  );
};

export default ProfileVisitors;
