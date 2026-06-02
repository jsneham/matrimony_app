// hooks/useMatches.ts
import { matchesService } from "@/services/matchesService";
import { MatchesRequest } from "@/types/matches";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";

export const useMyMatches = (data: MatchesRequest) => {
  return useQuery({
    queryKey: ["matches", "my-matches", data],
    enabled: !!data.matriId && !!data.memberId,
    queryFn: () => matchesService.getMyMatches(data),
  });
};

export const useMoreMatches = (page: number = 1) => {
  return useQuery({
    queryKey: ["matches", "more-matches", page],
    queryFn: () => matchesService.getMoreMatches(page, 10),
  });
};

export const useLikeProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (profileId: string) => matchesService.likeProfile(profileId),
    onSuccess: (data) => {
      console.log("Profile liked:", data.message);
      // Invalidate matches to refresh the list
      queryClient.invalidateQueries({ queryKey: ["matches"] });
    },
    onError: (error: any) => {
      const errorMsg =
        error.response?.data?.message || "Failed to like profile";
      Alert.alert("Error", errorMsg);
    },
  });
};

export const useSkipProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (profileId: string) => matchesService.skipProfile(profileId),
    onSuccess: (data) => {
      console.log("Profile skipped:", data.message);
      queryClient.invalidateQueries({ queryKey: ["matches"] });
    },
    onError: (error: any) => {
      const errorMsg =
        error.response?.data?.message || "Failed to skip profile";
      Alert.alert("Error", errorMsg);
    },
  });
};

export const useSendInterest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      profileId,
      message,
    }: {
      profileId: string;
      message?: string;
    }) => matchesService.sendInterest(profileId, message),
    onSuccess: (data) => {
      Alert.alert("Success", data.message || "Interest sent successfully");
      queryClient.invalidateQueries({ queryKey: ["matches"] });
    },
    onError: (error: any) => {
      const errorMsg =
        error.response?.data?.message || "Failed to send interest";
      Alert.alert("Error", errorMsg);
    },
  });
};
