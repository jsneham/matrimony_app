import LockAltIcon from "@/assets/icons/LockAltIcon";
import PremiumTag from "@/assets/icons/PremiumTag";
import { VisitorCardProps } from "@/types/matches";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Image, Text, View } from "react-native";

export const VisitorCard: React.FC<VisitorCardProps> = ({
  name,
  age,
  height,
  photoUri,
  isPremium,
  isLocked,
}) => (
  <View className="w-[150px] h-[225px] rounded-xl overflow-hidden bg-gray-200 mr-4">
    {photoUri ? (
      <Image
        source={{ uri: photoUri }}
        style={{ width: "100%", height: "100%" }}
        resizeMode="cover"
      />
    ) : (
      <View className="w-full h-full items-center justify-center bg-gray-200">
        <Ionicons name="person" size={48} color="#9ca3af" />
      </View>
    )}

    <LinearGradient
      colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.5)"]}
      locations={[0, 0.9981]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
    />

    {isLocked && (
      <View className="absolute inset-0 items-center justify-center">
        <LockAltIcon size={40} color="#fff" />
      </View>
    )}

    {isPremium && (
      <View className="absolute top-3 left-3">
        <PremiumTag />
      </View>
    )}

    <View className="absolute bottom-0 left-0 right-0 px-3 pb-3">
      <Text className="text-white text-base font-bold" numberOfLines={1}>
        {name}
      </Text>
      <View className="flex-row items-center gap-[6px] mt-2">
        <Text className="text-white text-base font-regular">{age}</Text>
        <View className="w-1 h-1 rounded-full bg-white" />
        <Text className="text-white text-base font-regular">{height}</Text>
      </View>
    </View>
  </View>
);

export default VisitorCard;
