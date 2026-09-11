import { colors } from "@/constants/theme";
import { MenuItemProps } from "@/types/account";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, View } from "react-native";
import { Text } from "@/components/ui/Text";

export const MenuItem: React.FC<MenuItemProps> = ({
  icon,
  iconSet = "material",
  title,
  subtitle,
  onPress,
  isLast = false,
}) => (
  <View className="w-full">
    <Pressable
      onPress={onPress}
      className="w-full flex-row items-center py-5 px-5"
    >
      {iconSet === "feather" ? (
        <View className="w-6 h-6 items-center justify-center">
          <Feather name={icon as any} size={20} color={colors.black} />
        </View>
      ) : (
        <MaterialCommunityIcons
          name={icon as any}
          size={24}
          color={colors.black}
        />
      )}
      <View className="ml-4 flex-1">
        <Text className="text-base font-bold text-black">{title}</Text>
        {subtitle ? (
          <Text className="text-sm text-gray-500 mt-1 font-regular">{subtitle}</Text>
        ) : null}
      </View>
      <Ionicons name="chevron-forward" size={16} color={colors.gray} />
    </Pressable>
    {!isLast && <View className="h-px bg-gray-100 mx-5" />}
  </View>
);
