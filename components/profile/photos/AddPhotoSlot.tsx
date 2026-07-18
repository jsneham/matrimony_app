import { Camera } from "lucide-react-native";
import React from "react";
import { Pressable } from "react-native";

export const AddPhotoSlot = ({
  size = "large",
  onPress,
}: {
  size?: "large" | "small";
  onPress?: () => void;
}) => {
  const height = size === "large" ? "h-64" : "h-32";
  return (
    <Pressable
      onPress={onPress}
      className={`flex-1 ${height} rounded-2xl border-2 border-dashed border-gray-300 items-center justify-center bg-white`}
    >
      <Camera size={22} color="#9ca3af" />
    </Pressable>
  );
};
