// screens/MyMatchesScreen.tsx
import React, { useCallback, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import PreferencesHintIcon from "@/assets/icons/PreferencesHintIcon";
import { MatchCard } from "@/components/MatchCard";
import { NoData } from "@/components/NoData";
import { SkeletonCard } from "@/components/SkeletonCard";
import { useMyMatches } from "@/hooks/useMatches";
import { useSession } from "@/hooks/useSession";
import { SESSION_KEYS } from "@/types/common";
import { MatchProfile } from "@/types/matches";
import { Ionicons } from "@expo/vector-icons";
import { Href, router } from "expo-router";

export default function MyMatchesScreen() {
  const insets = useSafeAreaInsets();
  const screenHeight = Dimensions.get("window").height;
  const headerHeight = 100;
  const tabBarHeight = 60 + insets.bottom;
  const subtitleBarHeight = 34 + 16 + 12;
  const availableHeight = Math.max(
    screenHeight - insets.top - headerHeight - tabBarHeight - subtitleBarHeight,
    360,
  );
  const cardHeight = Math.max(availableHeight - 12, 360);

  const { data: sessionData, isLoading: isSessionLoading } = useSession([
    SESSION_KEYS.MATRI_ID,
    SESSION_KEYS.USER_ID,
  ]);

  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  // Extract IDs safely
  const matriId = useMemo(
    () => sessionData?.[SESSION_KEYS.MATRI_ID] ?? "",
    [sessionData],
  );
  const memberId = useMemo(
    () => sessionData?.[SESSION_KEYS.USER_ID] ?? "",
    [sessionData],
  );

  // Fetch matches - only runs when IDs are available
  const {
    data: matchesData,
    isLoading: isMatchesLoading,
    isError,
    isFetching,
    refetch,
  } = useMyMatches({
    matriId,
    memberId,
    page,
  });

  // Extract matches array safely
  const matches = useMemo(() => {
    const data = matchesData?.data || [];
    // Ensure all items have string IDs for FlatList
    return Array.isArray(data)
      ? data.map((item) => ({
          ...item,
          id: String(item.id), // Force string ID
        }))
      : [];
  }, [matchesData]);

  const totalCount = matchesData?.total_count || 0;

  // Combined loading state
  const isLoading = isSessionLoading || isMatchesLoading;

  // Handle pull-to-refresh
  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    setPage(1);
    try {
      await refetch();
    } finally {
      setRefreshing(false);
    }
  }, [refetch]);

  // Handle load more
  const handleEndReached = useCallback(() => {
    if (!isFetching && matches.length < totalCount) {
      setPage((prev) => prev + 1);
    }
  }, [matches.length, totalCount, isFetching]);

  // Debug logging
  // React.useEffect(() => {
  //   if (matches.length > 0) {
  //     console.log("📊 MyMatchesScreen Debug:", {
  //       matchesCount: matches.length,
  //       totalCount: totalCount,
  //       currentPage: page,
  //       isLoading,
  //       isError,
  //       isFetching,
  //       matriId: matriId ? "✅" : "",
  //       memberId: memberId ? "✅" : "",
  //     });
  //   }
  // }, [matches.length, totalCount, page, isLoading, isError, isFetching]);

  return (
    <View className="flex-1 bg-app-background">
      {/* Subtitle with Update Preferences */}
      <View className="flex-row items-center justify-between mx-5 h-[34px] my-3 bg-white px-3 rounded-xl">
        <Text className="text-gray font-regular text-sm">
          As per Partner Preferences.
        </Text>
        <TouchableOpacity
          className="flex-row items-center"
          onPress={() =>
            router.push({
              pathname: "/(profile)",
              params: { tab: "preferences" },
            } as Href)
          }
        >
          <Text className="text-black text-sm font-bold">
            Update Preferences
          </Text>
          <PreferencesHintIcon
            size={12}
            color="black"
            style={{ marginLeft: 6 }}
          />
        </TouchableOpacity>
      </View>

      {/* Loading State - Skeleton Cards */}
      {isLoading ? (
        <FlatList
          data={[1, 2, 3]}
          renderItem={() => <SkeletonCard />}
          keyExtractor={(item) => `skeleton-${item}`}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={false}
        />
      ) : null}

      {/* Error State */}
      {!isLoading && isError ? (
        <View className="flex-1 items-center justify-center px-6">
          <Ionicons name="alert-circle" size={48} color="#ef4444" />
          <Text className="text-red-600 font-bold mt-4 text-center">
            Failed to load matches
          </Text>
          <TouchableOpacity
            onPress={() => {
              setPage(1);
              refetch();
            }}
            className="mt-4 px-6 py-3 bg-blue-600 rounded-lg"
          >
            <Text className="text-white font-bold">Try Again</Text>
          </TouchableOpacity>
        </View>
      ) : null}

      {/* Matches List - FlatList for release build compatibility */}
      {!isLoading && !isError ? (
        <FlatList
          data={matches}
          renderItem={({ item }) => (
            <View
              style={{
                height: cardHeight,
                paddingHorizontal: 10,
                paddingTop: 6,
                paddingBottom: 6,
              }}
            >
              <MatchCard profile={item} cardHeight={cardHeight} />
            </View>
          )}
          // CRITICAL: String keyExtractor for release builds
          keyExtractor={(item: MatchProfile, index: number) => {
            if (!item?.matri_id) {
              console.warn("⚠️ Item missing ID at index", index);
              return `fallback-${index}`;
            }
            return String(item.matri_id);
          }}
          getItemLayout={(_, index) => ({
            length: cardHeight,
            offset: cardHeight * index,
            index,
          })}
          // FlatList optimizations for release builds
          removeClippedSubviews={false}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          updateCellsBatchingPeriod={50}
          scrollEventThrottle={16}
          pagingEnabled
          snapToAlignment="start"
          decelerationRate="fast"
          // Content styling
          contentContainerStyle={{
            paddingHorizontal: 0,
            paddingBottom: 110,
          }}
          showsVerticalScrollIndicator={false}
          // Pagination
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5}
          // Pull to refresh
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={["#0066cc"]}
            />
          }
          // Empty state
          ListEmptyComponent={
            !isLoading && matches.length === 0 ? <NoData /> : null
          }
          // Footer loading indicator
          ListFooterComponent={
            isFetching && matches.length > 0 ? (
              <View style={{ paddingVertical: 20 }}>
                <ActivityIndicator size="small" color="#0066cc" />
              </View>
            ) : null
          }
        />
      ) : null}
    </View>
  );
}
