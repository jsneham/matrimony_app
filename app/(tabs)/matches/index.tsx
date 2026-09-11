import React, { useCallback, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  LayoutChangeEvent,
  RefreshControl,
  TouchableOpacity,
  View,
} from "react-native";

import PreferencesHintIcon from "@/assets/icons/PreferencesHintIcon";
import { MatchCard } from "@/components/MatchCard";
import { Text } from "@/components/ui/Text";
import { NoData } from "@/components/NoData";
import { SkeletonCard } from "@/components/SkeletonCard";
import { useMyMatches } from "@/hooks/useMatches";
import { useSession } from "@/hooks/useSession";
import { SESSION_KEYS } from "@/types/common";
import { MatchProfile } from "@/types/matches";

import { Ionicons } from "@expo/vector-icons";
import { Href, router } from "expo-router";

/**
 * Horizontal / top spacing around the card.
 */
const CARD_GAP = 12;

/**
 * Space between the bottom of the card and the bottom
 * tab/navigation area.
 *
 * Increase to 60/65 if you need more space.
 */
const BOTTOM_TAB_GAP = 55;
const BOTTOM_SPACE = 80;

export default function MyMatchesScreen() {
  /**
   * This is the actual available viewport height.
   *
   * It is measured from the View that has flex: 1,
   * so we don't need Dimensions.get().
   */
  const [viewportHeight, setViewportHeight] = useState(0);

  const onViewportLayout = useCallback(
    (event: LayoutChangeEvent) => {
      const height = event.nativeEvent.layout.height;

      if (height > 0 && Math.abs(height - viewportHeight) > 1) {
        setViewportHeight(height);
      }
    },
    [viewportHeight],
  );

  /**
   * IMPORTANT:
   *
   * The FlatList item occupies the whole viewport.
   *
   * But the CARD itself is shorter.
   *
   * Example:
   *
   * viewport = 700
   *
   * card =
   * 700
   * - 12 top
   * - 12 horizontal/bottom card spacing
   * - 55 bottom tab gap
   *
   * The card therefore ends before the bottom tab bar.
   */
  const cardHeight = Math.max(viewportHeight - CARD_GAP - BOTTOM_SPACE, 0);
  /**
   * Session
   */
  const { data: sessionData, isLoading: isSessionLoading } = useSession([
    SESSION_KEYS.MATRI_ID,
    SESSION_KEYS.USER_ID,
  ]);

  const matriId = useMemo(
    () => sessionData?.[SESSION_KEYS.MATRI_ID] ?? "",
    [sessionData],
  );

  const memberId = useMemo(
    () => sessionData?.[SESSION_KEYS.USER_ID] ?? "",
    [sessionData],
  );

  /**
   * Matches
   */
  const {
    matches,
    isLoading: isMatchesLoading,
    isError,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useMyMatches({
    matriId,
    memberId,
  });

  const [refreshing, setRefreshing] = useState(false);

  const showSkeleton =
    isSessionLoading || (isMatchesLoading && matches.length === 0);

  /**
   * Refresh
   */
  const handleRefresh = useCallback(async () => {
    setRefreshing(true);

    try {
      await refetch();
    } finally {
      setRefreshing(false);
    }
  }, [refetch]);

  /**
   * Pagination
   */
  const handleEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <View className="flex-1 bg-app-background">
      {/* ============================================================
          PARTNER PREFERENCES BAR
          ============================================================ */}

      <View className="flex-row items-center justify-between mx-5 min-h-[34px] my-3 bg-white px-3 rounded-xl">
        <Text className="text-gray font-regular text-sm">
          As per Partner Preferences.
        </Text>

        <TouchableOpacity
          className="flex-row items-center"
          onPress={() =>
            router.push({
              pathname: "/(profile)",
              params: {
                tab: "preferences",
              },
            } as Href)
          }
        >
          <Text className="text-black text-sm font-bold">
            Update Preferences
          </Text>

          <PreferencesHintIcon
            size={12}
            color="black"
            style={{
              marginLeft: 6,
            }}
          />
        </TouchableOpacity>
      </View>

      {/* ============================================================
          REAL CARD VIEWPORT
          ============================================================ */}

      <View
        style={{
          flex: 1,
        }}
        onLayout={onViewportLayout}
      >
        {/* Wait until layout has been measured */}
        {viewportHeight === 0 ? null : showSkeleton ? (
          /* ========================================================
             SKELETON
             ======================================================== */

          <FlatList
            data={[1]}
            keyExtractor={(item) => `skeleton-${item}`}
            renderItem={() => (
              <View
                style={{
                  height: viewportHeight,
                  paddingHorizontal: CARD_GAP,
                  paddingTop: CARD_GAP,
                  paddingBottom: BOTTOM_SPACE,
                }}
              >
                <SkeletonCard />
              </View>
            )}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        ) : isError ? (
          /* ========================================================
             ERROR
             ======================================================== */

          <View className="flex-1 items-center justify-center px-6">
            <Ionicons name="alert-circle" size={48} color="#ef4444" />

            <Text className="text-red-600 font-bold mt-4 text-center">
              Failed to load matches
            </Text>

            <TouchableOpacity
              onPress={() => refetch()}
              className="mt-4 px-6 py-3 bg-blue-600 rounded-lg"
            >
              <Text className="text-white font-bold">Try Again</Text>
            </TouchableOpacity>
          </View>
        ) : (
          /* ========================================================
             MATCH LIST
             ======================================================== */

          <FlatList
            data={matches}
            renderItem={({ item }) => (
              /**
               * IMPORTANT:
               *
               * The ITEM is still the FULL viewport.
               *
               * The CARD inside it is shorter.
               *
               * This preserves one-card-per-swipe behavior.
               */

              <View
                style={{
                  height: viewportHeight,
                  paddingHorizontal: CARD_GAP,
                  paddingTop: CARD_GAP,
                  paddingBottom: BOTTOM_SPACE,
                }}
              >
                <MatchCard profile={item} cardHeight={cardHeight} />
              </View>
            )}
            keyExtractor={(item: MatchProfile, index: number) =>
              item?.matri_id ? String(item.matri_id) : `fallback-${index}`
            }
            getItemLayout={(_, index) => ({
              length: viewportHeight,
              offset: viewportHeight * index,
              index,
            })}
            initialNumToRender={2}
            maxToRenderPerBatch={2}
            windowSize={3}
            removeClippedSubviews
            pagingEnabled
            snapToInterval={viewportHeight}
            snapToAlignment="start"
            decelerationRate="fast"
            disableIntervalMomentum
            bounces={false}
            overScrollMode="never"
            showsVerticalScrollIndicator={false}
            onEndReached={handleEndReached}
            onEndReachedThreshold={0.6}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
                colors={["#0066cc"]}
              />
            }
            ListEmptyComponent={matches.length === 0 ? <NoData /> : null}
            ListFooterComponent={
              isFetchingNextPage ? (
                <View
                  style={{
                    height: viewportHeight,

                    alignItems: "center",

                    justifyContent: "center",
                  }}
                >
                  <ActivityIndicator size="small" color="#0066cc" />
                </View>
              ) : null
            }
          />
        )}
      </View>
    </View>
  );
}
