import { useSession } from "@/hooks/useSession";
import { getRecentlyJoined } from "@/services/matchesService";
import { SESSION_KEYS } from "@/types/common";
import { useQuery } from "@tanstack/react-query";

export const useRecentlyJoined = () => {
  const { data: sessionData } = useSession([SESSION_KEYS.USER_ID]);
  const memberId = sessionData?.[SESSION_KEYS.USER_ID] || "";

  return useQuery({
    queryKey: ["matches", "recently-joined", memberId],
    enabled: !!memberId,
    queryFn: () => getRecentlyJoined(memberId),
  });
};
