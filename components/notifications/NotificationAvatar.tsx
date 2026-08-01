import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, View } from "react-native";

export const NotificationAvatar = ({ uri }: { uri?: string }) => {
  if (uri) {
    return (
      <Image
        source={{ uri }}
        style={{ width: 56, height: 56, borderRadius: 28 }}
      />
    );
  }

  return (
    <View
      className="bg-gray-200 items-center justify-center"
      style={{ width: 56, height: 56, borderRadius: 28 }}
    >
      <Ionicons name="person" size={28} color="#9ca3af" />
    </View>
  );
};

export default NotificationAvatar;
