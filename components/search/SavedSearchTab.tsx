import { NoData } from "@/components/NoData";
import { useSavedSearches } from "@/hooks/useSavedSearches";
import { SavedSearchItem } from "@/types/search";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  View,
} from "react-native";

const SavedSearchRow = ({ item }: { item: SavedSearchItem }) => (
  <View className="bg-white px-5 py-4 border-b border-gray-100">
    <Text className="text-base font-bold text-black mb-1">{item.name}</Text>
    <Text className="text-sm text-gray-500" numberOfLines={2}>
      {item.detail}
    </Text>
  </View>
);

export default function SavedSearchTab() {
  const {
    data,
    isLoading,
    isRefetching,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useSavedSearches();

  const items = data?.pages.flatMap((page) => page.items) ?? [];

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#db2777" />
      </View>
    );
  }

  if (items.length === 0) {
    return (
      <View className="flex-1 items-center justify-center px-6">
        <NoData />
        <Text className="text-gray text-base font-bold text-center mt-3">
          No saved searches yet
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <SavedSearchRow item={item} />}
      refreshControl={
        <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
      }
      onEndReached={() => {
        if (hasNextPage && !isFetchingNextPage) fetchNextPage();
      }}
      onEndReachedThreshold={0.4}
      ListFooterComponent={
        isFetchingNextPage ? (
          <View className="py-4 items-center">
            <ActivityIndicator size="small" color="#db2777" />
          </View>
        ) : null
      }
    />
  );
}
