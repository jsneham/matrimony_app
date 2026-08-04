import FiltersTab from "@/components/search/FiltersTab";
import IdSearchTab from "@/components/search/IdSearchTab";
import KeywordSearchTab from "@/components/search/KeywordSearchTab";
import SavedSearchTab from "@/components/search/SavedSearchTab";
import { Ionicons } from "@expo/vector-icons";
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
        className="flex-row items-center px-5"
        style={{ paddingTop: insets.top + 12, paddingBottom: 16 }}
      >
        <Pressable onPress={() => router.back()} hitSlop={10} className="mr-4">
          <Ionicons name="chevron-back" size={24} color="#111827" />
        </Pressable>
        <Text className="text-xl font-bold text-gray-900">Search Matches</Text>
      </View>

      {/* Top tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ height: 58, flexGrow: 0, flexShrink: 0 }}
        className="bg-app-background"
        contentContainerStyle={{ paddingHorizontal: 20, alignItems: "center" }}
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
