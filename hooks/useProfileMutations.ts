// hooks/useProfileMutations.ts
import { api } from "@/services/api";
import { UserProfile } from "@/types/profile";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedData: Partial<UserProfile>) => {
      const response = await api.post("my-profile/save-profile", updatedData);
      return response.data;
    },
    onSuccess: (data, variables) => {
      console.log("✅ Profile updated successfully. Invalidating caches...");
      console.log("Profile updated successfully", data, variables);

      // Invalidate active profile query key to trigger background refetch
      // this updates all screens displaying profile data (e.g., Edit Profile screen, Account screen, etc.)
      queryClient.invalidateQueries({
        queryKey: ["profiles", "my-profile", variables.id],
      });
    },
  });
};

export const useUpdatePartnerPreference = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedPreference: any) => {
      const response = await api.post(
        "my-profile/update_partner_preference",
        updatedPreference,
      );
      return response.data;
    },
    onSuccess: () => {
      console.log(
        "✅ Partner Preference updated successfully. Invalidating caches...",
      );

      // Invalidate profile query to update the partner preference display
      queryClient.invalidateQueries({
        queryKey: ["profiles", "my-profile"],
      });
    },
  });
};
