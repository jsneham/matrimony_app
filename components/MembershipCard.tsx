import { ApiPlanItem } from "@/types/plan";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Pressable, View } from "react-native";
import { Text } from "@/components/ui/Text";

interface Props {
  plan: ApiPlanItem;
  onContinue: (plan: ApiPlanItem) => void;
}

export const MembershipCard = ({ plan, onContinue }: Props) => {
  const offers = plan.plan_offers
    ? plan.plan_offers
        .split("\n")
        .map((item) => item.replace("-", "").trim())
        .filter(Boolean)
    : [];

  return (
    <View className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 mr-4 w-80">
      {/* Header */}

      <Text className="text-xl font-bold text-black">{plan.plan_name}</Text>

      <Text className="text-gray-500 mt-1">{plan.plan_duration} Days</Text>

      {/* Discount */}

      <View className="items-center my-5">
        <View
          style={{ backgroundColor: plan.color }}
          className="px-4 py-2 rounded-lg"
        >
          <Text className="text-white font-bold">{plan.offer_per}% OFF</Text>
        </View>

        <Text className="text-4xl font-bold mt-4">₹{plan.plan_amount}</Text>
      </View>

      {/* Features */}

      <View className="mb-4">
        <View className="flex-row mb-2">
          <MaterialCommunityIcons
            name="check-circle"
            color="#9D7E2B"
            size={18}
          />

          <Text className="ml-2">{plan.profile} Full Profile Views</Text>
        </View>

        <View className="flex-row mb-2">
          <MaterialCommunityIcons
            name="check-circle"
            color="#9D7E2B"
            size={18}
          />

          <Text className="ml-2">{plan.plan_contacts} Contact Numbers</Text>
        </View>

        <View className="flex-row mb-2">
          <MaterialCommunityIcons
            name="check-circle"
            color="#9D7E2B"
            size={18}
          />

          <Text className="ml-2">Chat : {plan.chat}</Text>
        </View>

        <View className="flex-row">
          <MaterialCommunityIcons
            name="check-circle"
            color="#9D7E2B"
            size={18}
          />

          <Text className="ml-2">Video : {plan.video}</Text>
        </View>
      </View>

      {/* Offers */}

      {offers.length > 0 && (
        <View className="bg-amber-50 rounded-lg p-3 mb-4">
          {offers.map((offer, index) => (
            <Text key={index} className="text-amber-700 text-sm mb-1">
              • {offer}
            </Text>
          ))}
        </View>
      )}

      <Pressable
        onPress={() => onContinue(plan)}
        className="bg-amber-600 rounded-lg py-3 items-center"
      >
        <Text className="text-white font-bold">Continue</Text>
      </Pressable>
    </View>
  );
};
