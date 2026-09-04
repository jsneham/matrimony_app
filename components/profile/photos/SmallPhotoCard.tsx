import { MoreHorizontal } from "lucide-react-native";
import React from "react";
import { Image, Pressable, View } from "react-native";
import { Text } from "@/components/ui/Text";

export const SmallPhotoCard = ({
  source,
  mainLabel,
}: {
  source: any;
  mainLabel?: string;
}) => (
  <View className="flex-1 h-32 rounded-xl overflow-hidden border border-dashed border-gray-400 relative bg-gray-100">
    <Image source={source} className="w-full h-full" resizeMode="cover" />
    {mainLabel && (
      <View className="absolute bottom-1.5 left-1.5 bg-pink-600 px-2 py-1 rounded-full">
        <Text className="text-white text-[10px] font-medium">
          {mainLabel}
        </Text>
      </View>
    )}
    <Pressable className="absolute bottom-1.5 right-1.5 w-6 h-6 rounded-full bg-black/70 items-center justify-center">
      <MoreHorizontal size={13} color="#fff" />
    </Pressable>
  </View>
);
