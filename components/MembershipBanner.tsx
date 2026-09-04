import { UserProfile } from "@/types/profile";
import { Ionicons } from "@expo/vector-icons";
import { Href, router } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import { Text } from "@/components/ui/Text";

export const MembershipBanner = (props: {
  userData: UserProfile | undefined;
}) => {
  const { userData } = props;

  return (
    <View
      className="mx-5 mt-4 rounded-2xl px-5 py-4 flex-row items-center justify-between"
      style={{ backgroundColor: "#fdf6e3" }}
    >
      <Text className="text-gray-800 text-base font-bold">
        {userData?.plan_name}
      </Text>
      <TouchableOpacity
        onPress={() => {
          router.push("/(membership)" as Href);
        }}
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
};
