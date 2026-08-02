import CurrentPlanCard from "@/components/CurrentPlanCard";
import { Href, router } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function membership() {
  return (
    <View className="flex-1 bg-gray-100">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
      >
        {/* ── Plan Card ────────────────────────────────── */}
        <CurrentPlanCard />
      </ScrollView>

      {/* ── Sticky Bottom Button ─────────────────────── */}
      <View
        className="absolute bottom-0 left-0 right-0 px-4 pb-8 pt-3 mb-12"
        style={{ backgroundColor: "#f3f4f6" }}
      >
        <TouchableOpacity
          className="rounded-xl py-4 items-center justify-center"
          style={{ backgroundColor: "#0f7c8a" }}
          activeOpacity={0.85}
          onPress={() => {
            router.push("/(membership)" as Href);
          }}
        >
          <Text className="text-white text-base font-bold tracking-wide">
            View Plans &amp; Upgrade Plan
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
