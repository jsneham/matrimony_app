import { UpgradePlanSheet } from "@/components/messages/UpgradePlanSheet";
import { InfoRow, SectionHeading } from "@/components/otherProfile/InfoRow";
import { useOtherProfile } from "@/hooks/useOtherProfile";
import { useSession } from "@/hooks/useSession";
import { SESSION_KEYS } from "@/types/common";
import { PlanStatus } from "@/types/profile";
import {
  inchesToFeetIn,
  maskMobile,
  orNotMentioned,
  resolvePhotoUri,
} from "@/utils/profileHelpers";
import { colors } from "@/constants/theme";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Linking,
  Pressable,
  ScrollView,
  View,
} from "react-native";
import { Text } from "@/components/ui/Text";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const PhotoGridSection = ({
  photoUris,
  activeIndex,
  onSelect,
}: {
  photoUris: string[];
  activeIndex: number;
  onSelect: (index: number) => void;
}) => {
  if (photoUris.length === 0) return null;

  return (
    <View className="px-5 pt-6 pb-2">
      <Text className="text-xl font-bold text-gray-900 mb-4">Photos</Text>
      <View className="flex-row flex-wrap" style={{ gap: 12 }}>
        {photoUris.map((uri, index) => {
          const isMain = index === 0;
          const isActive = index === activeIndex;
          return (
            <Pressable
              key={index}
              onPress={() => onSelect(index)}
              style={{
                width: "47%",
                aspectRatio: 3 / 4,
                borderRadius: 16,
                overflow: "hidden",
                borderWidth: isActive ? 2 : 0,
                borderColor: "#db2777",
              }}
            >
              <Image
                source={{ uri }}
                className="w-full h-full"
                resizeMode="cover"
              />
              {isMain && (
                <View className="absolute bottom-2 left-2 bg-black/70 px-2.5 py-1 rounded-full">
                  <Text className="text-white text-xs font-medium">
                    Main Photo
                  </Text>
                </View>
              )}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const ProfileScreen = () => {
  const insets = useSafeAreaInsets();
  const { matriId } = useLocalSearchParams<{ matriId: string }>();
  console.log("ProfileScreen matriId:", matriId);
  const { data, isLoading, isError } = useOtherProfile(matriId ?? "");
  const { data: sessionData } = useSession([SESSION_KEYS.PLAN_STATUS]);
  const planStatus = sessionData?.[SESSION_KEYS.PLAN_STATUS] || "";

  const [contactRevealed, setContactRevealed] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [showUpgradeSheet, setShowUpgradeSheet] = useState(false);

  const isApiError = data?.status !== "success";
  const profile = !isApiError ? data?.data : undefined;

  console.log("ProfileScreen data:", data);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#db2777" />
      </View>
    );
  }

  if (isError || isApiError || !profile) {
    return (
      <View className="flex-1 bg-white">
        <View
          className="flex-row items-center px-4 py-3 border-b border-gray-100"
          style={{ paddingTop: insets.top + 12 }}
        >
          <Pressable
            onPress={() => router.back()}
            hitSlop={10}
            className="mr-3"
          >
            <Ionicons name="chevron-back" size={24} color="#111827" />
          </Pressable>
          <Text className="text-lg font-bold text-gray-900">Profile</Text>
        </View>

        <View className="flex-1 items-center justify-center px-8">
          <Ionicons name="person-circle-outline" size={64} color="#d1d5db" />
          <Text className="text-lg font-bold text-gray-900 mt-4">
            No data found
          </Text>
          <Text className="text-sm text-gray-500 text-center mt-2 font-regular">
            {(data as any)?.errmessage ||
              "We couldn't load this profile. Please try again."}
          </Text>
          <Pressable
            onPress={() => router.back()}
            className="mt-6 bg-pink-600 rounded-full px-6 py-3"
          >
            <Text className="text-white font-bold">Go Back</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  const approvedPhoto = (photo: string | null, approval?: string) =>
    approval?.trim().toUpperCase() === "APPROVED"
      ? resolvePhotoUri(profile.photoUrl, photo)
      : undefined;

  const photoUris = [
    approvedPhoto(profile.photo1, profile.photo1_approve),
    approvedPhoto(profile.photo2, profile.photo2_approve),
    approvedPhoto(profile.photo3, profile.photo3_approve),
    approvedPhoto(profile.photo4, profile.photo4_approve),
  ].filter((uri): uri is string => !!uri);

  const activePhotoUri = photoUris[activePhotoIndex];
  const isVerified = profile.status === "APPROVED";

  const handleCall = () => {
    if (planStatus !== PlanStatus.PAID) {
      setShowUpgradeSheet(true);
      return;
    }

    if (!contactRevealed) {
      setContactRevealed(true);
      return;
    }
    Linking.openURL(`tel:${profile.mobile}`);
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ── Hero photo + overlay info ─────────────────────── */}
        <View className="relative" style={{ height: 480 }}>
          {activePhotoUri ? (
            <Image
              source={{ uri: activePhotoUri }}
              className="w-full h-full"
              resizeMode="cover"
            />
          ) : (
            <View className="w-full h-full bg-gray-200 items-center justify-center">
              <Ionicons name="person" size={64} color={colors.gray} />
            </View>
          )}

          <Pressable
            onPress={() => router.back()}
            className="absolute w-9 h-9 rounded-full bg-gray-200/90 items-center justify-center"
            style={{ top: insets.top + 8, left: 16 }}
          >
            <Ionicons name="chevron-back" size={20} color="#111827" />
          </Pressable>

          <View className="absolute bottom-0 left-0 right-0 px-5 pb-5">
            <View className="flex-row items-center gap-2 mb-1">
              <Text className="text-white font-bold text-sm">
                {profile.matri_id}
              </Text>
              {isVerified && (
                <View className="flex-row items-center bg-green-600 px-2 py-0.5 rounded-full">
                  <Ionicons name="shield-checkmark" size={12} color="#fff" />
                  <Text className="text-white text-xs font-bold ml-1">
                    Verified
                  </Text>
                </View>
              )}
            </View>
            <Text className="text-white text-2xl font-bold">
              {profile.username}
            </Text>
            <Text className="text-white text-base mt-1 font-regular">
              {profile.age}, {profile.height}
            </Text>
            <Text className="text-white text-base font-regular">
              {profile.education_name}, {profile.occupation_name}
            </Text>
            <Text className="text-white text-base font-regular">
              {profile.religion_name}, {profile.caste_name}
            </Text>
            <Text className="text-white text-base font-regular">
              {profile.city_name}, {profile.state_name}
            </Text>
          </View>
        </View>

        {/* ── Basics ─────────────────────────────────────────── */}
        <SectionHeading title="Basics" />
        <InfoRow
          icon="document-text-outline"
          text={`Profile created by ${profile.profileby}`}
        />
        <InfoRow
          icon="information-circle-outline"
          text={orNotMentioned(null)}
        />
        <InfoRow
          icon="body-outline"
          text={`${profile.age}, ${profile.height}`}
        />
        <InfoRow icon="time-outline" text={profile.marital_status} />
        <InfoRow
          icon="person-outline"
          text={`${profile.bodytype}, ${profile.weight} Kgs, ${profile.complexion} Skin`}
        />
        <InfoRow
          icon="shield-outline"
          text={`Health/Challenged - ${profile.physical_info}`}
        />
        <InfoRow
          icon="language-outline"
          text={`Mother Tongue - ${profile.mtongue_name}`}
        />
        <InfoRow
          icon="location-outline"
          text={`Lives at ${profile.city_name}, ${profile.state_name}, ${profile.country_name}`}
        />
        <InfoRow
          icon="flag-outline"
          text={`${profile.residence} of ${profile.country_name}`}
        />
        <InfoRow icon="restaurant-outline" text={profile.diet} />
        <InfoRow
          icon="wine-outline"
          text={profile.drink === "No" ? "Doesn't Drink" : profile.drink}
        />
        <InfoRow
          icon="footsteps-outline"
          text={profile.smoke === "No" ? "Doesn't Smoke" : profile.smoke}
        />

        {/* ── Photos ─────────────────────────────────────────── */}
        <PhotoGridSection
          photoUris={photoUris}
          activeIndex={activePhotoIndex}
          onSelect={setActivePhotoIndex}
        />

        {/* ── Professional Details ──────────────────────────── */}
        <SectionHeading title="Professional Details" />
        <InfoRow icon="school-outline" text={profile.education_name} />
        <InfoRow
          icon="briefcase-outline"
          text={`Work Sector - ${profile.employee_in}`}
        />
        <InfoRow icon="cash-outline" text={`${profile.income} annually`} />
        <InfoRow icon="construct-outline" text={profile.occupation_name} />
        <InfoRow
          icon="ribbon-outline"
          text={`Designated as - ${orNotMentioned(profile.designation_name)}`}
        />

        {/* ── Religion & Horoscope ──────────────────────────── */}
        <SectionHeading title="Religion & Horoscope" />
        <InfoRow icon="business-outline" text={profile.religion_name} />
        <InfoRow icon="id-card-outline" text={profile.caste_name} />
        <InfoRow
          icon="git-network-outline"
          text={`Gothram - ${orNotMentioned(profile.gothra)}`}
        />
        <InfoRow
          icon="star-outline"
          text={`Horoscope belief - ${profile.horoscope}`}
        />
        <InfoRow
          icon="moon-outline"
          text={`Moonsign (Raas) - ${profile.moonsign}`}
        />
        <InfoRow icon="sparkles-outline" text={`Star - ${profile.star}`} />
        <InfoRow
          icon="flash-outline"
          text={`Is Manglik? - ${orNotMentioned(profile.manglik)}`}
        />
        <InfoRow
          icon="water-outline"
          text={`Blood Group - ${profile.blood_group}`}
        />
        <InfoRow icon="gift-outline" text={`Born on ${profile.birthdate}`} />

        {/* ── Hobbies & Interests ────────────────────────────── */}
        <SectionHeading title="Hobbies & Interest(s)" />
        <InfoRow icon="heart-outline" text={orNotMentioned(profile.hobby)} />
        <InfoRow icon="chatbubbles-outline" text={profile.languages_known} />

        {/* ── Contact Details ────────────────────────────────── */}
        <SectionHeading title="Contact Details" />
        <View className="px-5">
          <InfoRow
            icon="call-outline"
            text={contactRevealed ? profile.mobile : maskMobile(profile.mobile)}
          />
          <Pressable
            onPress={handleCall}
            className="bg-pink-600 rounded-xl py-4 items-center mt-2 active:bg-pink-700"
          >
            <Text className="text-white font-bold text-base">
              {contactRevealed ? "CALL NOW" : "VIEW CONTACT DETAILS"}
            </Text>
          </Pressable>
        </View>

        {/* ── Contact Matchmaker ─────────────────────────────── */}
        <SectionHeading title="Contact Matchmaker" />
        <View className="items-center px-5 pb-2">
          <View className="w-20 h-20 rounded-full bg-gray-100 items-center justify-center mb-3">
            <Ionicons name="people-outline" size={32} color={colors.gray} />
          </View>
          <Text className="text-lg font-bold text-gray-900 mb-3">
            {profile.assign_to_staff}
          </Text>
          <Text className="text-sm text-gray-500 text-center mb-4 font-regular">
            Please mention that you&apos;re contacting from this app so the
            matchmaker understands your enquiry &amp; assists you
          </Text>
          <View className="flex-row gap-3 w-full">
            <Pressable className="flex-1 flex-row items-center justify-center border border-purple-800 rounded-lg py-3">
              <MaterialCommunityIcons
                name="whatsapp"
                size={20}
                color="#6b21a8"
              />
              <Text className="text-purple-800 font-bold ml-2">WhatsApp</Text>
            </Pressable>
            <Pressable className="flex-1 flex-row items-center justify-center border border-purple-800 rounded-lg py-3">
              <Ionicons name="call-outline" size={18} color="#6b21a8" />
              <Text className="text-purple-800 font-bold ml-2">Call Now</Text>
            </Pressable>
          </View>
        </View>

        {/* ── Family Info ────────────────────────────────────── */}
        <SectionHeading title="Family Info" />
        <InfoRow
          icon="location-outline"
          text={`Ancestral Origin - ${orNotMentioned(profile.birthplace)}`}
        />
        <InfoRow
          icon="home-outline"
          text={`${profile.family_status} ~ ${profile.family_type}`}
        />
        <InfoRow
          icon="man-outline"
          text={`Father's Name - ${orNotMentioned(profile.father_name)}`}
        />
        <InfoRow
          icon="briefcase-outline"
          text={`His Occupation - ${orNotMentioned(profile.father_occupation)}`}
        />
        <InfoRow
          icon="woman-outline"
          text={`Mother's Name - ${orNotMentioned(profile.mother_name)}`}
        />
        <InfoRow
          icon="briefcase-outline"
          text={`Her Occupation - ${orNotMentioned(profile.mother_occupation)}`}
        />
        <InfoRow
          icon="man-outline"
          text={`${profile.no_of_brothers} Brother(s), ${profile.no_of_married_brother}`}
        />
        <InfoRow
          icon="woman-outline"
          text={`${profile.no_of_sisters} Sister(s), ${profile.no_of_married_sister}`}
        />

        {/* ── Looking For (Expectations) ─────────────────────── */}
        <SectionHeading title="Looking For (Expectations)" />
        <InfoRow
          icon="heart-circle-outline"
          text={orNotMentioned(profile.part_expect)}
        />

        {/* ── Partner Preferences ─────────────────────────────── */}
        <View className="flex-row items-center justify-between px-5 pt-6 pb-2">
          <Text className="text-xl font-bold text-gray-900">
            Partner Preferences
          </Text>
          <Text className="text-pink-600 font-bold">Matches</Text>
        </View>
        <PrefRow
          label="Marital Status"
          value={profile.marital_status}
          highlighted
        />
        <PrefRow
          label="Age Preference"
          value={`${profile.part_frm_age} to ${profile.part_to_age} Years`}
        />
        <PrefRow
          label="Height Preference"
          value={`${inchesToFeetIn(profile.part_height)} to ${inchesToFeetIn(profile.part_height_to)}`}
        />
        <PrefRow
          label="Mother Tongue"
          value={
            orNotMentioned(profile.part_mother_tongue) === "Not Mentioned"
              ? "N/A"
              : profile.part_mother_tongue!
          }
        />
        <PrefRow label="Religion" value={profile.religion_name} />
        <PrefRow label="Country" value={profile.part_country_living ?? "N/A"} />
        <PrefRow label="Education" value={profile.part_education ?? "N/A"} />
        <PrefRow label="Occupation" value={profile.part_occupation ?? "N/A"} />

        {/* ── Action buttons ─────────────────────────────────── */}
        <View className="flex-row gap-3 px-5 py-6">
          <Pressable
            onPress={handleCall}
            className="flex-1 flex-row items-center justify-center border border-gray-200 rounded-full py-4"
          >
            <Ionicons name="call-outline" size={20} color="#db2777" />
          </Pressable>
          <Pressable className="flex-1 flex-row items-center justify-center border border-gray-200 rounded-full py-4">
            <Ionicons name="ban-outline" size={20} color={colors.gray} />
          </Pressable>
        </View>
      </ScrollView>

      {/* ── Sticky bottom bar ─────────────────────────────────── */}
      <View
        className="flex-row items-center justify-between px-5 py-3 border-t border-gray-100 bg-white"
        style={{ paddingBottom: Math.max(insets.bottom, 12) }}
      >
        <Text className="text-purple-800 font-medium italic">
          Liked this Profile? Don&apos;t Wait
        </Text>
        <Pressable
          onPress={handleCall}
          className="flex-row items-center bg-purple-800 rounded-lg px-4 py-2.5"
        >
          <Ionicons name="call-outline" size={16} color="#fff" />
          <Text className="text-white font-bold ml-2">Call Now</Text>
        </Pressable>
      </View>

      <UpgradePlanSheet
        visible={showUpgradeSheet}
        message="Your current membership plan does not allow this action. Please upgrade your plan."
        onClose={() => setShowUpgradeSheet(false)}
      />
    </View>
  );
};

const PrefRow = ({
  label,
  value,
  highlighted,
}: {
  label: string;
  value: string;
  highlighted?: boolean;
}) => (
  <View className="flex-row items-center justify-between px-5 py-3 border-b border-gray-100">
    <View>
      <Text className="text-gray-400 text-sm font-regular">{label}</Text>
      <Text className="text-gray-900 font-bold text-base mt-0.5">{value}</Text>
    </View>
    <View
      className={`w-6 h-6 rounded-full items-center justify-center ${
        highlighted ? "bg-pink-600" : "bg-gray-400"
      }`}
    >
      <Ionicons name="checkmark" size={14} color="#fff" />
    </View>
  </View>
);

export default ProfileScreen;
