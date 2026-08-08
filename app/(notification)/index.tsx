import ChevronLeftIcon from "@/assets/icons/ChevronLeftIcon";
import { UpgradePlanSheet } from "@/components/messages/UpgradePlanSheet";
import { NotificationRow } from "@/components/notifications/NotificationRow";
import { useNotifications } from "@/hooks/useNotifications";
import { useSession } from "@/hooks/useSession";
import { SESSION_KEYS } from "@/types/common";
import { NotificationApiItem } from "@/types/notifications";
import { PlanStatus } from "@/types/profile";
import { navigateForNotification } from "@/utils/notificationRouting";
import { router } from "expo-router";
import React, { useMemo } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const NotificationsScreen = () => {
  const insets = useSafeAreaInsets();
  const { data: sessionData } = useSession([
    SESSION_KEYS.USER_ID,
    SESSION_KEYS.PLAN_STATUS,
  ]);
  const memberId = sessionData?.[SESSION_KEYS.USER_ID] || "";
  const planStatus = sessionData?.[SESSION_KEYS.PLAN_STATUS] || "";
  const [showUpgradeSheet, setShowUpgradeSheet] = React.useState(false);

  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
    isRefetching,
  } = useNotifications(memberId);

  const items = useMemo(
    () => data?.pages.flatMap((page) => page.data) ?? [],
    [data],
  );

  const handlePress = (item: NotificationApiItem) => {
    if (item.notification_type === "message") {
      if (planStatus !== PlanStatus.PAID) {
        setShowUpgradeSheet(true);
        return;
      }
    }

    navigateForNotification(item);
  };

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return (
    <View className="flex-1 bg-app-background">
      {/* Header */}
      <View
        className="bg-white flex-row items-center"
        style={{ paddingTop: insets.top }}
      >
        <Pressable
          onPress={() => router.back()}
          hitSlop={10}
          style={{
            width: 44,
            height: 49,
            justifyContent: "center",
            paddingLeft: 20,
          }}
        >
          <ChevronLeftIcon size={24} color="black" />
        </Pressable>
        <Text
          className="flex-1 text-center text-lg font-bold text-black"
          style={{ marginRight: 44 }}
        >
          Notifications
        </Text>
      </View>

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
          contentContainerStyle={{ paddingTop: 20, paddingBottom: 56 }}
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
                You don&apos;t have any notifications yet.
              </Text>
            </View>
          }
        />
      )}

      <UpgradePlanSheet
        visible={showUpgradeSheet}
        message="A paid membership is required to open and send messages."
        onClose={() => setShowUpgradeSheet(false)}
      />
    </View>
  );
};

export default NotificationsScreen;
