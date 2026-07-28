import { MoreHorizontal } from "lucide-react-native";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";

export const PhotoCard = ({
  source,
  mainLabel,
  pendingLabel,
  size = "large",
  onPressMenu,
  onPressImage,
}: {
  source: any;
  mainLabel?: string;
  pendingLabel?: boolean;
  size?: "large" | "small";
  onPressMenu?: () => void;
  onPressImage?: () => void;
}) => {
  const height = size === "large" ? "h-64" : "h-32";
  return (
    <View
      className={`flex-1 ${height} rounded-2xl overflow-hidden border border-dashed border-gray-400 relative bg-gray-100`}
    >
      <Pressable onPress={onPressImage} style={{ flex: 1 }}>
        <Image
          source={source}
          className="w-full h-full rounded-2xl"
          resizeMode="cover"
        />
      </Pressable>

      {pendingLabel && (
        <View
          className="absolute top-2 self-center bg-overlay-black-50 px-3 rounded-full justify-center"
          style={{ height: 28 }}
        >
          <Text className="text-white text-xs font-semibold">
            Approval Pending
          </Text>
        </View>
      )}

      {mainLabel && (
        <View
          className="absolute bottom-3 left-3 bg-black px-3 rounded-full justify-center"
          style={{ height: 28 }}
        >
          <Text className="text-white text-xs font-semibold">{mainLabel}</Text>
        </View>
      )}

      <Pressable
        onPress={onPressMenu}
        className="absolute bottom-3 right-3 w-7 h-7 rounded-full bg-black items-center justify-center"
      >
        <MoreHorizontal size={16} color="#fff" />
      </Pressable>
    </View>
  );
};
