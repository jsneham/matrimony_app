import Help from "@/components/Help";
import MeetMatchmakers from "@/components/MeetMatchmakers";
import { MemberCard } from "@/components/MemberCard";
import { MembershipBanner } from "@/components/MembershipBanner";
import ProfileVisitors from "@/components/ProfileVisitors";
import { SectionHeader } from "@/components/SectionHeader";
import SuccessStories from "@/components/SuccessStories";
import { ProfileCard } from "@/components/ui/ProfileCard";
import "@/global.css";
import { NEWLY_JOINED, RECENTLY_LOGGED_IN } from "@/types/home";

import React from "react";
import { ScrollView, StatusBar, View } from "react-native";

export default function home() {
  return (
    <View className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <ScrollView
        className="flex-1 mb-20"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        {/* ── Profile Card ─────────────────────────────── */}
        <ProfileCard />

        {/* ── Membership Banner ───────────────────────── */}
        <MembershipBanner />

        {/* ── Success Stories ─────────────────────────── */}
        <SuccessStories />

        {/* ── Meet Matchmakers ────────────────────────── */}
        <MeetMatchmakers />

        {/* ── Newly Joined ────────────────────────────── */}
        <View className="mt-6 mb-2">
          <SectionHeader title="Newly Joined" />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16 }}
          >
            {NEWLY_JOINED.map((member, index) => (
              <MemberCard key={index} {...member} />
            ))}
          </ScrollView>
        </View>

        {/* ── Recently Logged In ──────────────────────── */}
        <View className="mt-6 mb-2">
          <SectionHeader title="Recently Logged In" />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16 }}
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
