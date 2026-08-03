import Help from "@/components/Help";
import { SectionShell } from "@/components/matches/SectionShell";
import MeetMatchmakers from "@/components/MeetMatchmakers";
import { MembershipBanner } from "@/components/MembershipBanner";
import { NoData } from "@/components/NoData";
import { ProfileCard } from "@/components/ProfileCard";
import ProfileVisitors from "@/components/ProfileVisitors";
import SuccessStories from "@/components/SuccessStories";
import "@/global.css";
import {
  useRecentlyActive,
  useRecentlyJoined,
} from "@/hooks/useMatchesSections";
import { useMyProfile } from "@/hooks/useProfile";
import { useSession } from "@/hooks/useSession";
import { SESSION_KEYS } from "@/types/common";
import { router } from "expo-router";

import React from "react";
import { ScrollView, View } from "react-native";

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
  const recentlyJoined = useRecentlyJoined();
  const recentlyActive = useRecentlyActive();

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
        <SectionShell
          title="Recently Joined"
          description="See members who registered recently."
          isPremiumSection
          isLoading={recentlyJoined.isLoading}
          items={recentlyJoined.data?.data ?? []}
          cardSize="large"
          onViewAll={() =>
            router.push({
              pathname: "/matches/list/[type]",
              params: { type: "recently-joined" },
            })
          }
        />

        {/* ── Recently Logged In ──────────────────────── */}
        <SectionShell
          title="Recently Active"
          description="View Members that were recently active."
          isPremiumSection
          isLoading={recentlyActive.isLoading}
          items={recentlyActive.data?.data ?? []}
          cardSize="large"
          onViewAll={() =>
            router.push({
              pathname: "/matches/list/[type]",
              params: { type: "recently-active" },
            })
          }
        />

        {/* ── Profile Visitors ────────────────────────── */}
        <ProfileVisitors />

        {/* ── WhatsApp Help ───────────────────────────── */}
        <Help />
      </ScrollView>
    </View>
  );
}
