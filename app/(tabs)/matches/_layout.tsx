import React, { useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import PagerView from "react-native-pager-view";

import SearchIcon from "@/assets/icons/SearchIcon";
import { TABS } from "@/constants/data";
import MyMatchesTab from "./index";
import MoreMatchesTab from "./more-matches";
import SearchTab from "./search";

export default function MatchesLayout() {
  const [activeIndex, setActiveIndex] = useState(1);
  const pagerRef = useRef<PagerView>(null);

  const handleTabPress = (index: number) => {
    pagerRef.current?.setPage(index);
    setActiveIndex(index);
  };

  const onPageSelected = (e: any) => {
    setActiveIndex(e.nativeEvent.position);
  };

  return (
    <View className="flex-1 bg-white">
      {/* ── Top Tab Bar ───────────────────────────────── */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        {TABS.map((tab, index) => {
          const isActive = activeIndex === index;
          return (
            <TouchableOpacity
              key={tab.key}
              onPress={() => handleTabPress(index)}
              activeOpacity={0.7}
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "flex-start",
                paddingVertical: 14,
                paddingHorizontal: 20,
                backgroundColor: "#FFFFFF",
                borderBottomWidth: 2,
                borderBottomColor: isActive ? "#000000" : "#F9F9F9",
              }}
            >
              {tab.icon && (
                <View style={{ marginRight: 8 }}>
                  <SearchIcon
                    size={14}
                    color={isActive ? "#000000" : "#8B8B8B"}
                  />
                </View>
              )}
              <Text
                className="font-bold"
                style={{
                  fontSize: 16,
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
