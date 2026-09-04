// components/HeaderMenu.tsx
import { useMyProfile } from "@/hooks/useProfile";
import { useSession } from "@/hooks/useSession";
import { SESSION_KEYS } from "@/types/common";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Href, router } from "expo-router";
import { Pressable, View } from "react-native";
import { Text } from "@/components/ui/Text";

export const HeaderMenu = () => {
  const { data: sessionData } = useSession([SESSION_KEYS.USER_ID]);
  const memberId = sessionData?.[SESSION_KEYS.USER_ID] || "";

  const { data: profileResponse } = useMyProfile({ memberId });
  const profile = profileResponse?.data;

  const unreadCount = Number(profile?.notification_message_count) || 0;
  const hasUnread = unreadCount > 0;

  return (
    <View className="flex-row items-center gap-4 mr-4">
      {/* Notification Bell */}
      <Pressable
        onPress={() => router.push("/(notification)" as Href)}
        hitSlop={8}
        style={{ position: "relative" }}
      >
        <MaterialCommunityIcons name="bell-outline" size={24} />

        {hasUnread && (
          <View
            style={{
              position: "absolute",
              top: -4,
              right: -6,
              minWidth: 16,
              minHeight: 16,
              borderRadius: 8,
              backgroundColor: "#EF4444",
              alignItems: "center",
              justifyContent: "center",
              paddingHorizontal: 3,
              borderWidth: 1.5,
              borderColor: "white",
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 10,
                fontWeight: "700",
                lineHeight: 12,
              }}
              numberOfLines={1}
            >
              {unreadCount > 99 ? "99+" : unreadCount}
            </Text>
          </View>
        )}
      </Pressable>

      {/* Profile/Menu Circle */}
      <Pressable hitSlop={8} onPress={() => router.push("/(account)" as Href)}>
        <View className="w-8 h-8 rounded-full items-center justify-center bg-gray">
          <MaterialCommunityIcons name="account" size={18} color="white" />
        </View>
      </Pressable>
    </View>
  );
};
