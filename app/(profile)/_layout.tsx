import { Ionicons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import PagerView from "react-native-pager-view";

import { PROFILE_TABS } from "@/constants/data";
import EditProfileScreen from ".";
import EditPhotosMoreScreen from "./EditPhotosMoreScreen";
import EditPartnerPreferenceScreen from "./partner-preference";

type TabLayout = { x: number; width: number };

export default function MatchesLayout() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [tabLayouts, setTabLayouts] = useState<Record<number, TabLayout>>({});
  const pagerRef = useRef<PagerView>(null);

  const handleTabPress = (index: number) => {
    pagerRef.current?.setPage(index);
    setActiveIndex(index);
  };

  const onPageSelected = (e: any) => {
    setActiveIndex(e.nativeEvent.position);
  };

  const lastIndex = PROFILE_TABS.length - 1;
  const firstTab = tabLayouts[0];
  const lastTab = tabLayouts[lastIndex];

  return (
    <View className="flex-1 bg-white">
      {/* ── Top Tab Bar ───────────────────────────────── */}
      <View
        onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
          height: 44,
        }}
      >
        {/* Extension so the first tab's line reaches the true left edge */}
        {firstTab && (
          <View
            style={{
              position: "absolute",
              left: 0,
              bottom: 0,
              width: firstTab.x,
              height: 2,
              backgroundColor: activeIndex === 0 ? "#000000" : "#F9F9F9",
            }}
          />
        )}
        {/* Extension so the last tab's line reaches the true right edge */}
        {lastTab && containerWidth > 0 && (
          <View
            style={{
              position: "absolute",
              right: 0,
              bottom: 0,
              width: containerWidth - (lastTab.x + lastTab.width),
              height: 2,
              backgroundColor:
                activeIndex === lastIndex ? "#000000" : "#F9F9F9",
            }}
          />
        )}

        {PROFILE_TABS.map((tab, index) => {
          const isActive = activeIndex === index;
          return (
            <TouchableOpacity
              key={tab.key}
              onPress={() => handleTabPress(index)}
              onLayout={(e) => {
                const { x, width } = e.nativeEvent.layout;
                setTabLayouts((prev) => ({
                  ...prev,
                  [index]: { x, width },
                }));
              }}
              activeOpacity={0.7}
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                paddingVertical: 14,
                paddingHorizontal: 24,
                height: 44,
                backgroundColor: "#FFFFFF",
                borderBottomWidth: 2,
                borderBottomColor: isActive ? "#000000" : "#F9F9F9",
              }}
            >
              {tab.icon && (
                <Ionicons
                  name={tab.icon}
                  size={14}
                  color={isActive ? "#000000" : "#8B8B8B"}
                  style={{ marginRight: 8 }}
                />
              )}
              <Text
                className="font-bold"
                style={{
                  fontSize: 16,
                  lineHeight: 16,
                  color: isActive ? "#000000" : "#8B8B8B",
                }}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* ── Pager View (swipeable) ─────────────────────── */}
      <PagerView
        ref={pagerRef}
        style={{ flex: 1 }}
        initialPage={0}
        onPageSelected={onPageSelected}
        overdrag
      >
        {/* Page 0 - Search */}
        <View key="search" className=" flex-1">
          <EditProfileScreen />
        </View>

        {/* Page 1 - My Matches */}
        <View key="index" className=" flex-1">
          {activeIndex === 1 ? <EditPartnerPreferenceScreen /> : null}
        </View>

        <View key="photos-more" className=" flex-1">
          <EditPhotosMoreScreen />
        </View>
      </PagerView>
    </View>
  );
}
