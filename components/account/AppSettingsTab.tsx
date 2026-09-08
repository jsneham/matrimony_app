import { SafetyCentreSection } from "@/components/account/SafetyCentreSection";
import React from "react";
import { View } from "react-native";

export const AppSettings = () => {
  return (
    <View className="flex-1 bg-app-background">
      <SafetyCentreSection />
    </View>
  );
};
