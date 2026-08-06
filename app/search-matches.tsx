import ChevronLeftIcon from "@/assets/icons/ChevronLeftIcon";
import FiltersTab from "@/components/search/FiltersTab";
import IdSearchTab from "@/components/search/IdSearchTab";
import KeywordSearchTab from "@/components/search/KeywordSearchTab";
import SavedSearchTab from "@/components/search/SavedSearchTab";
import { router } from "expo-router";
import React, { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const TOP_TABS = ["Filters", "ID", "Keyword", "Saved Search"] as const;
type TopTab = (typeof TOP_TABS)[number];

export default function SearchMatchesScreen() {
  const insets = useSafeAreaInsets();
  const [activeTopTab, setActiveTopTab] = useState<TopTab>("Filters");

  const renderTabContent = () => {
    switch (activeTopTab) {
      case "Filters":
        return <FiltersTab />;
      case "ID":
        return <IdSearchTab />;
      case "Keyword":
        return <KeywordSearchTab />;
      case "Saved Search":
        return <SavedSearchTab />;
    }
  };

  return (
    <View style={{ flex: 1 }} className="bg-app-background">
      {/* Header */}
      <View
        className="bg-white flex-row items-center"
        style={{ paddingTop: insets.top }}
      >
        <Pressable
          onPress={() => router.back()}
          hitSlop={10}
          style={{
            width: 44,
            height: 49,
            justifyContent: "center",
            paddingLeft: 20,
          }}
        >
          <ChevronLeftIcon size={24} color="black" />
        </Pressable>
        <Text
          className="flex-1 text-center text-lg font-bold text-black"
          style={{ marginRight: 44 }}
        >
          Search Matches
        </Text>
      </View>

      {/* Top tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ height: 58, flexGrow: 0, flexShrink: 0 }}
        className="bg-app-background"
        contentContainerStyle={{
          paddingHorizontal: 20,
          alignItems: "center",
          flexGrow: 1,
          justifyContent: "center",
        }}
      >
        <View className="flex-row gap-[10px]">
          {TOP_TABS.map((tab) => {
            const isActive = tab === activeTopTab;
            return (
              <Pressable
                key={tab}
                onPress={() => setActiveTopTab(tab)}
                className={`h-[34px] px-4 items-center justify-center rounded-full ${
                  isActive ? "bg-black" : "bg-white"
                }`}
              >
                <Text
                  className={`text-sm font-medium ${
                    isActive ? "text-white" : "text-gray"
                  }`}
                >
                  {tab}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      {/* Active tab content */}
      {renderTabContent()}
    </View>
  );
}
