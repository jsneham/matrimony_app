import { SearchResultItem } from "@/types/searchResult";
import { resolvePhotoUri } from "@/utils/profileHelpers";
import { Feather, Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";

export const SearchResultCard = ({
  item,
  onPress,
  onInterest,
  onShortlist,
  onIgnore,
  onChat,
}: {
  item: SearchResultItem;
  onPress: () => void;
  onInterest: () => void;
  onShortlist: () => void;
  onIgnore: () => void;
  onChat: () => void;
}) => {
  const photoUri = resolvePhotoUri(item.photoUrl, item.photo1);
  const isLocked = item.photo_view_status === "0"; // TODO: confirm exact locked-state value
  const action = item.action?.[0];
  const isLiked = action?.is_like === "Yes";
  const isBlocked = action?.is_block === 1;
  const isShortlisted = action?.is_shortlist === 1;
  const hasInterestSent = !!action?.is_interest && action.is_interest !== "";

  const maskedName = "XXXXX";

  return (
    <Pressable
      onPress={onPress}
      className="rounded-2xl overflow-hidden mb-4 border-2 border-gray-200"
    >
      <View style={{ height: 380 }} className="relative bg-gray-200">
        {photoUri ? (
          <Image
            source={{ uri: photoUri }}
            className="w-full h-full"
            resizeMode="cover"
            blurRadius={isLocked ? 25 : 0}
          />
        ) : (
          <View className="w-full h-full items-center justify-center">
            <Ionicons name="person" size={64} color="#9ca3af" />
          </View>
        )}

        {/* Photo count badge */}
        <View className="absolute top-3 right-3 flex-row items-center bg-black/60 px-2 py-1 rounded-full">
          <Feather name="image" size={12} color="#fff" />
          <Text className="text-white text-xs font-semibold ml-1">1</Text>
        </View>

        {/* Overlay info */}
        <View className="absolute bottom-0 left-0 right-0 px-4 pb-4">
          <View className="flex-row items-center gap-2 mb-1">
            {item.badge && (
              <View className="bg-pink-600 px-2 py-0.5 rounded">
                <Text className="text-white text-xs font-bold">
                  {item.badge}
                </Text>
              </View>
            )}
            {item.logged_in === "1" && (
              <Text className="text-white text-xs">Active Today</Text>
            )}
          </View>

          <Text className="text-white text-2xl font-bold">
            {isLocked ? maskedName : item.username}, {item.age}
          </Text>
          <Text className="text-white text-sm mt-1">
            {item.height} · {item.city_name} · {item.religion_name}
          </Text>
          <Text className="text-white text-sm">
            {item.occupation_name} · Earns {item.income} p.a
          </Text>
          <Text className="text-white text-sm">{item.education_name}</Text>
          <Text className="text-white text-xs italic mt-1">
            Profile managed by {item.profileby}
          </Text>
        </View>
      </View>

      {/* Action buttons */}
      <View className="flex-row items-center justify-around bg-white py-3">
        <ActionButton
          icon={hasInterestSent ? "mail-open" : "mail"}
          label="Interest"
          onPress={onInterest}
          active={hasInterestSent}
        />
        <ActionButton
          icon={isShortlisted ? "star" : "star-outline"}
          label="Shortlist"
          onPress={onShortlist}
          active={isShortlisted}
        />
        <ActionButton
          icon={isBlocked ? "close-circle" : "close-circle-outline"}
          label="Ignore"
          onPress={onIgnore}
          active={isBlocked}
        />
        <ActionButton
          icon="chatbubble-ellipses-outline"
          label="Chat"
          onPress={onChat}
        />
      </View>
    </Pressable>
  );
};

const ActionButton = ({
  icon,
  label,
  onPress,
  active,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
  active?: boolean;
}) => (
  <Pressable onPress={onPress} className="items-center">
    <View
      className={`w-11 h-11 rounded-full items-center justify-center ${
        active ? "bg-pink-600" : "bg-gray-100"
      }`}
    >
      <Ionicons name={icon} size={20} color={active ? "#fff" : "#374151"} />
    </View>
    <Text className="text-xs text-gray-600 mt-1">{label}</Text>
  </Pressable>
);

export default SearchResultCard;
