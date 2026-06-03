import { PlanDetail } from "@/types/plan";
import { Text, View } from "react-native";

export const DetailRow: React.FC<PlanDetail> = ({
  label,
  value,
  highlight,
}) => (
  <View className="flex-row items-center py-3">
    <Text className="flex-1 text-gray-400 text-sm">{label}</Text>
    <Text className="text-gray-400 text-sm mr-3">:</Text>
    <Text
      className={`text-sm font-semibold ${
        highlight ? "text-orange-500" : "text-gray-900"
      }`}
    >
      {value}
    </Text>
  </View>
);
