import { planServices } from "@/services/planService";
import { useQuery } from "@tanstack/react-query";

export const usePlanList = () => {
  return useQuery({
    queryKey: ["plan-list"],
    queryFn: () => planServices.getPlanList(),
  });
};
