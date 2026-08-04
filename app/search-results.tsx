import { SearchResultCard } from "@/components/search/SearchResultCard";
import { useSearchResults } from "@/hooks/useSearchResults";
import { useSession } from "@/hooks/useSession";
import { SESSION_KEYS } from "@/types/common";
import { SearchFilterParams, SearchResultItem } from "@/types/searchResult";
import { getPlanAwareName } from "@/utils/profileHelpers";
import { Feather, Ionicons } from "@expo/vector-icons";
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

const SearchResultsScreen = () => {
  const insets = useSafeAreaInsets();
  const { data: sessionData } = useSession([SESSION_KEYS.PLAN_STATUS]);
  const planStatus = sessionData?.[SESSION_KEYS.PLAN_STATUS] ?? "";
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

  const results = useMemo(
    () => data?.pages.flatMap((p) => p.data) ?? [],
    [data],
  );
  const totalCount = data?.pages?.[0]?.total_count ?? 0;

  const handleOpenProfile = (item: SearchResultItem) => {
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

  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      <View className="flex-row items-center px-4 py-3 border-b border-gray-100">
        <Pressable onPress={() => router.back()} hitSlop={10} className="mr-3">
          <Ionicons name="chevron-back" size={24} color="#111827" />
        </Pressable>
        <View className="flex-1">
          <Text className="text-lg font-bold text-gray-900">
            Here&apos;s what we found!
          </Text>
          <Text className="text-xs text-gray-500">
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
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16 }}
          onEndReached={() => hasNextPage && fetchNextPage()}
          onEndReachedThreshold={0.5}
          renderItem={({ item }) => (
            <SearchResultCard
              item={item}
              onPress={() => handleOpenProfile(item)}
              onInterest={() => handleInterest(item)}
              onShortlist={() => handleShortlist(item)}
              onIgnore={() => handleIgnore(item)}
              onChat={() => handleChat(item)}
            />
          )}
          ListFooterComponent={
            isFetchingNextPage ? (
              <ActivityIndicator className="py-4" color="#db2777" />
            ) : null
          }
          ListEmptyComponent={
            <View className="items-center justify-center mt-24">
              <Text className="text-gray-400">No matches found.</Text>
            </View>
          }
        />
      )}
    </View>
  );
};

export default SearchResultsScreen;
