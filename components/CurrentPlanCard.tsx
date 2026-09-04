import DiamondIcon from "@/assets/icons/DiamondIcon";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import { Text } from "@/components/ui/Text";

import { useCurrentPlan } from "@/hooks/useCurrentPlan";
import { DetailRow } from "./DetailRow";

const formatDate = (dateString?: string) => {
  if (!dateString) return "N/A";

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return dateString;
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const CurrentPlanCard = () => {
  const [expanded, setExpanded] = useState(false);

  const { data, isLoading, isError } = useCurrentPlan();

  if (isLoading) {
    return (
      <View className="bg-white rounded-2xl shadow-sm border border-gray-100 py-8 items-center justify-center">
        <ActivityIndicator size="small" color="#f97316" />
      </View>
    );
  }

  if (isError || !data || data.status !== "success" || !data.data) {
    return null;
  }

  const plan = data.data;

  const planName = plan.plan_name ?? "No Active Plan";

  const basicDetails = [
    {
      label: "Plan Duration",
      value: `${plan.plan_duration ?? "0"} Days`,
    },
    {
      label: "Plan Expiry Date",
      value: formatDate(plan.plan_expired),
    },
    {
      label: "Plan Activation Date",
      value: formatDate(plan.plan_activated),
    },
  ];

  const offerText =
    plan.offer_per && plan.offer_per !== "0" ? `${plan.offer_per}% Off` : "N/A";

  const extraDetails = [
    {
      label: "View Contact Numbers",
      value: `${plan.contacts_used ?? "0"} out of ${plan.contacts ?? "0"}`,
    },
    {
      label: "View Full Profiles",
      value: `${plan.profile_used ?? "0"} out of ${plan.profile ?? "0"}`,
    },
    {
      label: "Messages",
      value: `${plan.message_used ?? "0"} out of ${plan.message ?? "0"}`,
    },
    {
      label: "Actual Plan Price",
      value: `${plan.currency ?? "INR"} ${plan.plan_amount ?? "0"}`,
    },
    {
      label: `Discounted Price (${plan.offer_per ?? "0"}% Off)`,
      value: `${plan.currency ?? "INR"} ${plan.grand_total ?? "0"}`,
    },
    {
      label: "Offer Discount",
      value: offerText,
    },
    {
      label: `${plan.tax_name ?? "GST"} (${plan.tax_percentage ?? "0"}%)`,
      value: `${plan.currency ?? "INR"} ${plan.tax_amount ?? "0"}`,
    },
    {
      label: "Final Billed Amount",
      value: `${plan.currency ?? "INR"} ${plan.grand_total ?? "0"}`,
      highlight: true,
    },
  ];

  return (
    <View className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Card Header */}
      <View className="flex-row items-center px-5 py-4">
        <DiamondIcon />

        <Text className="text-gray-900 text-base font-bold tracking-wide">
          {planName.toUpperCase()}
        </Text>
      </View>

      <View className="h-px bg-gray-100 mx-4" />

      {/* Basic Details */}
      <View className="px-5">
        {basicDetails.map((item, index) => (
          <View key={item.label}>
            <DetailRow {...item} />

            {index < basicDetails.length - 1 && (
              <View className="h-px bg-gray-50" />
            )}
          </View>
        ))}
      </View>

      {/* Extra Details */}
      {expanded && extraDetails.length > 0 && (
        <View className="px-5">
          <View className="h-px bg-gray-100 mb-1" />

          {extraDetails.map((item, index) => (
            <View key={item.label}>
              <DetailRow {...item} />

              {index < extraDetails.length - 1 && (
                <View className="h-px bg-gray-50" />
              )}
            </View>
          ))}
        </View>
      )}

      <View className="h-px bg-gray-100 mx-4 mt-1" />

      {/* Show More / Show Less */}
      {extraDetails.length > 0 && (
        <TouchableOpacity
          onPress={() => setExpanded((prev) => !prev)}
          className="flex-row items-center justify-center py-4"
          activeOpacity={0.7}
        >
          <Text className="text-orange-500 text-sm font-bold mr-1">
            {expanded ? "show less" : "show more"}
          </Text>

          <Ionicons
            name={expanded ? "chevron-up" : "chevron-down"}
            size={14}
            color="#f97316"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CurrentPlanCard;
