// hooks/useMatches.ts
import { userServices } from "@/services/userServices";
import { ProfileRequest } from "@/types/profile";
import { useQuery } from "@tanstack/react-query";

export const useMyProfile = (data: ProfileRequest) => {
  return useQuery({
    queryKey: ["profiles", "my-profile", data],
    enabled: !!data.memberId,
    queryFn: () => userServices.getMyProfile(data),
  });
};
