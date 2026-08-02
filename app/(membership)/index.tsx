// screens/MembershipPlanScreen.tsx
import { MembershipCard } from "@/components/MembershipCard";
import { usePlanList } from "@/hooks/usePlanList";
import { ApiPlanItem } from "@/types/plan";
import { useWhatsApp } from "@/utils/whatsappUtils";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
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
  const router = useRouter();
  const { data, isLoading } = usePlanList();

  const plans = data?.plan_data ?? [];

  // Group by `category` if the API provides one; otherwise show a single "All Plans" tab.
  // TODO: confirm whether `category` is the real grouping field, or if tabs are
  // determined some other way (e.g. a separate endpoint, or client-side by plan_type).
  const groupedTabs = useMemo(() => {
    const hasCategory = plans.some((p) => !!p.category);
    if (!hasCategory) {
      return [{ id: "all", title: "All Plans", plans }];
    }
    const map = new Map<string, ApiPlanItem[]>();
    plans.forEach((p) => {
      const key = p.category || "Other";
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(p);
    });
    return Array.from(map.entries()).map(([title, groupPlans]) => ({
      id: title,
      title,
      plans: groupPlans,
    }));
  }, [plans]);

  const [activeTabId, setActiveTabId] = useState<string | null>(null);
  const activeTab =
    groupedTabs.find((t) => t.id === activeTabId) ?? groupedTabs[0];

  const handleContinue = (plan: ApiPlanItem) => {
    console.log("Selected plan:", plan);
    // TODO: confirm real checkout route
    // router.push({
    //   pathname: "/checkout",
    //   params: { planId: plan.id },
    // });
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
          {groupedTabs.length > 1 && (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mb-6"
            >
              {groupedTabs.map((tab) => {
                const isActive = tab.id === activeTab?.id;
                return (
                  <Pressable
                    key={tab.id}
                    onPress={() => setActiveTabId(tab.id)}
                    className="mr-6"
                  >
                    <Text
                      className={`text-center text-base font-medium ${
                        isActive ? "text-sky-500" : "text-gray-600"
                      }`}
                    >
                      {tab.title}
                    </Text>
                    {isActive && (
                      <View className="h-1 bg-sky-500 rounded-full mt-2 w-32" />
                    )}
                  </Pressable>
                );
              })}
            </ScrollView>
          )}
        </View>

        {/* Membership Cards Carousel */}
        {activeTab && activeTab.plans.length > 0 ? (
          <View className="px-4 mb-8">
            <FlatList
              data={activeTab.plans}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <MembershipCard plan={item} onContinue={handleContinue} />
              )}
              scrollEnabled={true}
            />
          </View>
        ) : (
          <View className="px-4 mb-8 items-center">
            <Text className="text-gray-400">No plans available right now.</Text>
          </View>
        )}

        {/* WhatsApp Support Button */}
        <View className="px-4 mb-8">
          <Pressable
            onPress={openWhatsApp}
            disabled={loading}
            className="flex-row items-center justify-center border-2 border-sky-500 rounded-lg py-4 px-4 active:bg-sky-50"
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
