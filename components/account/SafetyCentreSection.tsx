import { Feather } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type SafetyCard = {
  id: string;
  label: string;
  icon: React.ComponentProps<typeof Feather>["name"];
  onPress?: () => void;
};

const SAFETY_CARDS: SafetyCard[] = [
  { id: "online-safety", label: "Online Safety", icon: "shield" },
  {
    id: "fraud-protection",
    label: "Fraud Protection",
    icon: "alert-triangle",
  },
  { id: "personal-meeting", label: "Personal Meeting", icon: "users" },
  { id: "mental-wellbeing", label: "Mental Wellbeing", icon: "smile" },
];

const SafetyCard = ({ card }: { card: SafetyCard }) => (
  <Pressable
    onPress={card.onPress}
    className="flex-1 bg-white rounded-xl p-1 active:opacity-80"
  >
    <View className="h-[84px] bg-[#f3f3f3] rounded-t-[10px] items-center justify-center">
      <Feather name={card.icon} size={28} color="#9ca3af" />
    </View>
    <Text className="text-base font-bold text-black text-center px-3 pt-3 pb-3">
      {card.label}
    </Text>
  </Pressable>
);

export const SafetyCentreSection = () => {
  const insets = useSafeAreaInsets();

  return (
    <View className="px-5" style={{ paddingTop: insets.top + 12 }}>
      <Text className="mb-5 text-sm font-bold text-black">Safety Centre</Text>
      <View className="mb-4 flex-row gap-4">
        {SAFETY_CARDS.slice(0, 2).map((card) => (
          <SafetyCard key={card.id} card={card} />
        ))}
      </View>
      <View className="flex-row gap-4">
        {SAFETY_CARDS.slice(2, 4).map((card) => (
          <SafetyCard key={card.id} card={card} />
        ))}
      </View>
    </View>
  );
};

export default SafetyCentreSection;
