// screens/MembershipPlanScreen.tsx
import { MembershipCard } from "@/components/MembershipCard";
import { MembershipPlan, membershipTabs } from "@/types/plan";
import { useWhatsApp } from "@/utils/whatsappUtils";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { FlatList, Pressable, ScrollView, Text, View } from "react-native";

const MembershipPlanList = () => {
  const { openWhatsApp, loading } = useWhatsApp();
  const [activeTabId, setActiveTabId] = useState(membershipTabs[0].id);
  const router = useRouter();

  const activeTab = membershipTabs.find((tab) => tab.id === activeTabId);

  const handleContinue = (plan: MembershipPlan) => {
    console.log("Selected plan:", plan);
    // Navigate to payment or checkout
    // router.push({
    //   pathname: "/(app)/checkout",
    //   params: { planId: plan.id },
    // });
  };

  console.log("MembershipPlanList called");

  return (
    <View className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Tabs */}
        <View className="px-4 py-6">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mb-6"
          >
            {membershipTabs.map((tab) => {
              const isActive = tab.id === activeTabId;
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

          {/* Tab Description */}
          {activeTab && (
            <Text className="text-gray-600 text-sm mb-4">
              {activeTab.description}
            </Text>
          )}
        </View>

        {/* Membership Cards Carousel */}
        {activeTab && (
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
