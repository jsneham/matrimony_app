import { router } from "expo-router";
import React, { useEffect } from "react";
import { View } from "react-native";

// This tab exists only to trigger navigation to the standalone
// search screen (app/search-matches.tsx) — it renders nothing itself.
export default function SearchTabTrigger() {
  useEffect(() => {
    router.push("/search-matches");
  }, []);

  return <View className="flex-1 bg-app-background" />;
}
