import { SectionShell } from "@/components/matches/SectionShell";
import {
    useAllMatches,
    useBlockedMembers,
    useIViewedProfile,
    useRecentlyActive,
    useRecentlyJoined,
    useWhoViewedContact,
    useWhoViewedProfile,
} from "@/hooks/useMatchesSections";
import { router } from "expo-router";
import React from "react";
import { ScrollView, Text, View } from "react-native";

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
        wrapperClass="mb-2 bg-[#f3f3f3]"
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

      <View className="mx-5 mt-14 p-5 rounded-2xl border border-dashed border-gray-400 bg-white">
        <SectionShell
          title="No Data Sample - Blocked"
          description={
            <>
              <Text className="text-base font-regular text-gray-500 mt-3">
                Members blocked by you will appear here.
              </Text>
              <Text className="text-base font-regular text-gray-500 mt-10">
                {`You have not blocked any member.\nWhen you block a member, they will not know that you have blocked them.`}
              </Text>
            </>
          }
          wrapperClass=""
          titleClassName="px-0"
          isLoading={false}
          items={firstPageItems(blockedMembers.data)}
          cardSize="small"
          hideViewAll
          onViewAll={() =>
            router.push({
              pathname: "/matches/list/[type]",
              params: { type: "blocked-members" },
            })
          }
        />
      </View>
    </ScrollView>
  );
}
