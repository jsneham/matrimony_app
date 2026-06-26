// components/profile/ProfileTabBar.tsx
import React, { useState } from "react";
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
}) => {
  const [textWidths, setTextWidths] = useState<Record<string, number>>({});

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', borderBottomWidth: 1, borderBottomColor: '#e5e7eb', marginBottom: 8 }}>
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
              style={{
                fontSize: 12,
                fontFamily: 'Bold',
                color: isActive ? '#111827' : '#6b7280',
                textAlign: 'center',
              }}
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
                backgroundColor: isActive ? '#111827' : 'transparent',
              }}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
