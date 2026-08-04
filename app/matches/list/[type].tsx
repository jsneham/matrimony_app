import { VisitorCard } from "@/components/matches/VisitorCard";
import {
  useAllMatches,
  useBlockedMembers,
  useIViewedProfile,
  useMatchmakerMatches,
  useMembersLookingForYou,
  useRecentlyActive,
  useRecentlyJoined,
  useWhoViewedContact,
  useWhoViewedProfile,
} from "@/hooks/useMatchesSections";
import { useSession } from "@/hooks/useSession";
import { SESSION_KEYS } from "@/types/common";
import { mapVisitorItem } from "@/utils/mapVisitorItem";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useMemo } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Static info per section — title/description/card size.
// Data fetching itself is handled by dedicated hooks below (each
// section's endpoint has a different shape, so no single generic hook).
const SECTION_META: Record<
  string,
  { title: string; description: string; cardSize: "large" | "small" }
> = {
  "profile-visitors": {
    title: "Profile Visitors",
    description: "See who's interested. Who visited your profile.",
    cardSize: "large",
  },
  "recently-joined": {
    title: "Recently Joined",
    description: "See members who registered recently.",
    cardSize: "large",
  },
  "recently-active": {
    title: "Recently Active",
    description: "View Members that were recently active.",
    cardSize: "large",
  },
  "viewed-your-contact": {
    title: "Viewed your Contact",
    description: "Members who viewed your contact details.",
    cardSize: "large",
  },
  "matchmaker-matches": {
    title: "Matches from Matchmakers",
    description:
      "View Matches that are registered & Personally Verified by Human Matchmakers.",
    cardSize: "large",
  },
  "all-matches": {
    title: "All Matches",
    description: "View All Matches, outside your preferences too!",
    cardSize: "large",
  },
  "members-looking-for-you": {
    title: "Members looking for you",
    description:
      "View members that are looking for members like you. Your profile matches their expectations",
    cardSize: "large",
  },
  "visited-by-you": {
    title: "Visited by you",
    description: "Members that you visited. Want to revisit?",
    cardSize: "small",
  },
  "contact-viewed": {
    title: "Contact Viewed",
    description: "Members whose contact you already viewed.",
    cardSize: "small",
  },
  "blocked-members": {
    title: "Blocked members",
    description: "Members that you have blocked",
    cardSize: "small",
  },
};

const MatchListScreen = () => {
  const insets = useSafeAreaInsets();
  const { data: sessionData } = useSession([SESSION_KEYS.PLAN_STATUS]);
  const planStatus = sessionData?.[SESSION_KEYS.PLAN_STATUS] ?? "";
  const { type } = useLocalSearchParams<{ type: string }>();
  const meta = type ? SECTION_META[type] : undefined;

  // Call every hook unconditionally (Rules of Hooks) — only the one
  // matching `type` actually gets used below.
  const profileVisitors = useWhoViewedProfile();
  const recentlyJoined = useRecentlyJoined();
  const recentlyActive = useRecentlyActive();
  const viewedYourContact = useWhoViewedContact();
  const matchmakerMatches = useMatchmakerMatches();
  const allMatches = useAllMatches();
  const membersLookingForYou = useMembersLookingForYou();
  const visitedByYou = useIViewedProfile();
  const contactViewed = useWhoViewedContact(); // ⚠️ same as viewedYourContact — see note in more-matches.tsx
  const blockedMembers = useBlockedMembers();

  // Pick the active query result based on the route param
  const active = useMemo(() => {
    switch (type) {
      case "profile-visitors":
        return { query: profileVisitors, paginated: true as const };
      case "recently-joined":
        return { query: recentlyJoined, paginated: false as const };
      case "recently-active":
        return { query: recentlyActive, paginated: false as const };
      case "viewed-your-contact":
        return { query: viewedYourContact, paginated: true as const };
      case "matchmaker-matches":
        return { query: matchmakerMatches, paginated: true as const };
      case "all-matches":
        return { query: allMatches, paginated: true as const };
      case "members-looking-for-you":
        return { query: membersLookingForYou, paginated: true as const };
      case "visited-by-you":
        return { query: visitedByYou, paginated: true as const };
      case "contact-viewed":
        return { query: contactViewed, paginated: true as const };
      case "blocked-members":
        return { query: blockedMembers, paginated: true as const };
      default:
        return null;
    }
  }, [
    type,
    profileVisitors,
    recentlyJoined,
    recentlyActive,
    viewedYourContact,
    matchmakerMatches,
    allMatches,
    membersLookingForYou,
    visitedByYou,
    contactViewed,
    blockedMembers,
  ]);

  const items = useMemo(() => {
    if (!active) return [];
    if (active.paginated) {
      const infiniteData = active.query.data as
        | { pages: { data: any[] }[] }
        | undefined;
      return infiniteData?.pages.flatMap((p) => p.data) ?? [];
    }
    const simpleData = active.query.data as { data: any[] } | undefined;
    return simpleData?.data ?? [];
  }, [active]);

  if (!meta || !active) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-gray-500">Section not found.</Text>
      </View>
    );
  }

  const { isLoading } = active.query;
  const isFetchingNextPage = active.paginated
    ? (active.query as any).isFetchingNextPage
    : false;
  const hasNextPage = active.paginated
    ? (active.query as any).hasNextPage
    : false;
  const fetchNextPage = active.paginated
    ? (active.query as any).fetchNextPage
    : () => {};

  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      <View className="flex-row items-center px-5 py-4">
        <Pressable
          onPress={() => router.back()}
          className="w-9 h-9 rounded-full bg-gray-200 items-center justify-center"
        >
          <Ionicons name="chevron-back" size={20} color="#374151" />
        </Pressable>
        <Text className="text-2xl font-bold text-gray-900 ml-4">
          {meta.title}
        </Text>
      </View>

      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#db2777" />
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item, index) => item.matri_id ?? String(index)}
          numColumns={2}
          columnWrapperStyle={{ gap: 12, paddingHorizontal: 20 }}
          contentContainerStyle={{ gap: 12, paddingBottom: 40 }}
          onEndReached={() => hasNextPage && fetchNextPage()}
          onEndReachedThreshold={0.5}
          renderItem={({ item }) => (
            <VisitorCard {...mapVisitorItem(item, meta.cardSize, planStatus)} />
          )}
          ListFooterComponent={
            isFetchingNextPage ? (
              <ActivityIndicator className="py-4" color="#db2777" />
            ) : null
          }
          ListEmptyComponent={
            <View className="items-center justify-center mt-24">
              <Text className="text-gray-400">No members to show yet.</Text>
            </View>
          }
        />
      )}
    </View>
  );
};

export default MatchListScreen;
