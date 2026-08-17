import { NotificationApiItem } from "@/types/notifications";
import { formatNotificationDate } from "@/utils/dateTime";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { NotificationAvatar } from "./NotificationAvatar";

export const NotificationRow = ({
  item,
  onPress,
}: {
  item: NotificationApiItem;
  onPress: (item: NotificationApiItem) => void;
}) => {
  return (
    <Pressable
      onPress={() => onPress(item)}
      className="flex-row mx-5 mb-3 p-5 bg-white rounded-2xl active:bg-gray-50"
    >
      <NotificationAvatar uri={item.photo_url} />

      <View className="flex-1 ml-4">
        <View className="flex-row items-center justify-between">
          <Text className="text-base font-bold text-gray-900">
            {item.title}
          </Text>
          <Text className="text-xs text-gray-400">
            {formatNotificationDate(item.created_on)}
          </Text>
        </View>
        <Text className="text-sm text-gray-500 mt-3">{item.message}</Text>
      </View>
    </Pressable>
  );
};

export default NotificationRow;
