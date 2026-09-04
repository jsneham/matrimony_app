import { UserProfile } from "@/types/profile";
import { Href, router } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import { Text } from "@/components/ui/Text";
import { ProfilePhotoWIthProgress } from "./ProfilePhotoWIthProgress";

export const ProfileCard = (props: { userData: UserProfile | undefined }) => {
  const { userData } = props;

  return (
    <View className="bg-white mx-5 mt-4 rounded-2xl px-4 py-4 border border-gray-100">
      <View className="flex-row items-center">
        {/* Avatar with ring */}
        <ProfilePhotoWIthProgress
          profileCompletion={userData?.percentage ?? 0}
        />

        {/* User info */}
        <View className="flex-1 ml-4">
          <Text className="text-gray-900 text-lg font-bold mb-0.5">
            {userData?.firstname} {userData?.lastname}
          </Text>
          <Text className="text-gray-400 text-sm mb-2 font-regular">
            {userData?.matri_id}
          </Text>
          <View className="flex-row items-center justify-between">
            <Text className="text-sky-500 text-sm font-bold">
              {userData?.percentage ?? 0}% COMPLETED
            </Text>
            <TouchableOpacity
              onPress={() => {
                router.push("/(profile)" as Href);
              }}
            >
              <Text className="text-orange-500 text-sm font-bold">
                UPDATE PROFILE
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
