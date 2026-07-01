import { colors } from "@/constants/theme";
import { useMyProfile } from "@/hooks/useProfile";
import { useSession } from "@/hooks/useSession";
import { SESSION_KEYS } from "@/types/common";
import { Pressable, Text, View } from "react-native";
import { ActionCard } from "./ActionCard";
import { NoData } from "./NoData";
import { ProfileCompletionCard } from "./ProfileCompletionCard";
import { ProfilePhotoWIthProgress } from "./ProfilePhotoWIthProgress";

export const AccountProfileHeader = () => {
  const { data } = useSession([SESSION_KEYS.USER_ID]);

  const memberId = data?.[SESSION_KEYS.USER_ID] ?? "";

  // Queries - only runs when session is loaded and has values
  const {
    data: profileData,
    isLoading: isMatchesLoading,
    isError,
  } = useMyProfile({
    memberId,
  });

  if (isMatchesLoading || isError) {
    return (
      <View
        className="bg-white items-center justify-center"
        style={{ height: 320 }}
      >
        <NoData />
      </View>
    );
  }

  const userData = profileData?.data;

  return (
    <View className="bg-white" pointerEvents="box-none">
      {/* Profile */}
      <View className="items-center px-6 py-6">
        <ProfilePhotoWIthProgress
          profileCompletion={userData?.percentage ?? 0}
        />

        <Text className="text-2xl font-bold text-black">
          {userData?.firstname} {userData?.lastname}
        </Text>

        <Text className="text-gray-500 mt-1">{userData?.matri_id}</Text>
      </View>

      {/* Action Cards */}
      <View className="flex-row px-4 mb-5">
        <ProfileCompletionCard
          onPress={() => {}}
          profileCompletion={userData?.percentage ?? 0}
        />

        <ActionCard
          icon="file-document"
          title="Preview"
          subtitle="How your Profile looks"
          onPress={() => {}}
        />

        <ActionCard
          icon="download"
          title="Download"
          subtitle="Download Bio Data"
          onPress={() => {}}
        />
      </View>

      {/* Membership */}
      <View
        className="mx-4 mb-4 p-4 rounded-lg flex-row items-center justify-between"
        style={{ backgroundColor: "#F5EFE0" }}
      >
        <Text className="text-lg font-bold">{userData?.plan_name}</Text>

        <Pressable
          className="rounded-full px-5 py-2"
          style={{
            backgroundColor: colors.accent,
          }}
        >
          <Text className="text-white font-bold text-xs">UPGRADE</Text>
        </Pressable>
      </View>
    </View>
  );
};
