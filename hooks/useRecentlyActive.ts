import { useSession } from "@/hooks/useSession";
import { getRecentlyActive } from "@/services/matchesService";
import { SESSION_KEYS } from "@/types/common";
import { useQuery } from "@tanstack/react-query";

export const useRecentlyActive = () => {
  const { data: sessionData } = useSession([SESSION_KEYS.USER_ID]);
  const memberId = sessionData?.[SESSION_KEYS.USER_ID] || "";

  return useQuery({
    queryKey: ["matches", "recently-active", memberId],
    enabled: !!memberId,
    queryFn: () => getRecentlyActive(memberId),
  });
};
