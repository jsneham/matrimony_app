import PremiumTagSmallCircle from "@/assets/icons/PremiumTagSmallCircle";
import { ViewAllVisitorsCard } from "@/components/matches/ViewAllVisitorsCard";
import { VisitorCard } from "@/components/matches/VisitorCard";
import {
  ALL_MATCHES,
  BLOCKED_MEMBERS,
  CONTACT_VIEWED,
  MATCHMAKER_MATCHES,
  MEMBERS_LOOKING_FOR_YOU,
  PROFILE_VISITORS,
  RECENTLY_ACTIVE_MATCHES,
  RECENTLY_JOINED_MATCHES,
  VIEWED_YOUR_CONTACT,
  VISITED_BY_YOU,
} from "@/types/matches";
import React from "react";
import { ScrollView, Text, View } from "react-native";

export default function MoreMatchesTab() {
  return (
    <ScrollView
      className="flex-1 bg-app-background"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 150 }}
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

      {/* ── Recently Joined ─────────────────────────── */}
      <View className="mt-14 mb-2">
        <View className="flex-row items-center gap-2 px-5">
          <Text className="text-2xl font-bold text-black">
            Recently Joined
          </Text>
          <PremiumTagSmallCircle size={24} />
        </View>
        <Text className="px-5 text-base font-regular text-gray-500 mt-3">
          See members who registered recently.
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
          className="mt-5"
        >
          {RECENTLY_JOINED_MATCHES.map((visitor, index) => (
            <VisitorCard key={index} {...visitor} />
          ))}
          <ViewAllVisitorsCard />
        </ScrollView>
      </View>

      {/* ── Recently Active ──────────────────────────── */}
      <View className="mt-14 mb-2">
        <View className="flex-row items-center gap-2 px-5">
          <Text className="text-2xl font-bold text-black">
            Recently Active
          </Text>
          <PremiumTagSmallCircle size={24} />
        </View>
        <Text className="px-5 text-base font-regular text-gray-500 mt-3">
          View Members that were recently active.
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
          className="mt-5"
        >
          {RECENTLY_ACTIVE_MATCHES.map((visitor, index) => (
            <VisitorCard key={index} {...visitor} />
          ))}
          <ViewAllVisitorsCard />
        </ScrollView>
      </View>

      {/* ── Viewed your Contact ──────────────────────── */}
      <View className="mt-14 mb-5">
        <Text className="px-5 text-2xl font-bold text-black">
          Viewed your Contact
        </Text>
        <Text className="px-5 text-base font-regular text-gray-500 mt-3">
          Members who viewed your contact details.
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
          className="mt-5"
        >
          {VIEWED_YOUR_CONTACT.map((visitor, index) => (
            <VisitorCard key={index} {...visitor} />
          ))}
          <ViewAllVisitorsCard />
        </ScrollView>
      </View>

      {/* ── Matches from Matchmakers ─────────────────── */}
      <View className="mb-2 bg-[#f3f3f3] pt-14 pb-5">
        <Text className="px-5 text-2xl font-bold text-black">
          Matches from Matchmakers
        </Text>
        <Text className="px-5 text-base font-regular text-gray-500 mt-3">
          View Matches that are registered &amp; Personally Verified by Human
          Matchmakers.
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
          className="mt-4"
        >
          {MATCHMAKER_MATCHES.map((visitor, index) => (
            <VisitorCard key={index} {...visitor} />
          ))}
          <ViewAllVisitorsCard />
        </ScrollView>
      </View>

      {/* ── All Matches ──────────────────────────────── */}
      <View className="mt-14 mb-2">
        <Text className="px-5 text-2xl font-bold text-black">
          All Matches
        </Text>
        <Text className="px-5 text-base font-regular text-gray-500 mt-3">
          View All Matches, outside your preferences too!
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
          className="mt-5"
        >
          {ALL_MATCHES.map((visitor, index) => (
            <VisitorCard key={index} {...visitor} />
          ))}
          <ViewAllVisitorsCard />
        </ScrollView>
      </View>

      {/* ── Members looking for you ──────────────────── */}
      <View className="mt-14 mb-2">
        <Text className="px-5 text-2xl font-bold text-black">
          Members looking for you
        </Text>
        <Text className="px-5 text-base font-regular text-gray-500 mt-3">
          View members that are looking for members like you. Your profile
          matches their expectations
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
          className="mt-5"
        >
          {MEMBERS_LOOKING_FOR_YOU.map((visitor, index) => (
            <VisitorCard key={index} {...visitor} />
          ))}
          <ViewAllVisitorsCard />
        </ScrollView>
      </View>

      {/* ── Visited by you ───────────────────────────── */}
      <View className="mt-14 mb-2">
        <Text className="px-5 text-2xl font-bold text-black">
          Visited by you
        </Text>
        <Text className="px-5 text-base font-regular text-gray-500 mt-3">
          Members that you visited. Want to revisit?
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
          className="mt-5"
        >
          {VISITED_BY_YOU.map((visitor, index) => (
            <VisitorCard key={index} {...visitor} size="small" />
          ))}
          <ViewAllVisitorsCard size="small" />
        </ScrollView>
      </View>

      {/* ── Contact Viewed ───────────────────────────── */}
      <View className="mt-14 mb-2">
        <Text className="px-5 text-2xl font-bold text-black">
          Contact Viewed
        </Text>
        <Text className="px-5 text-base font-regular text-gray-500 mt-3">
          Members whose contact you already viewed.
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
          className="mt-5"
        >
          {CONTACT_VIEWED.map((visitor, index) => (
            <VisitorCard key={index} {...visitor} size="small" />
          ))}
          <ViewAllVisitorsCard size="small" />
        </ScrollView>
      </View>

      {/* ── Blocked members ──────────────────────────── */}
      <View className="mt-14 mb-2">
        <Text className="px-5 text-2xl font-bold text-black">
          Blocked members
        </Text>
        <Text className="px-5 text-base font-regular text-gray-500 mt-3">
          Members that you have blocked
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
          className="mt-5"
        >
          {BLOCKED_MEMBERS.map((visitor, index) => (
            <VisitorCard key={index} {...visitor} size="small" />
          ))}
          <ViewAllVisitorsCard size="small" />
        </ScrollView>
      </View>

      {/* ── No Data Sample - Blocked ─────────────────── */}
      <View className="mx-5 mt-14 p-5 rounded-2xl border border-dashed border-gray-400 bg-white">
        <Text className="text-2xl font-bold text-black">
          No Data Sample - Blocked
        </Text>
        <Text className="text-base font-regular text-gray-500 mt-3">
          Members blocked by you will appear here.
        </Text>
        <Text className="text-base font-regular text-gray-500 mt-10">
          {`You have not blocked any member.\nWhen you block a member, they will not know that you have blocked them.`}
        </Text>
      </View>
    </ScrollView>
  );
}
