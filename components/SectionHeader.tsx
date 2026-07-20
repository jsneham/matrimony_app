import { Text, TouchableOpacity, View } from "react-native";

export const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
  <View className="flex-row items-center justify-between px-5 mb-3">
    <Text className="text-gray-900 text-2xl font-bold">{title}</Text>
    <TouchableOpacity>
      <Text className="text-orange-500 text-sm font-bold">See All</Text>
    </TouchableOpacity>
  </View>
);
