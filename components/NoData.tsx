import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

export const NoData = ({
  mainMessage,
  subText,
}: {
  mainMessage?: string;
  subText?: string;
}) => {
  return (
    <View className="flex-1 items-center justify-center px-6">
      <Ionicons name="heart-dislike" size={48} color="#9ca3af" />
      <Text className="text-gray-500 font-bold mt-4 text-center">
        {mainMessage || "No more matches available"}
      </Text>
      <Text className="text-gray-400 text-sm mt-2 text-center">
        {subText || "Check back later for new matches"}
      </Text>
    </View>
  );
};
