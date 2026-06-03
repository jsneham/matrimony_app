import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const tabs = ["Call Profiles Directly", "Send Interest", "Premium Plus"];

const plans = {
  "Call Profiles Directly": [
    {
      id: 1,
      title: "GOLD 6 MONTHS",
      duration: "180 Days",
      discount: "60% OFF",
      oldPrice: "₹2498",
      price: "₹999",
      perDay: "₹5.55 per day",
      features: [
        "Download One Pager Bio-Data",
        "500 Full Profile Views",
        "Search & Save Profiles",
        "Contact Matchmaker",
        "30 Contact Numbers of Profiles",
      ],
    },
    {
      id: 2,
      title: "GOLD 12 MONTHS",
      duration: "365 Days",
      discount: "70% OFF",
      oldPrice: "₹4998",
      price: "₹1499",
      perDay: "₹4.10 per day",
      features: [
        "1000 Full Profile Views",
        "Unlimited Search",
        "Save Profiles",
        "Contact Matchmaker",
        "50 Contact Numbers",
      ],
    },
  ],

  "Send Interest": [
    {
      id: 3,
      title: "INTEREST PLAN",
      duration: "90 Days",
      discount: "40% OFF",
      oldPrice: "₹999",
      price: "₹599",
      perDay: "₹6.65 per day",
      features: ["Unlimited Interests", "Profile Save", "Chat Access"],
    },
  ],

  "Premium Plus": [
    {
      id: 4,
      title: "PREMIUM PLUS",
      duration: "365 Days",
      discount: "75% OFF",
      oldPrice: "₹6999",
      price: "₹1999",
      perDay: "₹5.47 per day",
      features: [
        "Unlimited Contacts",
        "Priority Listing",
        "Dedicated Matchmaker",
        "Unlimited Views",
      ],
    },
  ],
};

export const MembershipPlanList = () => {
  const [selectedTab, setSelectedTab] = useState<string>(tabs[0]);

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      {/* Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="bg-white"
      >
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setSelectedTab(tab)}
            className="px-5 py-4"
          >
            <Text
              className={`font-semibold text-base ${
                selectedTab === tab ? "text-cyan-700" : "text-gray-500"
              }`}
            >
              {tab}
            </Text>

            {selectedTab === tab && (
              <View className="h-1 bg-cyan-700 rounded-full mt-2" />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Plan Cards */}
      {/* <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mt-4"
        contentContainerStyle={{
          paddingHorizontal: 16,
          gap: 16,
        }}
      >
        {plans[selectedTab].map((plan: any) => (
          <View
            key={plan.id}
            className="bg-white rounded-3xl p-5"
            style={{
              width: 320,
              elevation: 4,
            }}
          >
            <View className="flex-row justify-between">
              <Text className="font-bold text-lg">{plan.title}</Text>

              <Text className="text-gray-500">{plan.duration}</Text>
            </View>

            <View className="flex-row items-center mt-5">
              <View className="bg-yellow-700 px-4 py-2 rounded-lg">
                <Text className="text-white font-bold">{plan.discount}</Text>
              </View>

              <Text className="line-through text-gray-400 ml-3 text-lg">
                {plan.oldPrice}
              </Text>
            </View>

            <Text className="text-5xl font-bold text-center mt-6">
              {plan.price}
            </Text>

            <Text className="text-center text-gray-500 mt-2">
              {plan.perDay}
            </Text>

            <View className="mt-6 gap-3">
              {plan.features.map((item, index) => (
                <Text key={index} className="text-base">
                  ✓ {item}
                </Text>
              ))}
            </View>

            <TouchableOpacity
              className="mt-8 rounded-xl py-4 items-center"
              style={{ backgroundColor: "#a58b2f" }}
            >
              <Text className="text-white font-bold text-lg">Continue</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView> */}

      {/* WhatsApp Help */}
      <View className="px-4 pb-6 mt-auto">
        <TouchableOpacity className="border border-cyan-700 rounded-xl py-4 items-center">
          <Text className="text-cyan-700 font-medium">WhatsApp Support</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
