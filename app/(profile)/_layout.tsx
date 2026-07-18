import { Ionicons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import PagerView from "react-native-pager-view";

import { PROFILE_TABS } from "@/constants/data";
import EditProfileScreen from ".";
import EditPhotosMoreScreen from "./EditPhotosMoreScreen";
import EditPartnerPreferenceScreen from "./partner-preference";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function MatchesLayout() {
  const [activeIndex, setActiveIndex] = useState(0);
  const pagerRef = useRef<PagerView>(null);
  const indicatorAnim = useRef(new Animated.Value(0)).current;

  const handleTabPress = (index: number) => {
    pagerRef.current?.setPage(index);
    setActiveIndex(index);
    animateIndicator(index);
  };

  const animateIndicator = (index: number) => {
    Animated.spring(indicatorAnim, {
      toValue: index,
      useNativeDriver: true,
      tension: 60,
      friction: 10,
    }).start();
  };

  const onPageSelected = (e: any) => {
    const index = e.nativeEvent.position;
    setActiveIndex(index);
    animateIndicator(index);
  };

  const tabWidth = SCREEN_WIDTH / PROFILE_TABS.length;

  const indicatorTranslateX = indicatorAnim.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, tabWidth, tabWidth * 2],
  });

  return (
    <View className="flex-1 bg-white">
      {/* ── Top Tab Bar ───────────────────────────────── */}
      <View className="bg-white">
        <View className="flex-row h-11 border-b border-inactive-border">
          {PROFILE_TABS.map((tab, index) => {
            const isActive = activeIndex === index;
            return (
              <TouchableOpacity
                key={tab.key}
                onPress={() => handleTabPress(index)}
                style={{ width: tabWidth }}
                className="flex-1 items-center justify-center "
                activeOpacity={0.7}
              >
                <View className="flex-row items-center">
                  {tab.icon && (
                    <Ionicons
                      name={tab.icon}
                      size={14}
                      color={
                        isActive
                          ? "text-tab-text-active"
                          : "text-tab-text-inactive"
                      }
                    />
                  )}
                  <Text
                    className={`text-[16px] ${
                      isActive
                        ? "font-bold text-tab-text-active"
                        : "font-bold text-tab-text-inactive"
                    }`}
                  >
                    {tab.label}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Animated Indicator */}
        <Animated.View
          style={{
            width: tabWidth,
            transform: [{ translateX: indicatorTranslateX }],
          }}
          className="absolute bottom-0 h-[2px] w-24 bg-black rounded-full"
        />
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
