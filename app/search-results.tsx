import ChevronLeftIcon from "@/assets/icons/ChevronLeftIcon";
import PremiumTag from "@/assets/icons/PremiumTag";
import PremiumTagSmallCircle from "@/assets/icons/PremiumTagSmallCircle";
import { router } from "expo-router";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const placeholderPhoto = require("@/assets/images/search-results-placeholder.png");

export default function SearchResultsScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-app-background">
      {/* Header */}
      <View
        className="bg-white flex-row items-center"
        style={{ paddingTop: insets.top }}
      >
        <Pressable
          onPress={() => router.back()}
          hitSlop={10}
          style={{ width: 44, height: 49, justifyContent: "center", paddingLeft: 20 }}
        >
          <ChevronLeftIcon size={24} color="black" />
        </Pressable>
        <Text className="flex-1 text-center text-lg font-bold text-black" style={{ marginRight: 44 }}>
          Here&apos;s what we found!
        </Text>
      </View>

      <View className="flex-1 px-5 pt-5">
        {/* Upgrade banner */}
        <View className="flex-row items-center bg-gold-tint rounded-lg px-3 py-3">
          <PremiumTagSmallCircle size={30} />
          <Text className="flex-1 ml-3 text-[13px] leading-5">
            <Text className="font-bold text-gold">
              Upgrade to Premium Gold Membership{" "}
            </Text>
            <Text className="text-black">
              to view all these matches &amp; save your search.
            </Text>
          </Text>
        </View>

        {/* Blurred result card */}
        <View className="mt-4 rounded-2xl overflow-hidden bg-gray-200 h-[526px]">
          <Image
            source={placeholderPhoto}
            style={{ width: "100%", height: "100%" }}
            resizeMode="cover"
            blurRadius={12}
          />
          <View
            className="bg-overlay-black-50"
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
            }}
          />

          <View className="absolute" style={{ top: 12, left: 12 }}>
            <PremiumTag width={78} height={30} />
          </View>
        </View>
      </View>

      {/* Footer */}
      <View
        className="bg-app-background px-5 pt-4"
        style={{ paddingBottom: Math.max(insets.bottom, 16) }}
      >
        <Pressable className="py-4 bg-gold rounded-full items-center active:opacity-90">
          <Text className="text-white font-bold text-base">
            Save this matches search
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
