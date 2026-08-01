import { NotificationApiItem } from "@/types/notification";
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
      className="flex-row px-5 py-4 active:bg-gray-50"
    >
      <NotificationAvatar uri={item.image} />

      <View className="flex-1 ml-4">
        <Text className="text-base font-bold text-gray-900">{item.title}</Text>
        <Text className="text-sm text-gray-500 mt-1" numberOfLines={2}>
          {item.message}
        </Text>
        <Text className="text-xs text-gray-400 mt-2">{item.created_at}</Text>
      </View>
    </Pressable>
  );
};

export default NotificationRow;
