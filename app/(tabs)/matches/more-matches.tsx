import PremiumTagSmallCircle from "@/assets/icons/PremiumTagSmallCircle";
import { ViewAllVisitorsCard } from "@/components/matches/ViewAllVisitorsCard";
import { VisitorCard } from "@/components/matches/VisitorCard";
import {
  useAllMatches,
  useBlockedMembers,
  useIViewedProfile,
  useRecentlyActive,
  useRecentlyJoined,
  useWhoViewedContact,
  useWhoViewedProfile,
} from "@/hooks/useMatchesSections";
import { mapVisitorItem } from "@/utils/mapVisitorItem";
import { router } from "expo-router";
import React from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";

// ── Shared row shell ───────────────────────────────────────────────────────
type SectionShellProps = {
  title: string;
  description: string;
  isPremiumSection?: boolean;
  wrapperClass?: string;
  isLoading: boolean;
  items: any[];
  cardSize: "large" | "small";
  onViewAll: () => void;
};

const SectionShell = ({
  title,
  description,
  isPremiumSection,
  wrapperClass = "mt-14 mb-2",
  isLoading,
  items,
  cardSize,
  onViewAll,
}: SectionShellProps) => {
  const safeItems = (items ?? []).slice(0, 5); // only show first 5 in the preview row

  return (
    <View className={wrapperClass}>
      <View className="flex-row items-center gap-2 px-5">
        <Text className="text-2xl font-bold text-black">{title}</Text>
        {isPremiumSection && <PremiumTagSmallCircle size={24} />}
      </View>
      <Text className="px-5 text-base font-regular text-gray-500 mt-3">
        {description}
      </Text>

      {isLoading ? (
        <View className="h-[225px] items-center justify-center">
          <ActivityIndicator color="#db2777" />
        </View>
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
          className="mt-5"
        >
          {safeItems.map((item, index) => (
            <VisitorCard
              key={`${item.matri_id ?? "item"}-${index}`}
              {...mapVisitorItem(item, cardSize)}
            />
          ))}
          <ViewAllVisitorsCard size={cardSize} onPress={onViewAll} />
        </ScrollView>
      )}
    </View>
  );
};

// ── Screen ──────────────────────────────────────────────────────────────────

export default function MoreMatchesTab() {
  // Simple (non-paginated)
  const recentlyJoined = useRecentlyJoined();
  const recentlyActive = useRecentlyActive();

  // Paginated — only need first page's items for the preview row
  const profileVisitors = useWhoViewedProfile();
  const viewedYourContact = useWhoViewedContact();
  const visitedByYou = useIViewedProfile();
  const contactViewed = useWhoViewedContact();
  // const matchmakerMatches = useMatchmakerMatches();
  const allMatches = useAllMatches();
  // const membersLookingForYou = useMembersLookingForYou();
  const blockedMembers = useBlockedMembers();

  const firstPageItems = (data: any) => data?.pages?.[0]?.data ?? [];

  return (
    <ScrollView
      className="flex-1 bg-app-background"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 150 }}
    >
      <SectionShell
        title="Profile Visitors"
        description="See who's interested. Who visited your profile."
        isPremiumSection
        isLoading={profileVisitors.isLoading}
        items={firstPageItems(profileVisitors.data)}
        cardSize="large"
        onViewAll={() =>
          router.push({
            pathname: "/matches/list/[type]",
            params: { type: "profile-visitors" },
          })
        }
      />

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

      <SectionShell
        title="Viewed your Contact"
        description="Members who viewed your contact details."
        isLoading={viewedYourContact.isLoading}
        items={firstPageItems(viewedYourContact.data)}
        cardSize="large"
        onViewAll={() =>
          router.push({
            pathname: "/matches/list/[type]",
            params: { type: "viewed-your-contact" },
          })
        }
      />

      {/* <SectionShell
        title="Matches from Matchmakers"
        description="View Matches that are registered & Personally Verified by Human Matchmakers."
        wrapperClass="mb-2 bg-[#f3f3f3] pt-14 pb-5"
        isLoading={matchmakerMatches.isLoading}
        items={firstPageItems(matchmakerMatches.data)}
        cardSize="large"
        onViewAll={() =>
          router.push({
            pathname: "/matches/list/[type]",
            params: { type: "matchmaker-matches" },
          })
        }
      /> */}

      <SectionShell
        title="All Matches"
        description="View All Matches, outside your preferences too!"
        isLoading={allMatches.isLoading}
        items={firstPageItems(allMatches.data)}
        cardSize="large"
        onViewAll={() =>
          router.push({
            pathname: "/matches/list/[type]",
            params: { type: "all-matches" },
          })
        }
      />

      {/* <SectionShell
        title="Members looking for you"
        description="View members that are looking for members like you. Your profile matches their expectations"
        isLoading={membersLookingForYou.isLoading}
        items={firstPageItems(membersLookingForYou.data)}
        cardSize="large"
        onViewAll={() =>
          router.push({
            pathname: "/matches/list/[type]",
            params: { type: "members-looking-for-you" },
          })
        }
      /> */}

      <SectionShell
        title="Visited by you"
        description="Members that you visited. Want to revisit?"
        isLoading={visitedByYou.isLoading}
        items={firstPageItems(visitedByYou.data)}
        cardSize="small"
        onViewAll={() =>
          router.push({
            pathname: "/matches/list/[type]",
            params: { type: "visited-by-you" },
          })
        }
      />

      <SectionShell
        title="Contact Viewed"
        description="Members whose contact you already viewed."
        isLoading={contactViewed.isLoading}
        items={firstPageItems(contactViewed.data)}
        cardSize="small"
        onViewAll={() =>
          router.push({
            pathname: "/matches/list/[type]",
            params: { type: "contact-viewed" },
          })
        }
      />

      <SectionShell
        title="Blocked members"
        description="Members that you have blocked"
        isLoading={blockedMembers.isLoading}
        items={firstPageItems(blockedMembers.data)}
        cardSize="small"
        onViewAll={() =>
          router.push({
            pathname: "/matches/list/[type]",
            params: { type: "blocked-members" },
          })
        }
      />
    </ScrollView>
  );
}
