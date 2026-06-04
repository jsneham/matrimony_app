import { MatchCardProps } from "@/types/matches";
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
      style={{
        transform: [{ scale: scaleAnim }],
        marginBottom: 20,
      }}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        className="overflow-hidden rounded-2xl bg-white"
      >
        <View className="relative">
          <Image
            source={{ uri: profile.photoUrl + profile.photo1 }}
            className="h-96 w-full"
            resizeMode="cover"
          />

          <View className="absolute bottom-0 left-0 right-0 h-48 bg-black/50" />
        </View>

        <View className="absolute px-3 py-2 bottom-0 left-0 right-0">
          <View className="flex-row items-center">
            <Text className="text-2xl font-bold text-white">
              {profile.firstname} {profile.lastname}
            </Text>

            <Text className="ml-2 text-xl font-medium text-white">
              {profile.age}
            </Text>
          </View>

          {profile.profile_description ? (
            <View className="px-3 py-2">
              <Text className="font-regular text-white" numberOfLines={2}>
                {profile.profile_description}
              </Text>
            </View>
          ) : null}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};
