import AddPhotoIcon from "@/assets/icons/AddPhotoIcon";
import { colors } from "@/constants/theme";
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
      className={`flex-1 ${height} rounded-2xl border border-dashed border-gray-400 items-center justify-center bg-white`}
    >
      <AddPhotoIcon size={22} color={colors.gray} />
    </Pressable>
  );
};
