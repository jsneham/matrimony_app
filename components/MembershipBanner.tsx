import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

export const MembershipBanner = () => (
  <View
    className="mx-4 mt-4 rounded-2xl px-5 py-4 flex-row items-center justify-between"
    style={{ backgroundColor: "#fdf6e3" }}
  >
    <Text className="text-gray-800 text-base font-semibold">Gold 1 month</Text>
    <TouchableOpacity
      className="flex-row items-center px-5 py-2.5 rounded-xl"
      style={{ backgroundColor: "#b8960c" }}
    >
      <Ionicons name="star" size={14} color="white" />
      <Text className="text-white text-sm font-bold ml-2 tracking-wide">
        UPGRADE MEMBERSHIP
      </Text>
    </TouchableOpacity>
  </View>
);
