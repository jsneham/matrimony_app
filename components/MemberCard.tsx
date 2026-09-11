import { MemberCardProps } from "@/types/home";
import { Ionicons } from "@expo/vector-icons";
import { Image, View } from "react-native";
import { Text } from "@/components/ui/Text";
import { colors } from "@/constants/theme";

export const MemberCard: React.FC<MemberCardProps> = ({
  name,
  matriId,
  age,
  height,
  religion,
  caste,
  education,
  location,
  photoUri,
}) => (
  <View className="w-44 rounded-2xl overflow-hidden bg-white mr-3 border border-gray-100">
    {/* Photo */}
    <View className="relative">
      {photoUri ? (
        <Image
          source={{ uri: photoUri }}
          style={{ width: "100%", height: 160 }}
          resizeMode="cover"
        />
      ) : (
        <View
          className="items-center justify-center bg-gray-200"
          style={{ width: "100%", height: 160 }}
        >
          <Ionicons name="person" size={64} color={colors.gray} />
        </View>
      )}
      {/* Name overlay */}
      <View className="absolute bottom-0 left-0 right-0 bg-black/50 px-2 py-1.5">
        <Text className="text-white text-xs font-bold" numberOfLines={1}>
          {name}
        </Text>
      </View>
    </View>

    {/* Info */}
    <View className="px-3 py-2.5">
      <Text className="text-gray-500 text-xs mb-1 font-regular">{matriId}</Text>
      <Text className="text-gray-600 text-xs mb-0.5 font-regular">
        {age}, {height}
      </Text>
      <Text className="text-gray-600 text-xs mb-0.5 font-regular" numberOfLines={1}>
        {religion}, {caste}
      </Text>
      <Text className="text-gray-600 text-xs mb-0.5 font-regular" numberOfLines={1}>
        {education}
      </Text>
      <Text className="text-gray-500 text-xs font-regular" numberOfLines={1}>
        {location}
      </Text>
    </View>
  </View>
);
