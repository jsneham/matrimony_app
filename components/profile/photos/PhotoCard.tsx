import { MoreHorizontal } from "lucide-react-native";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";

export const PhotoCard = ({
  source,
  mainLabel,
  pendingLabel,
  size = "large",
}: {
  source: any;
  mainLabel?: string;
  pendingLabel?: boolean;
  size?: "large" | "small";
}) => {
  const height = size === "large" ? "h-64" : "h-32";
  return (
    <View
      className={`flex-1 ${height} rounded-2xl overflow-hidden border-2 border-dashed border-gray-300 relative bg-gray-100`}
    >
      <Image source={source} className="w-full h-full" resizeMode="cover" />

      {pendingLabel && (
        <View className="absolute top-2 self-center bg-gray-500/80 px-3 py-1 rounded-full">
          <Text className="text-white text-xs font-semibold">
            Approval Pending
          </Text>
        </View>
      )}

      {mainLabel && (
        <View className="absolute bottom-2 left-2 bg-black/70 px-3 py-1.5 rounded-full">
          <Text className="text-white text-xs font-semibold">{mainLabel}</Text>
        </View>
      )}

      <Pressable className="absolute bottom-2 right-2 w-7 h-7 rounded-full bg-black/70 items-center justify-center">
        <MoreHorizontal size={16} color="#fff" />
      </Pressable>
    </View>
  );
};
