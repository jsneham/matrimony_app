import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Text } from "@/components/ui/Text";
import { colors } from "@/constants/theme";

const SuccessStories = () => {
  return (
    <View className="bg-white mx-5 mt-4 rounded-2xl border border-gray-100 overflow-hidden">
      <TouchableOpacity className="flex-row items-center px-4 py-4">
        <View className="w-14 h-14 rounded-full bg-orange-50 items-center justify-center mr-4 overflow-hidden">
          <Text className="text-3xl font-regular">💑</Text>
        </View>
        <View className="flex-1">
          <Text className="text-gray-900 text-base font-bold mb-0.5">
            Success Stories
          </Text>
          <Text className="text-gray-400 text-sm font-regular">
            Couples who found their match
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={colors.gray} />
      </TouchableOpacity>
    </View>
  );
};

export default SuccessStories;
