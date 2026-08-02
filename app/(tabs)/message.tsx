import { ConversationRow } from "@/components/messages/ConversationRow";
import { useConversationList } from "@/hooks/useMessages";
import React, { useMemo } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function MessageListScreen() {
  const insets = useSafeAreaInsets();
  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
    isRefetching,
  } = useConversationList();

  const conversations = useMemo(
    () => data?.pages.flatMap((p) => p.data) ?? [],
    [data],
  );

  return (
    <View className="flex-1 bg-white">
      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#db2777" />
        </View>
      ) : (
        <FlatList
          data={conversations}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          refreshing={isRefetching}
          onRefresh={refetch}
          onEndReached={() => hasNextPage && fetchNextPage()}
          onEndReachedThreshold={0.5}
          ItemSeparatorComponent={() => (
            <View className="h-px bg-gray-100 ml-[88px]" />
          )}
          renderItem={({ item }) => <ConversationRow item={item} />}
          ListFooterComponent={
            isFetchingNextPage ? (
              <ActivityIndicator className="py-4" color="#db2777" />
            ) : null
          }
          ListEmptyComponent={
            <View className="items-center justify-center mt-24 px-8">
              <Text className="text-gray-400 text-center">
                No messages yet.
              </Text>
            </View>
          }
        />
      )}
    </View>
  );
}
