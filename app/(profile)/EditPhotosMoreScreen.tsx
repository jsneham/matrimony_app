import { AddPhotoSlot } from "@/components/profile/photos/AddPhotoSlot";
import { GuidelinesLink } from "@/components/profile/photos/GuidelinesLink";
import { PhotoCard } from "@/components/profile/photos/PhotoCard";
import { UploadRow } from "@/components/profile/photos/UploadRow";
import { ProfileProgressBanner } from "@/components/profile/ProfileEditComponents";
import { useMyProfile } from "@/hooks/useProfile";
import { useSession } from "@/hooks/useSession";
import { SESSION_KEYS } from "@/types/common";
import React from "react";
import {
    ActivityIndicator,
    Pressable,
    ScrollView,
    Text,
    View,
} from "react-native";

const EditPhotosMoreScreen = () => {
  const { data: sessionData, isLoading: isLoadingSession } = useSession([
    SESSION_KEYS.USER_ID,
  ]);
  const memberId = sessionData?.[SESSION_KEYS.USER_ID] || "";

  const { data: profileResponse, isLoading: isLoadingProfile } = useMyProfile({
    memberId,
  });

  const profile = profileResponse?.data;
  console.log("profile===", profile);

  // ── Loading state ───────────────────────────────────────────────────────────
  if (isLoadingSession || isLoadingProfile) {
    return (
      <View className="flex-1 items-center justify-center bg-app-background">
        <ActivityIndicator size="large" color="#db2777" />
        <Text className="mt-3 text-gray-500 font-medium">
          Loading profile...
        </Text>
      </View>
    );
  }

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <View className="flex-1 bg-app-background">
      <ProfileProgressBanner
        percentage={0}
        message="Photos will be rejected if guidelines not followed."
        showVerify={false}
      />
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Main photos section */}
        <View className="flex-row justify-end mt-4 mb-3">
          <GuidelinesLink />
        </View>

        <View className="flex-row gap-3 mb-3">
          <PhotoCard
            source={profile?.photo1 ? { uri: profile.photo1 } : undefined}
            mainLabel="Main Photo"
          />
          <PhotoCard
            source={profile?.photo2 ? { uri: profile.photo2 } : undefined}
            pendingLabel
          />
        </View>

        <View className="flex-row gap-3 mb-8">
          <AddPhotoSlot />
          <AddPhotoSlot />
        </View>

        {/* Photo Privacy */}
        <Text className="text-2xl font-bold text-gray-900 mb-3">
          Photo Privacy
        </Text>
        <View className="border-2 border-dashed border-gray-300 rounded-2xl px-4 py-5 flex-row items-center justify-between bg-white mb-8">
          <Text className="text-gray-900 font-semibold text-base">
            Visible to Premium Members & I like
          </Text>
          <Pressable>
            <Text className="text-pink-600 font-medium">Change</Text>
          </Pressable>
        </View>

        {/* Video intro */}
        <View className="mb-8">
          <UploadRow label="Introduce yourself with a video." />
        </View>

        {/* Voice */}
        <View className="mb-8">
          <UploadRow label="Express yourself through your Voice" />
        </View>

        {/* Horoscope */}
        <View className="mb-4">
          <UploadRow label="You can upload your Horoscope Photo" />
        </View>
      </ScrollView>
    </View>
  );
};

export default EditPhotosMoreScreen;
