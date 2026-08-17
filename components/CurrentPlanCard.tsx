import DiamondIcon from "@/assets/icons/DiamondIcon";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { DetailRow } from "./DetailRow";

import { useCurrentPlan } from "@/hooks/useCurrentPlan";
import { CurrentPlanData, PLAN_BASIC, PLAN_EXTRA } from "@/types/plan";

const CurrentPlanCard = () => {
  const [expanded, setExpanded] = useState(false);
  const { data, isLoading, isError } = useCurrentPlan();
  const currentPlanData = data as unknown as CurrentPlanData;
  console.log("Current Plan", data);

  if (isLoading) {
    return (
      <View className="bg-white rounded-2xl shadow-sm border border-gray-100 py-8 items-center justify-center">
        <ActivityIndicator size="small" color="#f97316" />
      </View>
    );
  }

  if (isError || !currentPlanData) {
    return null;
  }

  const planName = currentPlanData.plan_name ?? "No Active Plan";
  // const basicDetails = currentPlanData.basic_details ?? [];
  // const extraDetails = currentPlanData.extra_details ?? [];
  const basicDetails = PLAN_BASIC;
  const extraDetails = PLAN_EXTRA;

  return (
    <View className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Card Header */}
      <View className="flex-row items-center px-5 py-4">
        <DiamondIcon />
        <Text className="text-gray-900 text-base font-bold tracking-wide">
          {planName.toUpperCase()}
        </Text>
      </View>

      {/* Divider */}
      <View className="h-px bg-gray-100 mx-4" />

      {/* Basic Details - always visible */}
      <View className="px-5">
        {basicDetails.map((item, index) => (
          <View key={index}>
            <DetailRow {...item} />
            {index < basicDetails.length - 1 && (
              <View className="h-px bg-gray-50" />
            )}
          </View>
        ))}
      </View>

      {/* Expanded Details */}
      {expanded && extraDetails.length > 0 && (
        <View className="px-5">
          <View className="h-px bg-gray-100 mb-1" />
          {extraDetails.map((item, index) => (
            <View key={index}>
              <DetailRow {...item} />
              {index < extraDetails.length - 1 && (
                <View className="h-px bg-gray-50" />
              )}
            </View>
          ))}
        </View>
      )}

      {/* Divider */}
      <View className="h-px bg-gray-100 mx-4 mt-1" />

      {/* Show More / Show Less Toggle — only if there's anything extra to show */}
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
