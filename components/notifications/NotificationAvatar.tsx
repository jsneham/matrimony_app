import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, View } from "react-native";

export const NotificationAvatar = ({ uri }: { uri?: string }) => {
  if (uri) {
    return (
      <Image
        source={{ uri }}
        style={{ width: 40, height: 40, borderRadius: 20 }}
      />
    );
  }

  return (
    <View
      className="bg-gray-200 items-center justify-center"
      style={{ width: 40, height: 40, borderRadius: 20 }}
    >
      <Ionicons name="person" size={22} color="#9ca3af" />
    </View>
  );
};

export default NotificationAvatar;
