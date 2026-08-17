import { CurrentPlanResponse, PlanListResponse } from "@/types/plan";
import { api } from "./api";

export const planServices = {
  // ✅ confirmed: AppConstants.check_plan
  getCurrentPlan: async (matriId: string): Promise<CurrentPlanResponse> => {
    const response = await api.post("premium-member/current-plan", {
      matri_id: matriId,
    });
    return response.data;
  },

  // ✅ confirmed: AppConstants.plan_list — no params needed, empty POST body
  getPlanList: async (): Promise<PlanListResponse> => {
    const response = await api.post("premium_member/get_plan_data", {});
    // ✅ path confirmed earlier from your AppConstants dump: "premium_member/get_plan_data"
    return response.data;
  },
};
