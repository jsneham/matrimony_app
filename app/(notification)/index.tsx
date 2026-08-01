import { NotificationRow } from "@/components/notifications/NotificationRow";
import { useNotifications } from "@/hooks/useNotifications";
import { useSession } from "@/hooks/useSession";
import { SESSION_KEYS } from "@/types/common";
import { NotificationApiItem } from "@/types/notifications";
import { navigateForNotification } from "@/utils/notificationRouting";
import React, { useMemo } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

const NotificationsScreen = () => {
  const { data: sessionData } = useSession([SESSION_KEYS.USER_ID]);
  const memberId = sessionData?.[SESSION_KEYS.USER_ID] || "";

  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
    isRefetching,
  } = useNotifications(memberId);

  // Flatten all pages into a single array
  const items = useMemo(
    () => data?.pages.flatMap((page) => page.data) ?? [],
    [data],
  );

  const handlePress = (item: NotificationApiItem) => {
    navigateForNotification(item);
  };

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return (
    <View className="flex-1 bg-white">
      {/* List */}
      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#db2777" />
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item, index) => item.id ?? String(index)}
          showsVerticalScrollIndicator={false}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          refreshing={isRefetching}
          onRefresh={refetch}
          ItemSeparatorComponent={() => (
            <View className="h-px bg-gray-100 ml-5" />
          )}
          renderItem={({ item }) => (
            <NotificationRow item={item} onPress={handlePress} />
          )}
          ListFooterComponent={
            isFetchingNextPage ? (
              <View className="py-4 items-center">
                <ActivityIndicator size="small" color="#db2777" />
              </View>
            ) : null
          }
          ListEmptyComponent={
            <View className="items-center justify-center mt-24 px-8">
              <Text className="text-gray-400 text-center">
                You don't have any notifications yet.
              </Text>
            </View>
          }
        />
      )}
    </View>
  );
};

export default NotificationsScreen;
