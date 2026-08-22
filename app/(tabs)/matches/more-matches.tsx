import { SectionWithEmptyState } from "@/components/matches/SectionWithEmptyState";
import {
  useAllMatches,
  useBlockedMembers,
  useIViewedProfile,
  // useMatchmakerMatches,
  // useMembersLookingForYou,
  useRecentlyActive,
  useRecentlyJoined,
  useWhoViewedContact,
  useWhoViewedProfile,
} from "@/hooks/useMatchesSections";
import { router } from "expo-router";
import React from "react";
import { ScrollView } from "react-native";

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
      <SectionWithEmptyState
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
        emptyDescriptionLine1="See who's interested. Who visited your profile."
        emptyDescriptionLine2={`No one has visited your profile yet.\nComplete your profile to attract more visitors.`}
      />

      <SectionWithEmptyState
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
        emptyDescriptionLine1="See members who registered recently."
        emptyDescriptionLine2={`No new members have joined recently.\nCheck back soon for fresh matches.`}
      />

      <SectionWithEmptyState
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
        emptyDescriptionLine1="View Members that were recently active."
        emptyDescriptionLine2={`No members were recently active.\nCheck back soon for updates.`}
      />

      <SectionWithEmptyState
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
        emptyDescriptionLine1="Members who viewed your contact details."
        emptyDescriptionLine2={`No one has viewed your contact details yet.`}
      />

      {/* Matches from Matchmakers — uncomment once useMatchmakerMatches has a
          confirmed real endpoint (currently 404s, see conversation history) */}
      {/* <SectionWithEmptyState
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
        emptyDescriptionLine1="View Matches that are registered & Personally Verified by Human Matchmakers."
        emptyDescriptionLine2={`No matchmaker-verified matches yet.\nOur team is working on finding great matches for you.`}
      /> */}

      <SectionWithEmptyState
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
        emptyDescriptionLine1="View All Matches, outside your preferences too!"
        emptyDescriptionLine2={`No matches found right now.\nTry adjusting your search filters.`}
      />

      {/* Members looking for you — uncomment once useMembersLookingForYou has a
          confirmed real endpoint (currently 404s, see conversation history) */}
      {/* <SectionWithEmptyState
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
        emptyDescriptionLine1="View members that are looking for members like you. Your profile matches their expectations"
        emptyDescriptionLine2={`No members are looking for someone like you yet.\nCheck back soon.`}
      /> */}

      <SectionWithEmptyState
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
        emptyDescriptionLine1="Members that you visited. Want to revisit?"
        emptyDescriptionLine2={`You haven't visited any profiles yet.`}
      />

      <SectionWithEmptyState
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
        emptyDescriptionLine1="Members whose contact you already viewed."
        emptyDescriptionLine2={`You haven't viewed anyone's contact details yet.`}
      />

      <SectionWithEmptyState
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
        emptyDescriptionLine1="Members blocked by you will appear here."
        emptyDescriptionLine2={`You have not blocked any member.\nWhen you block a member, they will not know that you have blocked them.`}
      />
    </ScrollView>
  );
}
