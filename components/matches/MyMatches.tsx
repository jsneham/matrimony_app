import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import "@/global.css";

import { MatchCard } from "@/components/MatchCard";
import { NoData } from "@/components/NoData";
import { SkeletonCard } from "@/components/SkeletonCard";
import { useMyMatches } from "@/hooks/useMatches";
import { useSession } from "@/hooks/useSession";
import { SESSION_KEYS } from "@/types/common";
import { Ionicons } from "@expo/vector-icons";
import { FlatList } from "react-native";

export default function MyMatchesScreen() {
  const { data, isLoading: isSessionLoading } = useSession([
    SESSION_KEYS.MATRI_ID,
    SESSION_KEYS.USER_ID,
  ]);

  const [page, setPage] = useState(1);

  const matriId = data?.[SESSION_KEYS.MATRI_ID] ?? "";
  const memberId = data?.[SESSION_KEYS.USER_ID] ?? "";

  // Queries - only runs when session is loaded and has values
  const {
    data: matchesData,
    isLoading: isMatchesLoading,
    isError,
  } = useMyMatches({
    matriId,
    memberId,
    page,
  });

  const matches = matchesData?.data || [];

  // Show skeleton while session OR matches are loading
  const isLoading = isSessionLoading || isMatchesLoading;

  // Mutations
  // const likeProfile = useLikeProfile();
  // const skipProfile = useSkipProfile();

  // const handleLike = (profileId: string) => {
  //   likeProfile.mutate(profileId);
  // };

  // const handleSkip = (profileId: string) => {
  //   skipProfile.mutate(profileId);
  // };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Subtitle with Update Preferences */}
      <View className="flex-row items-center justify-between m-4 bg-white rounded-lg px-4 py-3 shadow">
        <Text className="text-gray-600 text-sm">
          According to Partner Preferences.
        </Text>
        <TouchableOpacity className="flex-row items-center">
          <Text className="text-blue-600 text-sm font-medium">
            Update Preferences
          </Text>
          <Ionicons
            name="pencil"
            size={14}
            color="#2563eb"
            style={{ marginLeft: 6 }}
          />
        </TouchableOpacity>
      </View>

      {/* Loading State - Skeleton Cards */}
      {isLoading && (
        <FlatList
          data={[1, 2, 3]}
          renderItem={() => <SkeletonCard />}
          keyExtractor={(item) => item.toString()}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Error State */}
      {!isLoading && isError && (
        <View className="flex-1 items-center justify-center px-6">
          <Ionicons name="alert-circle" size={48} color="#ef4444" />
          <Text className="text-red-600 font-bold mt-4 text-center">
            Failed to load matches
          </Text>
          <TouchableOpacity
            onPress={() => setPage(1)}
            className="mt-4 px-6 py-3 bg-blue-600 rounded-lg"
          >
            <Text className="text-white font-bold">Try Again</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Matches List */}
      {!isLoading && !isError && (
        <>
          {matches.length > 0 ? (
            <FlatList
              data={matches}
              renderItem={({ item }) => <MatchCard profile={item} />}
              keyExtractor={(item) => item.id}
              scrollEventThrottle={16}
              contentContainerStyle={{
                paddingHorizontal: 20,
                paddingBottom: 30,
              }}
              showsVerticalScrollIndicator={false}
              onEndReached={() => {
                if (matches.length < (matchesData?.total_count || 0)) {
                  setPage((prev) => prev + 1);
                }
              }}
              onEndReachedThreshold={0.5}
            />
          ) : (
            <NoData />
          )}
        </>
      )}
    </View>
  );
}
