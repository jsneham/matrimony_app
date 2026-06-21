// hooks/useProfileMutations.ts
import { api } from "@/services/api";
import { UserProfile } from "@/types/profile";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedData: Partial<UserProfile>) => {
      console.log("🚀 Mutation started with payload:", updatedData);

      const response = await api.post("my-profile/save-profile", updatedData);

      console.log("✅ API Response received:", response.data);
      return response.data;
    },
    onSuccess: (data, variables) => {
      console.log("📊 onSuccess triggered");
      console.log("Response data:", data);
      console.log("Variables (payload):", variables);
      console.log("Member ID:", variables.member_id); // ← FIX: Use member_id, not id

      // ✅ FIX: Use member_id instead of id
      const memberId = variables.member_id;

      console.log("🔄 Invalidating query with key:", [
        "profiles",
        "my-profile",
        memberId,
      ]);

      // Invalidate the specific profile query for this user
      queryClient.invalidateQueries({
        queryKey: ["profiles", "my-profile", memberId],
      });

      console.log("✅ Profile updated successfully");
    },
    onError: (error: any) => {
      console.error("❌ Mutation failed:", error);
      console.error("Error message:", error?.message || error?.response?.data);
    },
  });
};

export const useUpdatePartnerPreference = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedPreference: any) => {
      console.log("🚀 Partner preference mutation started:", updatedPreference);

      const response = await api.post(
        "my-profile/update_partner_preference",
        updatedPreference,
      );

      console.log("✅ Partner preference API response:", response.data);
      return response.data;
    },
    onSuccess: (data, variables) => {
      console.log("📊 Partner preference onSuccess triggered");

      const memberId = variables.member_id;

      // Invalidate profile query to update partner preference display
      queryClient.invalidateQueries({
        queryKey: ["profiles", "my-profile", memberId],
      });

      console.log("✅ Partner preference updated successfully");
    },
    onError: (error: any) => {
      console.error("❌ Partner preference update failed:", error);
    },
  });
};
