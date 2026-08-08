import ChevronLeftIcon from "@/assets/icons/ChevronLeftIcon";
import { SearchResultCard } from "@/components/search/SearchResultCard";
import { useSearchResults } from "@/hooks/useSearchResults";
import { useSession } from "@/hooks/useSession";
import { SESSION_KEYS } from "@/types/common"; // TODO: confirm PlanStatus import path
import { PlanStatus } from "@/types/profile";
import { SearchFilterParams, SearchResultItem } from "@/types/searchResult";
import { getPlanAwareName } from "@/utils/profileHelpers";
import { Feather } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { router, useLocalSearchParams } from "expo-router";
import React, { useMemo } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Platform,
  Pressable,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// TODO: swap for your actual illustration assets
const NO_RESULT_ILLUSTRATIONS = {
  male: require("@/assets/images/male.png"),
  female: require("@/assets/images/female.png"),
} as const;

const NoResultsState = ({ gender }: { gender?: string }) => {
  // Show the OPPOSITE gender's illustration to match the search target
  const illustrationKey = gender?.toLowerCase() === "male" ? "female" : "male";

  return (
    <View className="items-center justify-center mt-16 px-8">
      <Image
        source={NO_RESULT_ILLUSTRATIONS[illustrationKey]}
        style={{ width: 180, height: 180 }}
        resizeMode="contain"
      />
      <Text className="text-base font-semibold text-gray-700 mt-4">
        No record found
      </Text>
      <Text className="text-sm text-gray-400 text-center mt-1">
        Try adjusting your filters to see more matches.
      </Text>
    </View>
  );
};

const UpgradeBanner = () => (
  <Pressable
    onPress={() => router.push("/(membership)")} // TODO: point at your actual upgrade/(membership) route
    className="bg-amber-50 flex-row items-center px-4 py-3 rounded-xl mb-4"
  >
    <View className="bg-amber-600 rounded-full w-8 h-8 items-center justify-center mr-3">
      <Feather name="award" size={16} color="white" />
    </View>
    <Text className="flex-1 text-xs text-gray-700 leading-4">
      <Text className="font-bold text-amber-700">
        Upgrade to Premium Gold Membership{" "}
      </Text>
      to view all these matches & save your search.
    </Text>
  </Pressable>
);

const GoldBadge = () => (
  <View className="bg-amber-700 flex-row items-center px-3 py-1 rounded-full">
    <Feather name="award" size={12} color="white" />
    <Text className="text-white text-xs font-semibold ml-1">Gold</Text>
  </View>
);

const BlurredCard = ({ children }: { children: React.ReactNode }) => (
  <Pressable
    onPress={() => router.push("/(membership)")} // TODO: point at your actual upgrade/(membership) route
    className="mb-4 rounded-2xl overflow-hidden"
    style={{ elevation: 0 }} // reset so this wrapper doesn't create its own stacking context
  >
    <View className="relative" style={{ elevation: 0 }}>
      {children}

      {/* Solid overlay: guarantees content is obscured, and doubles as the
          ONLY blur mechanism on Android (see note below). elevation + zIndex
          set HIGHER than the card's own elevation so it renders on top.
          Android stacks elevated views above siblings regardless of source
          order, so without this the overlay/blur can end up hidden BEHIND
          a card that has its own shadow/elevation.
          This is a Pressable (not a plain View) so it also INTERCEPTS taps
          that would otherwise reach the hidden Interest/Shortlist/Ignore/Chat
          buttons underneath, redirecting to the upgrade screen instead. */}
      <Pressable
        onPress={() => router.push("/(membership)")} // TODO: point at your actual upgrade/(membership) route
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor:
            Platform.OS === "android"
              ? "rgba(255,255,255,0.85)" // stronger on Android since there's no real blur underneath
              : "rgba(255,255,255,0.5)",
          zIndex: 20,
          elevation: 20,
        }}
      />

      {/* iOS only: expo-blur's "dimezisBlurView" method crashes on Android
          with IndexOutOfBoundsException when used inside a FlatList (the
          native Kawase-blur renderer breaks on view recycle/resize during
          scroll). iOS's default blur method is stable, so we keep it there
          and rely solely on the solid overlay above for Android. */}
      {Platform.OS === "ios" && (
        <BlurView
          intensity={70}
          tint="light"
          pointerEvents="none"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 21,
          }}
        />
      )}

      {/* Rendered LAST with the highest zIndex so it stays visible on top
          of the overlay/blur above (previously it was underneath and
          invisible). */}
      <View
        pointerEvents="none"
        style={{ zIndex: 30, elevation: 30 }}
        className="absolute top-3 left-3"
      >
        <GoldBadge />
      </View>
    </View>
  </Pressable>
);

const SaveSearchButton = ({ isPaid }: { isPaid: boolean }) => (
  <View className="px-5 pb-5 pt-2 bg-app-background">
    <Pressable
      onPress={
        () =>
          isPaid
            ? console.log("Save search") // TODO: wire to real save-search endpoint
            : router.push("/(membership)") // TODO: point at your actual upgrade/(membership) route
      }
      className="bg-amber-700 rounded-full py-4 items-center"
    >
      <Text className="text-white font-bold text-base">
        Save this matches search
      </Text>
    </Pressable>
  </View>
);

const SearchResultsScreen = () => {
  const insets = useSafeAreaInsets();
  const { data: sessionData } = useSession([
    SESSION_KEYS.PLAN_STATUS,
    SESSION_KEYS.GENDER, // TODO: confirm this key exists / stores logged-in user's gender
  ]);
  const planStatus = sessionData?.[SESSION_KEYS.PLAN_STATUS] || "";
  const userGender = sessionData?.[SESSION_KEYS.GENDER] ?? "";
  const isPaid = planStatus === PlanStatus.PAID;

  const { searchData } = useLocalSearchParams<{ searchData: string }>();

  const params: SearchFilterParams | null = useMemo(() => {
    try {
      return searchData ? JSON.parse(searchData) : null;
    } catch {
      return null;
    }
  }, [searchData]);

  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useSearchResults(params);

  // Filter out blank/placeholder records the API may return even when there are no real matches
  const results = useMemo(
    () =>
      (data?.pages.flatMap((p) => p.data) ?? []).filter(
        (item) => item?.id && item?.matri_id,
      ),
    [data],
  );
  const totalCount = data?.pages?.[0]?.total_count ?? 0;
  const showEmptyState = !isLoading && results.length === 0;

  const handleOpenProfile = (item: SearchResultItem) => {
    if (!isPaid) {
      router.push("/(membership)"); // TODO: point at your actual upgrade/(membership) route
      return;
    }
    router.push({
      pathname: "/profile/[matriId]",
      params: { matriId: item.id },
    });
  };

  // TODO: wire to real endpoints once confirmed (send_interest / shortlist / block / chat)
  const handleInterest = (item: SearchResultItem) =>
    console.log("Interest:", item.matri_id);
  const handleShortlist = (item: SearchResultItem) =>
    console.log("Shortlist:", item.matri_id);
  const handleIgnore = (item: SearchResultItem) =>
    console.log("Ignore:", item.matri_id);
  const handleChat = (item: SearchResultItem) =>
    router.push({
      pathname: "/message/chat/[other_matriId]",
      params: {
        other_matriId: item.matri_id,
        name: getPlanAwareName(
          planStatus,
          item.firstname,
          item.lastname,
          item.username,
        ),
      },
    });

  const renderCard = (item: SearchResultItem) => {
    const card = (
      <SearchResultCard
        item={item}
        onPress={() => handleOpenProfile(item)}
        onInterest={() => handleInterest(item)}
        onShortlist={() => handleShortlist(item)}
        onIgnore={() => handleIgnore(item)}
        onChat={() => handleChat(item)}
      />
    );
    return isPaid ? card : <BlurredCard>{card}</BlurredCard>;
  };

  return (
    <View className="flex-1 bg-app-background">
      <View
        className="bg-white flex-row items-center px-5 py-3 border-b border-gray-100"
        style={{ paddingTop: insets.top + 12 }}
      >
        <Pressable onPress={() => router.back()} hitSlop={10} className="mr-3">
          <ChevronLeftIcon size={24} color="black" />
        </Pressable>
        <View className="flex-1">
          <Text className="text-lg font-bold text-gray-900 text-center">
            Here&apos;s what we found!
          </Text>
          <Text className="text-xs text-gray-500 text-center">
            Showing {totalCount} matches
          </Text>
        </View>
        <Pressable hitSlop={10}>
          <Feather name="filter" size={20} color="#db2777" />
        </Pressable>
      </View>

      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#db2777" />
        </View>
      ) : showEmptyState ? (
        <NoResultsState gender={userGender} />
      ) : (
        <>
          <FlatList
            data={results}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{
              paddingHorizontal: 20,
              paddingTop: 16,
              paddingBottom: 8,
            }}
            ListHeaderComponent={!isPaid ? <UpgradeBanner /> : null}
            onEndReached={() => hasNextPage && fetchNextPage()}
            onEndReachedThreshold={0.5}
            renderItem={({ item }) => renderCard(item)}
            ListFooterComponent={
              isFetchingNextPage ? (
                <ActivityIndicator className="py-4" color="#db2777" />
              ) : null
            }
          />
          <SaveSearchButton isPaid={isPaid} />
        </>
      )}
    </View>
  );
};

export default SearchResultsScreen;
