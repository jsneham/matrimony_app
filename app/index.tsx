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
import images from "../constants/images";

export default function App() {
  const { isLoggedIn, isLoading } = useSession();
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (isLoggedIn) {
    return <Redirect href="/(tabs)" />;
  }

  return (
    <View className="flex-1">
      <StatusBar barStyle="light-content" />

      <ImageBackground
        source={{
          uri: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=80",
        }}
        className="flex-1"
        resizeMode="cover"
      >
        {/* <LinearGradient
          colors={["rgba(0,0,0,0.4)", "rgba(0,0,0,0.4)", "rgba(0,0,0,0.7)"]}
          locations={[0, 0.5, 1]}
          className="flex-1"
        > */}
        {/* Overlay */}
        <View className="flex-1 bg-black/40">
          {/* Logo and Brand */}
          <View className="items-center pt-32">
            <View className="mb-4">
              <View className="w-16 h-16 bg-white rounded-full items-center justify-center overflow-hidden">
                <Image
                  source={images.logo}
                  className="w-full h-full"
                  resizeMode="contain"
                />
              </View>
            </View>

            <Text className="text-white text-4xl font-bold mb-1">Milan</Text>
            <Text className="text-white text-lg tracking-widest mt-1 font-medium">
              Matrimony
            </Text>
          </View>

          {/* Spacer */}
          <View className="flex-1" />

          {/* Bottom Buttons Section */}
          <View className="px-6 pb-12">
            {/* Create Account Button */}
            <TouchableOpacity
              className="bg-white rounded-xl py-4 mb-4 shadow-lg"
              activeOpacity={0.8}
            >
              <Text className="text-black text-center text-lg font-bold">
                New User? Create Account
              </Text>
            </TouchableOpacity>

            {/* Login Button */}
            <TouchableOpacity
              className="bg-transparent border-2 border-white rounded-xl py-4 mb-6"
              activeOpacity={0.8}
              onPress={() => router.push("/login")}
            >
              <Text className="text-white text-center text-lg font-bold">
                Already have an account? Login
              </Text>
            </TouchableOpacity>

            {/* Terms and Privacy */}
            <View className="items-center mb-2">
              <View className="flex-row">
                <Text className="text-white/80 text-sm">
                  By continuing, you accept the{" "}
                </Text>
                <Text className="text-blue-400 text-sm">terms</Text>
              </View>
              <View className="flex-row">
                <Text className="text-white/80 text-sm">and </Text>
                <Text className="text-blue-400 text-sm">privacy policy</Text>
              </View>
            </View>

            {/* App Version */}
            <Text className="text-white/60 text-center text-xs mt-2">
              App Version 171 ( 1.0.171 )
            </Text>
          </View>
        </View>
        {/* </LinearGradient> */}
      </ImageBackground>
    </View>
  );
}
