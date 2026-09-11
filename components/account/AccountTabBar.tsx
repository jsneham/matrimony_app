// components/account/AccountTabBar.tsx
// Same visual style as components/profile/ProfileTabBar.tsx, adapted to
// react-native-collapsible-tab-view's renderTabBar contract.
import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Text } from "@/components/ui/Text";
import { TabBarProps } from "react-native-collapsible-tab-view";
import { runOnJS, useAnimatedReaction } from "react-native-reanimated";

export const AccountTabBar = ({
  tabNames,
  focusedTab,
  onTabPress,
}: TabBarProps) => {
  const [textWidths, setTextWidths] = useState<Record<string, number>>({});
  const [activeTab, setActiveTab] = useState(tabNames[0]);

  useAnimatedReaction(
    () => focusedTab.value,
    (current, previous) => {
      if (current !== previous) {
        runOnJS(setActiveTab)(current);
      }
    },
    [],
  );

  return (
    <View className="flex-row justify-evenly px-3 pt-6 border-b border-gray-200 bg-app-background">
      {tabNames.map((tab) => {
        const isActive = activeTab === tab;
        return (
          <TouchableOpacity
            key={tab}
            onPress={() => onTabPress(tab)}
            activeOpacity={0.75}
            className="items-center pt-[10px] pb-0 px-2"
          >
            <Text
              onLayout={(e) => {
                const width = e?.nativeEvent?.layout?.width;
                if (width)
                  setTextWidths((prev) => ({ ...prev, [tab]: width }));
              }}
              numberOfLines={1}
              adjustsFontSizeToFit
              className={`text-[12px] font-bold text-center ${
                isActive ? "text-gray-900" : "text-gray-500"
              }`}
            >
              {tab}
            </Text>
            <View
              className={`mt-2 -mb-px h-0.5 rounded-[1px] ${
                isActive ? "bg-gray-900" : "bg-transparent"
              }`}
              style={{ width: textWidths[tab] ?? 0 }}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default AccountTabBar;
