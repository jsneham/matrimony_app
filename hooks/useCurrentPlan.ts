import { useSession } from "@/hooks/useSession";
import { planServices } from "@/services/planService";
import { SESSION_KEYS } from "@/types/common";
import { useQuery } from "@tanstack/react-query";

export const useCurrentPlan = () => {
  const { data: sessionData } = useSession([SESSION_KEYS.MATRI_ID]);
  const matriId = sessionData?.[SESSION_KEYS.MATRI_ID] || "";

  return useQuery({
    queryKey: ["current-plan", matriId],
    enabled: !!matriId,
    queryFn: () => planServices.getCurrentPlan(matriId),
  });
};
