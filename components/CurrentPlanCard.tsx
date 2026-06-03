import DiamondIcon from "@/assets/icons/DiamondIcon";
import { PLAN_BASIC, PLAN_EXTRA } from "@/types/plan";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { DetailRow } from "./DetailRow";

const CurrentPlanCard = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Card Header */}
      <View className="flex-row items-center px-5 py-4">
        <DiamondIcon />
        <Text className="text-gray-900 text-base font-bold tracking-wide">
          GOLD 1 MONTH
        </Text>
      </View>

      {/* Divider */}
      <View className="h-px bg-gray-100 mx-4" />

      {/* Basic Details - always visible */}
      <View className="px-5">
        {PLAN_BASIC.map((item, index) => (
          <View key={index}>
            <DetailRow {...item} />
            {index < PLAN_BASIC.length - 1 && (
              <View className="h-px bg-gray-50" />
            )}
          </View>
        ))}
      </View>

      {/* Expanded Details */}
      {expanded && (
        <View className="px-5">
          <View className="h-px bg-gray-100 mb-1" />
          {PLAN_EXTRA.map((item, index) => (
            <View key={index}>
              <DetailRow {...item} />
              {index < PLAN_EXTRA.length - 1 && (
                <View className="h-px bg-gray-50" />
              )}
            </View>
          ))}
        </View>
      )}

      {/* Divider */}
      <View className="h-px bg-gray-100 mx-4 mt-1" />

      {/* Show More / Show Less Toggle */}
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
    </View>
  );
};

export default CurrentPlanCard;
