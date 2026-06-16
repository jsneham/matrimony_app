// components/profile/ProfileTabBar.tsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { TabConfig } from "@/types/profile";

interface ProfileTabBarProps {
  tabs: TabConfig[];
  activeTab: string;
  onTabPress: (tabId: string) => void;
}

export const ProfileTabBar: React.FC<ProfileTabBarProps> = ({
  tabs,
  activeTab,
  onTabPress,
}) => (
  <View className="flex-row gap-2 mx-5 mb-2">
    {tabs.map((tab) => {
      const isActive = activeTab === tab.id;
      return (
        <TouchableOpacity
          key={tab.id}
          onPress={() => onTabPress(tab.id)}
          activeOpacity={0.75}
          className={`flex-1 px-3 py-2.5 rounded-lg border ${
            isActive
              ? "bg-gray-900 border-gray-900"
              : "bg-white border-gray-300"
          }`}
        >
          <Text
            className={`text-[11px] font-semibold text-center ${
              isActive ? "text-white" : "text-gray-700"
            }`}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      );
    })}
  </View>
);
