import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import PagerView from "react-native-pager-view";

import SearchFortabIcon from "@/assets/icons/search_fortab";
import { TABS } from "@/constants/data";
import MyMatchesTab from "./index";
import MoreMatchesTab from "./more-matches";
import SearchTab from "./search";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function MatchesLayout() {
  const [activeIndex, setActiveIndex] = useState(1);
  const pagerRef = useRef<PagerView>(null);
  const indicatorAnim = useRef(new Animated.Value(1)).current;

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

  const tabWidth = SCREEN_WIDTH / TABS.length;

  const indicatorTranslateX = indicatorAnim.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, tabWidth, tabWidth * 2],
  });

  return (
    <View className="flex-1 bg-white">
      {/* ── Top Tab Bar ───────────────────────────────── */}
      <View className="bg-white">
        <View className="flex-row h-11 border-b border-inactive-border">
          {TABS.map((tab, index) => {
            const isActive = activeIndex === index;
            return (
              <TouchableOpacity
                key={tab.key}
                onPress={() => handleTabPress(index)}
                style={{ width: tabWidth }}
                className="flex-1 items-center justify-center "
                activeOpacity={0.7}
              >
                <View className="flex-row items-center gap-[6px]">
                  {tab.key === "search" && (
                    <SearchFortabIcon
                      size={16}
                      color={isActive ? "#000000" : "#8B8B8B"}
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
        initialPage={1}
        onPageSelected={onPageSelected}
        overdrag
      >
        {/* Page 0 - Search */}
        <View key="search" className=" flex-1">
          <SearchTab />
        </View>

        {/* Page 1 - My Matches */}
        <View key="index" className=" flex-1">
          <MyMatchesTab />
        </View>

        {/* Page 2 - More Matches */}
        <View key="more-matches" className=" flex-1">
          <MoreMatchesTab />
        </View>
      </PagerView>
    </View>
  );
}
