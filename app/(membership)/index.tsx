// screens/MembershipPlanScreen.tsx
import { MembershipCard } from "@/components/MembershipCard";
import { usePlanList } from "@/hooks/usePlanList";
import { ApiPlanItem } from "@/types/plan";
import { useWhatsApp } from "@/utils/whatsappUtils";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
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

  // ✅ Top-level plan_data IS the categories array
  const categories = data?.plan_data ?? [];

  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);

  // Default to the first category once data arrives
  useEffect(() => {
    if (categories.length > 0 && !activeCategoryId) {
      setActiveCategoryId(categories[0].id);
    }
  }, [categories, activeCategoryId]);

  const activeCategory =
    categories.find((c) => c.id === activeCategoryId) ?? categories[0];

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
          {categories.length > 1 && (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mb-6"
            >
              {categories.map((cat) => {
                const isActive = cat.id === activeCategory?.id;
                return (
                  <Pressable
                    key={cat.id}
                    onPress={() => setActiveCategoryId(cat.id)}
                    className="mr-6"
                  >
                    <Text
                      className={`text-center text-base font-medium ${
                        isActive ? "text-sky-500" : "text-gray-600"
                      }`}
                    >
                      {cat.category_name}
                    </Text>
                    {isActive && (
                      <View className="h-1 bg-sky-500 rounded-full mt-2 w-32" />
                    )}
                  </Pressable>
                );
              })}
            </ScrollView>
          )}

          {/* Tab Description */}
          {activeCategory?.extra_text && (
            <Text className="text-gray-600 text-sm mb-4">
              {activeCategory.extra_text}
            </Text>
          )}
        </View>

        {/* Membership Cards Carousel */}
        {activeCategory && activeCategory.plan_data?.length > 0 ? (
          <View className="px-4 mb-8">
            <FlatList
              data={activeCategory.plan_data}
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
