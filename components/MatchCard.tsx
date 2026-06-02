import { MatchCardProps } from "@/types/matches";
import { LinearGradient } from "expo-linear-gradient";
import React, { useRef } from "react";
import { Animated, Image, Text, TouchableOpacity, View } from "react-native";

export const MatchCard: React.FC<MatchCardProps> = ({ profile }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={{ transform: [{ scale: scaleAnim }], marginBottom: 20 }}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        className="rounded-2xl overflow-hidden bg-white shadow-lg"
      >
        {/* Profile Image */}
        <View>
          <Image
            source={{ uri: profile.photoUrl + profile.photo1 }}
            className="w-full h-96"
            resizeMode="cover"
          />

          {/* Linear Gradient Overlay - replaces broken CSS gradient */}
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.3)", "rgba(0,0,0,0.85)"]}
            locations={[0.4, 0.7, 1]}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "60%",
            }}
          />
        </View>

        {/* Profile Details - Overlaid on image */}
        <View className="absolute inset-x-0 bottom-0 px-6 py-5">
          {/* Name and Age */}
          <View className="flex-row items-center mb-3">
            <Text className="text-white text-2xl font-bold">
              {profile.firstname} {profile.lastname}
            </Text>
            <Text className="text-white/90 text-xl ml-2 font-medium">
              {profile.age}
            </Text>
          </View>

          {/* Description Row */}
          {profile.profile_description ? (
            <View className="bg-black/20 rounded-lg px-3 py-2">
              <Text
                className="text-white text-sm"
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {profile.profile_description}
              </Text>
            </View>
          ) : null}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};
