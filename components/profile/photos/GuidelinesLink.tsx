import React from "react";
import {
    Pressable
} from "react-native";
import { Text } from "@/components/ui/Text";

export const GuidelinesLink = () => (
  <Pressable className="flex-row items-center gap-1">
    <Text className="text-pink-600 font-regular text-sm">Guidelines</Text>
  </Pressable>
);
