import { ConversationListItem } from "@/types/message";
import { router } from "expo-router";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";

export const ConversationRow = ({ item }: { item: ConversationListItem }) => {
  const unread = parseInt(item.unread_count, 10) || 0;

  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/message/chat/[other_matriId]",
          params: { other_matriId: item.otherID, name: item.username },
        })
      }
      className="flex-row items-center px-5 py-4 active:bg-gray-50"
    >
      <View className="w-14 h-14 rounded-full bg-gray-200 overflow-hidden">
        {item.photo_url ? (
          <Image
            source={{ uri: item.photo_url }}
            className="w-full h-full"
            resizeMode="cover"
          />
        ) : null}
      </View>

      <View className="flex-1 ml-4">
        <View className="flex-row items-center justify-between">
          <Text className="text-base font-bold text-gray-900" numberOfLines={1}>
            {item.username}
          </Text>
          <Text className="text-xs text-gray-400">{item.sent_on}</Text>
        </View>
        <View className="flex-row items-center justify-between mt-1">
          <Text
            className={`text-sm flex-1 mr-2 ${
              unread > 0 ? "text-gray-900 font-semibold" : "text-gray-500"
            }`}
            numberOfLines={1}
          >
            {item.content}
          </Text>
          {unread > 0 && (
            <View className="bg-pink-600 rounded-full min-w-[20px] h-5 items-center justify-center px-1.5">
              <Text className="text-white text-xs font-bold">{unread}</Text>
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
};

export default ConversationRow;
