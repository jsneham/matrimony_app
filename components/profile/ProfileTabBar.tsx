// components/profile/ProfileTabBar.tsx
import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { Text } from "@/components/ui/Text";
import { colors } from "@/constants/theme";
import { TabConfig } from "@/types/profile";
import { platformTextSize } from "@/utils/platformTextSize";

interface ProfileTabBarProps {
  tabs: TabConfig[];
  activeTab: string;
  onTabPress: (tabId: string) => void;
}

export const ProfileTabBar: React.FC<ProfileTabBarProps> = ({
  tabs,
  activeTab,
  onTabPress,
}) => {
  const [textWidths, setTextWidths] = useState<Record<string, number>>({});

  return (
    <View className="flex-row justify-evenly px-3 mb-2 border-b border-gray-200">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <TouchableOpacity
            key={tab.id}
            onPress={() => onTabPress(tab.id)}
            activeOpacity={0.75}
            style={{ alignItems: 'center', paddingTop: 10, paddingBottom: 0, paddingHorizontal: 8 }}
          >
            <Text
              onLayout={(e) => {
                const width = e?.nativeEvent?.layout?.width;
                if (width) setTextWidths((prev) => ({ ...prev, [tab.id]: width }));
              }}
              numberOfLines={1}
              adjustsFontSizeToFit
              className={`${platformTextSize(13)} leading-none text-center font-bold ${
                isActive ? "text-black" : "text-gray"
              }`}
            >
              {tab.label}
            </Text>
            <View
              style={{
                marginTop: 8,
                marginBottom: -1,
                height: 2,
                width: textWidths[tab.id] ?? 0,
                borderRadius: 1,
                backgroundColor: isActive ? colors.black : "transparent",
              }}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
