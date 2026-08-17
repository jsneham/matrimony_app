import { useSession } from "@/hooks/useSession";
import { SESSION_KEYS } from "@/types/common";
import { MatchCardProps } from "@/types/matches";
import { getPlanAwareName } from "@/utils/profileHelpers";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useRef } from "react";
import {
  ActivityIndicator,
  Animated,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export const MatchCard: React.FC<MatchCardProps & { cardHeight?: number }> = ({
  profile,
  cardHeight = 470,
}) => {
  const { data: sessionData } = useSession([SESSION_KEYS.PLAN_STATUS]);
  const planStatus = sessionData?.[SESSION_KEYS.PLAN_STATUS] ?? "";
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [imageLoading, setImageLoading] = React.useState(true);
  const [imageError, setImageError] = React.useState(false);

  // 🔴 CRITICAL: Build image URL safely
  const getImageUrl = (): string | null => {
    if (!profile?.photoUrl || !profile?.photo1) {
      console.warn("⚠️ Missing photoUrl or photo1:", {
        photoUrl: profile?.photoUrl,
        photo1: profile?.photo1,
      });
      return null;
    }

    const url = `${profile.photoUrl}${profile.photo1}`;
    return url;
  };

  const imageUrl = getImageUrl();

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

  const handleImageLoad = () => {
    setImageLoading(false);
    setImageError(false);
  };

  const handleImageError = (error: any) => {
    console.error("❌ Image load error:", error);
    setImageLoading(false);
    setImageError(true);
  };

  // 🔴 CRITICAL: Get display name safely
  const displayName = React.useMemo(() => {
    return getPlanAwareName(
      planStatus,
      profile?.firstname,
      profile?.lastname,
      profile?.username,
    );
  }, [planStatus, profile?.firstname, profile?.lastname, profile?.username]);

  // 🔴 CRITICAL: Get age safely
  const displayAge = React.useMemo(() => {
    if (profile?.age) {
      // Extract number from "33 Years" format
      const ageStr = String(profile.age);
      const match = ageStr.match(/(\d+)/);
      return match ? match[1] : profile.age;
    }
    return null;
  }, [profile?.age]);

  return (
    <Animated.View
      style={{
        transform: [{ scale: scaleAnim }],
        marginBottom: 0,
      }}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={() => {
          router.push({
            pathname: "/profile/[matriId]",
            params: { matriId: profile.id },
          });
        }}
        style={{
          height: cardHeight,
          overflow: "hidden",
          borderRadius: 20,
          backgroundColor: "#ffffff",
          shadowColor: "#000",
          shadowOpacity: 0.12,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 4 },
          elevation: 6,
        }}
      >
        <View className="relative flex-1 bg-gray-200">
          {/* Image Container */}
          {imageUrl && !imageError ? (
            <>
              <Image
                source={{ uri: imageUrl }}
                style={{ width: "100%", height: cardHeight - 132 }}
                resizeMode="cover"
                onLoad={handleImageLoad}
                onError={handleImageError}
              />

              {/* Loading Indicator */}
              {imageLoading && (
                <View className="absolute inset-0 items-center justify-center bg-gray-300">
                  <ActivityIndicator size="large" color="#0066cc" />
                </View>
              )}
            </>
          ) : (
            /* Fallback: No image available */
            <View
              style={{ width: "100%", height: cardHeight - 132 }}
              className="items-center justify-center bg-gray-300"
            >
              <Ionicons name="image-outline" size={64} color="#999" />
              <Text className="mt-2 text-gray-600">No Photo</Text>
            </View>
          )}

          {/* Gradient Overlay */}
          <View className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black/80 to-transparent" />

          {/* Profile Info */}
          <View className="absolute bottom-0 left-0 right-0 px-4 py-4">
            {/* Name and Age */}
            <View className="flex-row items-center">
              <Text className="flex-1 text-2xl font-bold text-white">
                {displayName}
              </Text>
              {displayAge && (
                <Text className="ml-2 text-xl font-medium text-white">
                  {displayAge}
                </Text>
              )}
            </View>

            {/* Profile Description */}
            {profile?.profile_description ? (
              <Text
                className="mt-2 text-sm font-regular text-white"
                numberOfLines={2}
              >
                {profile.profile_description}
              </Text>
            ) : null}

            {/* Location (if available) */}
            {profile?.city_name && (
              <View className="mt-2 flex-row items-center">
                <Ionicons name="location" size={14} color="white" />
                <Text className="ml-1 text-sm text-white">
                  {profile.city_name}
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Action Buttons */}
        <View className="flex-row gap-3 px-4 py-3">
          <TouchableOpacity className="flex-1 flex-row items-center justify-center rounded-lg border border-red-500 py-2.5">
            <Ionicons name="close" size={18} color="#ef4444" />
            <Text className="ml-2 font-medium text-red-500">Pass</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-1 flex-row items-center justify-center rounded-lg bg-blue-600 py-2.5">
            <Ionicons name="heart" size={18} color="white" />
            <Text className="ml-2 font-medium text-white">Like</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};
