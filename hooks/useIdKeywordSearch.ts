import { useSession } from "@/hooks/useSession";
import { SESSION_KEYS } from "@/types/common";
import { router } from "expo-router";

export const useIdKeywordSearch = () => {
  const { data: sessionData } = useSession([
    SESSION_KEYS.USER_ID,
    SESSION_KEYS.GENDER,
    SESSION_KEYS.PLAN_STATUS,
  ]);
  const memberId = sessionData?.[SESSION_KEYS.USER_ID] || "";
  const myGender = sessionData?.[SESSION_KEYS.GENDER] || "";

  const searchById = (matriId: string): { error?: string } => {
    if (!matriId.trim()) {
      return { error: "Please enter profile id" };
    }

    const searchParams = {
      member_id: memberId,
      txt_id_search: matriId,
      gender: myGender === "Female" ? "Male" : "Female",
    };

    router.push({
      pathname: "/search-results",
      params: { searchData: JSON.stringify(searchParams) },
    });
    return {};
  };

  const searchByKeyword = (
    keyword: string,
    withPhotoOnly: boolean,
  ): { error?: string } => {
    if (!keyword.trim()) {
      return { error: "Please enter keyword" };
    }

    const searchParams = {
      member_id: memberId,
      keyword,
      photo_search: withPhotoOnly ? "photo_search" : "",
      gender: myGender === "Female" ? "Male" : "Female",
    };

    router.push({
      pathname: "/search-results",
      params: { searchData: JSON.stringify(searchParams) },
    });
    return {};
  };

  return { searchById, searchByKeyword };
};
