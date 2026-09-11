import { Pressable, View } from "react-native";
import { Text } from "@/components/ui/Text";

type ViewAllVisitorsCardProps = {
  onPress?: () => void;
  size?: "large" | "small";
};

export const ViewAllVisitorsCard = ({
  onPress,
  size = "large",
}: ViewAllVisitorsCardProps) => {
  const isSmall = size === "small";

  return (
    <Pressable
      onPress={onPress}
      className={`${
        isSmall ? "w-[100px] h-[150px]" : "w-[150px] h-[225px]"
      } rounded-xl border border-gray-100 bg-white items-center justify-center mr-4`}
    >
      <View className="flex-row">
        {[0, 1, 2, 3, 4].map((i) => (
          <View
            key={i}
            className={`${isSmall ? "w-6 h-6" : "w-9 h-9"} rounded-full bg-white border border-gray-100 ${
              i === 0 ? "" : isSmall ? "-ml-3" : "-ml-[18px]"
            }`}
          />
        ))}
      </View>
      <Text
        className={`text-black font-bold underline mt-3 ${
          isSmall ? "text-[9px]" : "text-sm"
        }`}
      >
        View All
      </Text>
    </Pressable>
  );
};

export default ViewAllVisitorsCard;
