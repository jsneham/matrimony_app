import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Text } from "@/components/ui/Text";

const Help = () => {
  return (
    <View className="mx-4 mt-6 rounded-2xl bg-white border border-gray-100 overflow-hidden">
      <View className="px-5 pt-4 pb-3">
        <View className="flex-row items-start">
          <View className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center mr-3 mt-0.5">
            <Ionicons name="headset" size={20} color="#374151" />
          </View>
          <View className="flex-1">
            <Text className="text-gray-900 text-base font-bold mb-1">
              Need Help? WhatsApp Us
            </Text>
            <Text className="text-gray-400 text-sm leading-5">
              Share your queries on WhatsApp.{"\n"}We'll assist you at the
              earliest.
            </Text>
          </View>
        </View>
      </View>

      {/* Divider */}
      <View className="h-px bg-gray-100 mx-4" />

      {/* WhatsApp Button */}
      <TouchableOpacity className="flex-row items-center justify-center px-5 py-4">
        <View
          className="w-7 h-7 rounded-full items-center justify-center mr-2"
          style={{ backgroundColor: "#25D366" }}
        >
          <Ionicons name="logo-whatsapp" size={16} color="white" />
        </View>
        <Text className="text-base font-bold" style={{ color: "#25D366" }}>
          WhatsApp Now
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Help;
