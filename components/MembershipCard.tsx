// components/MembershipCard.tsx
import { ApiPlanItem } from "@/types/plan";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";

interface MembershipCardProps {
  plan: ApiPlanItem;
  onContinue: (plan: ApiPlanItem) => void;
}

export const MembershipCard: React.FC<MembershipCardProps> = ({
  plan,
  onContinue,
}) => {
  const getTypeColor = () => {
    switch (plan.plan_type?.toUpperCase()) {
      case "PLATINUM":
        return { bg: "bg-purple-100", text: "text-purple-700" };
      case "DIAMOND":
        return { bg: "bg-blue-100", text: "text-blue-700" };
      default:
        return { bg: "bg-amber-100", text: "text-amber-700" };
    }
  };

  const colors = getTypeColor();

  const originalPrice = parseFloat(plan.original_price) || 0;
  const finalPrice = parseFloat(plan.final_price) || 0;
  const pricePerDay = parseFloat(plan.price_per_day) || 0;

  return (
    <View className="bg-white rounded-2xl p-4 mr-4 shadow-md border border-gray-100 w-80">
      {/* Header */}
      <View className="mb-4">
        <View className="flex-row justify-between items-start mb-2">
          <View>
            <Text className="text-black font-bold text-lg">
              {plan.plan_name}
            </Text>
            {plan.days_left && (
              <Text className="text-gray-500 text-sm mt-1">
                {plan.days_left} Days
              </Text>
            )}
          </View>
          <View className={`${colors.bg} px-3 py-1 rounded`}>
            <Text className={`${colors.text} font-bold text-xs`}>
              {plan.plan_type}
            </Text>
          </View>
        </View>
      </View>

      {/* Discount Badge and Prices */}
      <View className="bg-gradient-to-b from-amber-50 to-white rounded-lg p-4 mb-4 items-center">
        {plan.discount_percent && (
          <View className="bg-amber-600 px-4 py-2 rounded-lg mb-3">
            <Text className="text-white font-bold text-sm">
              {plan.discount_percent}% OFF
            </Text>
          </View>
        )}

        {originalPrice > 0 && originalPrice !== finalPrice && (
          <Text className="text-gray-500 line-through text-sm mb-1">
            ₹{originalPrice.toLocaleString("en-IN")}
          </Text>
        )}

        <Text className="text-black font-bold text-3xl mb-1">
          ₹{finalPrice.toLocaleString("en-IN")}
        </Text>

        {pricePerDay > 0 && (
          <Text className="text-gray-600 text-sm">
            ₹{pricePerDay.toFixed(2)} per day
          </Text>
        )}
      </View>

      {/* Features */}
      {plan.features && plan.features.length > 0 && (
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
      )}

      {/* Additional Info */}
      {plan.additional_info && plan.additional_info.length > 0 && (
        <View className="bg-amber-50 rounded-lg p-3 mb-4">
          {plan.additional_info.map((info, index) => (
            <Text key={index} className="text-amber-700 text-xs mb-1">
              {"\u2022"} {info}
            </Text>
          ))}
        </View>
      )}

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
