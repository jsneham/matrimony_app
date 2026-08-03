import { useSession } from "@/hooks/useSession";
import { otherProfileServices } from "@/services/otherProfileService";
import { SESSION_KEYS } from "@/types/common";
import { useQuery } from "@tanstack/react-query";

export const useOtherProfile = (otherId: string) => {
  const { data: sessionData } = useSession([SESSION_KEYS.USER_ID]);
  const myUserId = sessionData?.[SESSION_KEYS.USER_ID] || "";

  return useQuery({
    queryKey: ["other-profile", otherId],
    enabled: !!myUserId && !!otherId,
    queryFn: () => otherProfileServices.getOtherUserProfile(otherId, myUserId),
  });
};
