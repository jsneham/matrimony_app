import PremiumTagSmallCircle from "@/assets/icons/PremiumTagSmallCircle";
import { ViewAllVisitorsCard } from "@/components/matches/ViewAllVisitorsCard";
import { VisitorCard } from "@/components/matches/VisitorCard";
import { PROFILE_VISITORS } from "@/types/matches";
import React from "react";
import { ScrollView, Text, View } from "react-native";

export default function MoreMatchesTab() {
  return (
    <ScrollView
      className="flex-1 bg-app-background"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 56 }}
    >
      {/* ── Profile Visitors ────────────────────────── */}
      <View className="mt-14 mb-2">
        <View className="flex-row items-center gap-2 px-5">
          <Text className="text-2xl font-bold text-black">
            Profile Visitors
          </Text>
          <PremiumTagSmallCircle size={24} />
        </View>
        <Text className="px-5 text-base font-regular text-gray-500 mt-3">
          See who&apos;s interested. Who visited your profile.
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
          className="mt-5"
        >
          {PROFILE_VISITORS.map((visitor, index) => (
            <VisitorCard key={index} {...visitor} />
          ))}
          <ViewAllVisitorsCard />
        </ScrollView>
      </View>
    </ScrollView>
  );
}
