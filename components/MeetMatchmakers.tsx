import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const MeetMatchmakers = () => {
  return (
    <View className="bg-white mx-4 mt-3 rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <TouchableOpacity className="flex-row items-center px-4 py-4">
        <View
          className="w-14 h-14 rounded-full items-center justify-center mr-4"
          style={{ backgroundColor: "#0ea5e9" }}
        >
          <Ionicons name="people" size={26} color="white" />
        </View>
        <View className="flex-1">
          <Text className="text-gray-900 text-base font-bold mb-0.5">
            Meet Matchmakers
          </Text>
          <Text className="text-gray-400 text-sm">View All Milan Partners</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
      </TouchableOpacity>
    </View>
  );
};

export default MeetMatchmakers;
