import { colors } from "@/constants/theme";
import { MenuItemProps } from "@/types/account";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

export const MenuItem: React.FC<MenuItemProps> = ({
  icon,
  title,
  subtitle,
  onPress,
}) => (
  <Pressable
    onPress={onPress}
    className="flex-row items-center py-4 px-4 border-b border-gray-100"
  >
    <MaterialCommunityIcons name={icon} size={28} color={colors.black} />
    <View className="ml-4 flex-1">
      <Text className="text-base font-bold text-black">{title}</Text>
      <Text className="text-sm text-gray-500 mt-1">{subtitle}</Text>
    </View>
    {/* <MaterialCommunityIcons
      name="chevron-right"
      size={24}
      color={colors.black}
    /> */}
  </Pressable>
);
