import { PlanDetail } from "@/types/plan";
import { View } from "react-native";
import { Text } from "@/components/ui/Text";

export const DetailRow: React.FC<PlanDetail> = ({
  label,
  value,
  highlight,
}) => (
  <View className="flex-row items-center py-3">
    <Text className="flex-1 text-gray-400 text-sm font-regular">{label}</Text>
    <Text className="text-gray-400 text-sm mr-3 font-regular">:</Text>
    <Text
      className={`text-sm font-bold ${
        highlight ? "text-orange-500" : "text-gray-900"
      }`}
    >
      {value}
    </Text>
  </View>
);
