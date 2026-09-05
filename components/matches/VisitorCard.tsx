import LockAltIcon from "@/assets/icons/LockAltIcon";
import { Text } from "@/components/ui/Text";
import { VisitorCardProps } from "@/types/matches";
import { colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Image, Pressable, View } from "react-native";

// Figma: linear-gradient(180deg, rgba(255,255,255,0) 69.00%, rgba(0,0,0,0.8) 100%)
const FADE_START_PERCENT = 0.69;
const FADE_END_PERCENT = 1;

export const VisitorCard: React.FC<
  VisitorCardProps & { onPress?: () => void }
> = ({
  name,
  age,
  height,
  photoUri,
  isPremium,
  badgeUri,
  isLocked,
  size = "large",
  placeholderColor = "#e5e7eb",
  onPress,
}) => {
  const isSmall = size === "small";
  const dimensionClass = isSmall
    ? "w-[100px] h-[150px]"
    : "w-[150px] h-[225px]";

  return (
    <Pressable onPress={onPress} disabled={!onPress}>
      <View
        className={`${dimensionClass} rounded-xl overflow-hidden mr-3`}
        style={{ backgroundColor: placeholderColor }}
      >
        {photoUri ? (
          <Image
            source={{ uri: photoUri }}
            style={{ width: "100%", height: "100%" }}
            resizeMode="cover"
          />
        ) : (
          <View
            className="w-full h-full items-center justify-center"
            style={{ backgroundColor: placeholderColor }}
          >
            <Ionicons name="person" size={isSmall ? 32 : 48} color={colors.gray} />
          </View>
        )}

        {photoUri && (
          <LinearGradient
            colors={["rgba(255,255,255,0)", "rgba(0,0,0,0.8)"]}
            locations={[FADE_START_PERCENT, FADE_END_PERCENT]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
            }}
          />
        )}

        {isLocked && (
          <View className="absolute inset-0 items-center justify-center">
            <LockAltIcon size={isSmall ? 28 : 40} color="#fff" />
          </View>
        )}

        {isPremium && badgeUri && (
          <View
            className={
              isSmall ? "absolute top-2 left-2" : "absolute top-3 left-3"
            }
            style={{
              width: isSmall ? 48 : 68,
              height: isSmall ? 18 : 24,
              overflow: "hidden",
            }}
          >
            <Image
              source={{ uri: badgeUri }}
              style={{
                width: isSmall ? 58 : 84,
                height: isSmall ? 58 : 84,
                position: "absolute",
                top: 0,
                left: 0,
              }}
            />
          </View>
        )}

        {name && (
          <View className="absolute bottom-0 left-0 right-0 px-3 pb-3">
            <Text
              className={`text-white font-bold ${isSmall ? "text-xs" : "text-base"}`}
              numberOfLines={1}
            >
              {name}
            </Text>
            <View
              className={`flex-row items-center gap-[6px] ${isSmall ? "mt-0.5" : "mt-1"}`}
            >
              <Text
                className={`text-white font-regular ${isSmall ? "text-xs" : "text-base"}`}
              >
                {age}
              </Text>
              <View
                className={`${isSmall ? "w-0.5 h-0.5" : "w-1 h-1"} rounded-full bg-white`}
              />
              <Text
                className={`text-white font-regular ${isSmall ? "text-xs" : "text-base"}`}
              >
                {height}
              </Text>
            </View>
          </View>
        )}
      </View>
    </Pressable>
  );
};

export default VisitorCard;
