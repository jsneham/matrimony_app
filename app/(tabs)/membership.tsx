import CurrentPlanCard from "@/components/CurrentPlanCard";
import { Href, router } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function membership() {
  const insets = useSafeAreaInsets();

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
        className="absolute bottom-0 left-0 right-0 px-4 pt-3"
        style={{
          backgroundColor: "#f3f4f6",
          paddingBottom: insets.bottom + 12,
        }}
      >
        <TouchableOpacity
          className="items-center justify-center rounded-xl py-4"
          style={{ backgroundColor: "#0f7c8a" }}
          activeOpacity={0.85}
          onPress={() => {
            router.push("/(membership)" as Href);
          }}
        >
          <Text className="text-base font-bold tracking-wide text-white">
            View Plans &amp; Upgrade Plan
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
