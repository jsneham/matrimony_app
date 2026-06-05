import { colors } from "@/constants/theme";
import { ActionCardProps } from "@/types/account";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, Text } from "react-native";

export const ActionCard: React.FC<ActionCardProps> = ({
  icon,
  subtitle,
  title,
  onPress,
}) => (
  <Pressable
    onPress={onPress}
    className="flex-1 bg-gray-50 rounded-lg p-4 items-center mr-2 last:mr-0"
  >
    <MaterialCommunityIcons name={icon} size={28} color={colors.accent} />
    <Text className="text-xs text-gray-500 text-center mt-2">{subtitle}</Text>
    <Text className="text-sm font-bold text-black text-center mt-1">
      {title}
    </Text>
  </Pressable>
);
