import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Href, router } from "expo-router";
import { Pressable, View } from "react-native";

export const HeaderMenu = () => {
  return (
    <View className="flex-row items-center gap-4 mr-4">
      {/* Notification Bell */}
      <Pressable onPress={() => router.push("/(notification)" as Href)}>
        <MaterialCommunityIcons name="bell-outline" size={24} />
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
