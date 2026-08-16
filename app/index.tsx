import "@/global.css";

import { useSession } from "@/hooks/useSession";
import { Redirect, router } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import images from "../constants/images";

export default function App() {
  const { isLoggedIn, isLoading } = useSession();
  const insets = useSafeAreaInsets();

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-black">
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (isLoggedIn) {
    return <Redirect href="/(tabs)" />;
  }

  return (
    <View className="flex-1 bg-black">
      <StatusBar barStyle="light-content" />

      <ImageBackground
        source={{
          uri: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=80",
        }}
        className="flex-1"
        resizeMode="cover"
      >
        <View className="flex-1 bg-black/40">
          <View
            className="items-center"
            style={{ paddingTop: insets.top + 24 }}
          >
            <View className="mb-4">
              <View className="h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-white">
                <Image
                  source={images.logo}
                  className="h-full w-full"
                  resizeMode="contain"
                />
              </View>
            </View>

            <Text className="mb-1 text-3xl font-bold text-white">Milan</Text>
            <Text className="mt-1 text-base tracking-[0.2em] text-white font-medium">
              MATRIMONY
            </Text>
          </View>

          <View className="flex-1" />

          <View className="px-6" style={{ paddingBottom: insets.bottom + 12 }}>
            <TouchableOpacity
              className="mb-4 rounded-xl bg-white py-4 shadow-lg"
              activeOpacity={0.8}
            >
              <Text className="text-center text-base font-bold text-black">
                New User? Create Account
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="mb-6 rounded-xl border-2 border-white bg-transparent py-4"
              activeOpacity={0.8}
              onPress={() => router.push("/login")}
            >
              <Text className="text-center text-base font-bold text-white">
                Already have an account? Login
              </Text>
            </TouchableOpacity>

            <View className="mb-2 items-center">
              <View className="flex-row flex-wrap justify-center">
                <Text className="text-sm text-white/80">
                  By continuing, you accept the{" "}
                </Text>
                <Text className="text-sm text-blue-400">terms</Text>
              </View>
              <View className="flex-row flex-wrap justify-center">
                <Text className="text-sm text-white/80">and </Text>
                <Text className="text-sm text-blue-400">privacy policy</Text>
              </View>
            </View>

            <Text className="mt-2 text-center text-xs text-white/60">
              App Version 171 ( 1.0.171 )
            </Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
