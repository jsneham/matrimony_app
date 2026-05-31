import { SESSION_KEYS, getSessionData } from "@/hooks/useAuth";
import { useEffect, useState } from "react";

export const useSession = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null); // null = loading

  useEffect(() => {
    const checkSession = async () => {
      const token = await getSessionData(SESSION_KEYS.TOKEN);
      setIsLoggedIn(!!token);
    };
    checkSession();
  }, []);

  return { isLoggedIn, isLoading: isLoggedIn === null };
};
