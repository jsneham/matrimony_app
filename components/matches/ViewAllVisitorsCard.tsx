import { Pressable, Text, View } from "react-native";

export const ViewAllVisitorsCard = ({ onPress }: { onPress?: () => void }) => (
  <Pressable
    onPress={onPress}
    className="w-[150px] h-[225px] rounded-xl border border-gray-100 bg-white items-center justify-center mr-4"
  >
    <View className="flex-row">
      {[0, 1, 2, 3, 4].map((i) => (
        <View
          key={i}
          className={`w-9 h-9 rounded-full bg-white border border-gray-100 ${
            i === 0 ? "" : "-ml-[18px]"
          }`}
        />
      ))}
    </View>
    <Text className="text-black text-sm font-bold underline mt-3">
      View All
    </Text>
  </Pressable>
);

export default ViewAllVisitorsCard;
