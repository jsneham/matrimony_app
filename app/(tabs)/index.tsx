import Help from "@/components/Help";
import MeetMatchmakers from "@/components/MeetMatchmakers";
import { MemberCard } from "@/components/MemberCard";
import { MembershipBanner } from "@/components/MembershipBanner";
import { NoData } from "@/components/NoData";
import { ProfileCard } from "@/components/ProfileCard";
import ProfileVisitors from "@/components/ProfileVisitors";
import { SectionHeader } from "@/components/SectionHeader";
import SuccessStories from "@/components/SuccessStories";
import "@/global.css";
import { useMyProfile } from "@/hooks/useProfile";
import { useSession } from "@/hooks/useSession";
import { SESSION_KEYS } from "@/types/common";
import { NEWLY_JOINED, RECENTLY_LOGGED_IN } from "@/types/home";

import React from "react";
import { ScrollView, Text, View } from "react-native";

export default function home() {
  const { data } = useSession([SESSION_KEYS.USER_ID]);

  const memberId = data?.[SESSION_KEYS.USER_ID] ?? "";

  // Queries - only runs when session is loaded and has values
  const {
    data: profileData,
    isLoading: isMatchesLoading,
    isError,
  } = useMyProfile({
    memberId,
  });

  if (isMatchesLoading || isError) {
    return (
      <View
        className="bg-white items-center justify-center"
        style={{ height: 320 }}
      >
        <NoData />
      </View>
    );
  }

  const userData = profileData?.data;

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView
        className="flex-1 mb-20"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        {/* ── Profile Card ─────────────────────────────── */}
        <ProfileCard userData={userData ?? undefined} />

        {/* ── Membership Banner ───────────────────────── */}
        <MembershipBanner userData={userData ?? undefined} />

        {/* ── Success Stories ─────────────────────────── */}
        <SuccessStories />

        {/* ── Meet Matchmakers ────────────────────────── */}
        <MeetMatchmakers />

        {/* ── Newly Joined ────────────────────────────── */}
        <View className="mt-14 mb-2">
          <SectionHeader title="Newly Joined" />
          <Text className="px-5 text-base font-regular text-gray-500">
            See members who registered recently.
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20 }}
            className="mt-5"
          >
            {NEWLY_JOINED.map((member, index) => (
              <MemberCard key={index} {...member} />
            ))}
          </ScrollView>
        </View>

        {/* ── Recently Logged In ──────────────────────── */}
        <View className="mt-14 mb-2">
          <SectionHeader title="Recently Logged In" />
          <Text className="px-5 text-base font-regular text-gray-500">
            View Members that were recently active.
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20 }}
            className="mt-5"
          >
            {RECENTLY_LOGGED_IN.map((member, index) => (
              <MemberCard key={index} {...member} />
            ))}
          </ScrollView>
        </View>

        {/* ── Profile Visitors ────────────────────────── */}
        <ProfileVisitors />

        {/* ── WhatsApp Help ───────────────────────────── */}
        <Help />
      </ScrollView>
    </View>
  );
}
