import { Pressable, Text } from "react-native";

export const ProfileCompletionCard: React.FC<{
  onPress: () => void;
  profileCompletion: number;
}> = ({ onPress, profileCompletion }) => (
  <Pressable
    onPress={onPress}
    className="bg-gray-50 rounded-lg p-4 items-center mr-2 flex-1"
  >
    <Text className="text-lg font-bold text-black">{profileCompletion} %</Text>
    <Text className="text-xs text-gray-500 text-center mt-2">
      Profile Completed
    </Text>
    <Text className="text-sm font-bold text-black text-center mt-1">
      Update
    </Text>
  </Pressable>
);
