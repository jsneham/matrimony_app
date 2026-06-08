// components/MembershipCard.tsx
import { MembershipPlan } from "@/types/plan";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";

interface MembershipCardProps {
  plan: MembershipPlan;
  onContinue: (plan: MembershipPlan) => void;
}

export const MembershipCard: React.FC<MembershipCardProps> = ({
  plan,
  onContinue,
}) => {
  const getTypeColor = () => {
    switch (plan.type) {
      case "PLATINUM":
        return { bg: "bg-purple-100", text: "text-purple-700" };
      case "DIAMOND":
        return { bg: "bg-blue-100", text: "text-blue-700" };
      default:
        return { bg: "bg-amber-100", text: "text-amber-700" };
    }
  };

  const colors = getTypeColor();

  return (
    <View className="bg-white rounded-2xl p-4 mr-4 shadow-md border border-gray-100 w-80">
      {/* Header */}
      <View className="mb-4">
        <View className="flex-row justify-between items-start mb-2">
          <View>
            <Text className="text-black font-bold text-lg">{plan.name}</Text>
            <Text className="text-gray-500 text-sm mt-1">
              {plan.daysLeft} Days
            </Text>
          </View>
          <View className={`${colors.bg} px-3 py-1 rounded`}>
            <Text className={`${colors.text} font-bold text-xs`}>
              {plan.type}
            </Text>
          </View>
        </View>
      </View>

      {/* Discount Badge and Prices */}
      <View className="bg-gradient-to-b from-amber-50 to-white rounded-lg p-4 mb-4 items-center">
        <View className="bg-amber-600 px-4 py-2 rounded-lg mb-3">
          <Text className="text-white font-bold text-sm">
            {plan.discountPercent}% OFF
          </Text>
        </View>

        <Text className="text-gray-500 line-through text-sm mb-1">
          ₹{plan.originalPrice.toLocaleString("en-IN")}
        </Text>

        <Text className="text-black font-bold text-3xl mb-1">
          ₹{plan.finalPrice}
        </Text>

        <Text className="text-gray-600 text-sm">
          ₹{plan.pricePerDay.toFixed(2)} per day
        </Text>
      </View>

      {/* Features */}
      <View className="mb-4">
        {plan.features.map((feature, index) => (
          <View key={index} className="flex-row items-start mb-2">
            <MaterialCommunityIcons
              name="check-circle"
              size={20}
              color="#9D7E2B"
              style={{ marginRight: 8, marginTop: 2 }}
            />
            <Text className="text-gray-900 text-sm flex-1">{feature}</Text>
          </View>
        ))}
      </View>

      {/* Additional Info */}
      <View className="bg-amber-50 rounded-lg p-3 mb-4">
        {plan.additionalInfo.map((info, index) => (
          <Text key={index} className="text-amber-700 text-xs mb-1">
            {"\u2022"} {info}
          </Text>
        ))}
      </View>

      {/* Continue Button */}
      <Pressable
        onPress={() => onContinue(plan)}
        className="bg-amber-600 rounded-lg py-3 items-center active:bg-amber-700"
      >
        <Text className="text-white font-bold text-base">Continue</Text>
      </Pressable>
    </View>
  );
};
