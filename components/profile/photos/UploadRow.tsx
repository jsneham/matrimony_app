import AddPhotoIcon from "@/assets/icons/AddPhotoIcon";
import { Feather } from "@expo/vector-icons";
import { MoreHorizontal } from "lucide-react-native";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { GuidelinesLink } from "./GuidelinesLink";

export const UploadRow = ({
  label,
  heading,
  note,
  onPress,
  imageUri,
  icon: Icon = AddPhotoIcon,
}: {
  label: string;
  heading: string;
  note: string;
  onPress?: () => void;
  imageUri?: string;
  icon?: React.ComponentType<{ size?: number; color?: string }>;
}) => (
  <View>
    <View className="mt-14 mb-4">
      <Text className="text-2xl font-bold text-gray-900">{heading}</Text>
    </View>

    {imageUri ? (
      <Pressable
        onPress={onPress}
        className="rounded-2xl overflow-hidden border border-dashed border-gray-400 bg-gray-100"
        style={{ height: 160 }}
      >
        <Image
          source={{ uri: imageUri }}
          className="w-full h-full rounded-2xl"
          resizeMode="cover"
        />
        <View className="absolute bottom-3 right-3 w-7 h-7 rounded-[14px] bg-black items-center justify-center">
          <MoreHorizontal size={16} color="#fff" />
        </View>
      </Pressable>
    ) : (
      <Pressable
        onPress={onPress}
        className="border border-dashed border-gray-400 rounded-2xl px-4 py-4 flex-row items-center justify-between bg-white active:bg-gray-50"
      >
        <Text className="text-gray-400 font-regular text-base">{label}</Text>
        <View className="w-6 h-6 rounded-full items-center justify-center">
          <Icon size={20} color="#9ca3af" />
        </View>
      </Pressable>
    )}

    <View className="flex-row items-center justify-between mt-4">
      <View className="flex-row items-center flex-1">
        <Feather
          name="info"
          size={12}
          color="#8B8B8B"
          style={{ marginRight: 6, marginTop: -2 }}
        />
        <Text className="text-gray font-regular text-sm flex-1">{note}</Text>
      </View>
      <GuidelinesLink />
    </View>
  </View>
);
