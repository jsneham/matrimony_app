import { AddPhotoSlot } from "@/components/profile/photos/AddPhotoSlot";
import { GuidelinesLink } from "@/components/profile/photos/GuidelinesLink";
import { PhotoCard } from "@/components/profile/photos/PhotoCard";
import { UploadRow } from "@/components/profile/photos/UploadRow";
import { ProfileProgressBanner } from "@/components/profile/ProfileEditComponents";
import { useMyProfile } from "@/hooks/useProfile";
import { useSession } from "@/hooks/useSession";
import { SESSION_KEYS } from "@/types/common";
import { Feather } from "@expo/vector-icons";
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
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 56 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Main photos section */}
        <View className="mt-14 mb-4">
          <Text className="text-2xl font-bold text-gray-900">Photos</Text>
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

        <View className="flex-row gap-3">
          <AddPhotoSlot />
          <AddPhotoSlot />
        </View>

        <View className="flex-row items-center justify-between mt-4">
          <View className="flex-row items-center flex-1">
            <Feather
              name="info"
              size={12}
              color="#8B8B8B"
              style={{ marginRight: 6, marginTop: -2 }}
            />
            <Text className="text-gray font-regular text-sm flex-1">
              Minimum of 2 photos are mandatory.
            </Text>
          </View>
          <GuidelinesLink />
        </View>

        {/* Photo Privacy */}
        <Text className="text-2xl font-bold text-gray-900 mb-4 mt-14">
          Photo Privacy
        </Text>
        <View className="border-2 border-dashed border-gray-300 rounded-2xl px-4 py-4 flex-row items-center justify-between bg-white">
          <Text className="text-gray-900 font-regular text-base">
            Visible to Premium Members & I like
          </Text>
          <Pressable>
            <Text className="text-pink-600 font-medium">Change</Text>
          </Pressable>
        </View>

        {/* Video intro */}
        <UploadRow
          heading="Video"
          label="Introduce yourself with a video."
          note="30 seconds maximum, follow guidelines."
        />

        {/* Voice */}
        <UploadRow
          heading="Voice Note"
          label="Express yourself through your Voice"
          note="30 seconds maximum, follow guidelines."
        />

        {/* Horoscope */}
        <UploadRow
          heading="Horoscope Photo"
          label="You can upload your Horoscope Photo"
          note="Photo of most important data in horoscope."
        />
      </ScrollView>
    </View>
  );
};

export default EditPhotosMoreScreen;
