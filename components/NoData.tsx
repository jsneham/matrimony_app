import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

export const NoData = () => {
  return (
    <View className="flex-1 items-center justify-center px-6">
      <Ionicons name="heart-dislike" size={48} color="#9ca3af" />
      <Text className="text-gray-500 font-semibold mt-4 text-center">
        No more matches available
      </Text>
      <Text className="text-gray-400 text-sm mt-2 text-center">
        Check back later for new matches
      </Text>
    </View>
  );
};
