import { AlertCircle } from "lucide-react-native";
import React from "react";
import {
    Pressable,
    Text
} from "react-native";

export const GuidelinesLink = () => (
  <Pressable className="flex-row items-center gap-1">
    <AlertCircle size={14} color="#ec1257" />
    <Text className="text-pink-600 text-sm">Guidelines</Text>
  </Pressable>
);
