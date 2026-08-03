import { MembershipCard } from "@/components/MembershipCard";
import { usePlanList } from "@/hooks/usePlanList";
import { ApiPlanCategory, ApiPlanItem } from "@/types/plan";
import { useWhatsApp } from "@/utils/whatsappUtils";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

const MembershipPlanList = () => {
  const { openWhatsApp, loading } = useWhatsApp();
  const { data, isLoading } = usePlanList();

  // Categories from API
  const categories: ApiPlanCategory[] = useMemo(() => {
    return data?.plan_data ?? [];
  }, [data]);

  const [activeTabId, setActiveTabId] = useState<string | null>(null);

  const activeTab =
    categories.find((item) => item.id === activeTabId) ?? categories[0];

  const handleContinue = (plan: ApiPlanItem) => {
    console.log("Selected Plan :", plan);
  };

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#0EA5E9" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Tabs */}
        <View className="px-4 py-6">
          {categories.length > 0 && (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mb-6"
            >
              {categories.map((category) => {
                const isActive = activeTab?.id === category.id;

                return (
                  <Pressable
                    key={category.id}
                    onPress={() => setActiveTabId(category.id)}
                    className="mr-6"
                  >
                    <Text
                      className={`text-base font-medium ${
                        isActive ? "text-sky-500" : "text-gray-600"
                      }`}
                    >
                      {category.category_name}
                    </Text>

                    {isActive && (
                      <View className="h-1 bg-sky-500 rounded-full mt-2 w-32" />
                    )}
                  </Pressable>
                );
              })}
            </ScrollView>
          )}

          {activeTab?.extra_text ? (
            <Text className="text-gray-600 text-sm mb-4">
              {activeTab.extra_text}
            </Text>
          ) : null}
        </View>

        {/* Plans */}
        {activeTab?.plan_data?.length ? (
          <View className="px-4 mb-8">
            <FlatList
              horizontal
              data={activeTab.plan_data}
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <MembershipCard plan={item} onContinue={handleContinue} />
              )}
            />
          </View>
        ) : (
          <View className="items-center py-10">
            <Text>No Plans Available</Text>
          </View>
        )}

        {/* WhatsApp */}
        <View className="px-4 mb-8">
          <Pressable
            onPress={openWhatsApp}
            disabled={loading}
            className="flex-row items-center justify-center border-2 border-sky-500 rounded-lg py-4"
          >
            <MaterialCommunityIcons name="whatsapp" size={24} color="#0EA5E9" />

            <Text className="text-sky-500 font-medium text-base ml-2">
              Need help? WhatsApp Now
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

export default MembershipPlanList;
