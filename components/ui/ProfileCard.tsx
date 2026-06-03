import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

export const ProfileCard = () => (
  <View className="bg-white mx-4 mt-4 rounded-2xl px-4 py-4 shadow-sm border border-gray-100">
    <View className="flex-row items-center">
      {/* Avatar with ring */}
      <View className="relative mr-4">
        <View
          className="w-20 h-20 rounded-full items-center justify-center bg-gray-100"
          style={{
            borderWidth: 3,
            borderColor: "#0ea5e9",
            borderStyle: "dashed",
          }}
        >
          <Ionicons name="person" size={40} color="#94a3b8" />
        </View>
      </View>

      {/* User info */}
      <View className="flex-1">
        <Text className="text-gray-900 text-lg font-bold mb-0.5">
          Radhika Punekar
        </Text>
        <Text className="text-gray-400 text-sm mb-2">JJ125575</Text>
        <View className="flex-row items-center justify-between">
          <Text className="text-sky-500 text-sm font-bold">79% COMPLETED</Text>
          <TouchableOpacity>
            <Text className="text-orange-500 text-sm font-bold">
              UPDATE PROFILE &rsaquo;
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </View>
);
