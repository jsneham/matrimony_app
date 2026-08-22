import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ProfileVisitors = () => {
  const insets = useSafeAreaInsets();

  return (
    <View className="mb-2 px-5" style={{ paddingTop: insets.top + 12 }}>
      <View className="mb-3 flex-row items-center justify-between">
        <Text className="text-2xl font-bold text-gray-900">
          Profile Visitors
        </Text>
        <TouchableOpacity>
          <Text className="text-sm font-bold text-orange-500">See All</Text>
        </TouchableOpacity>
      </View>
      <Text className="text-base font-regular text-gray-500">
        See who&apos;s interested. Who visited your profile.
      </Text>
      <View className="mt-5 items-center rounded-2xl border border-gray-100 bg-white px-5 py-6">
        <Ionicons name="eye-outline" size={32} color="#cbd5e1" />
        <Text className="mt-3 text-center text-sm text-gray-400">
          Members who viewed your profile will appear here.
        </Text>
      </View>
    </View>
  );
};

export default ProfileVisitors;
