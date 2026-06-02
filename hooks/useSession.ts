import {
  clearUserSession,
  getMultipleSessionData,
  getSessionData,
} from "@/hooks/useAuth";
import { SESSION_KEYS } from "@/types/common";
import { useEffect, useState } from "react";

// export const useSession = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null); // null = loading

//   useEffect(() => {
//     const checkSession = async () => {
//       const token = await getSessionData(SESSION_KEYS.TOKEN);
//       setIsLoggedIn(!!token);
//     };
//     checkSession();
//   }, []);

//   return { isLoggedIn, isLoading: isLoggedIn === null };
// };

export const useSession = (keys?: string[]) => {
  const [data, setData] = useState<Record<string, string | null> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // If no keys provided, just check login status
        if (!keys || keys.length === 0) {
          const token = await getSessionData(SESSION_KEYS.TOKEN);
          setIsLoggedIn(!!token);
          setData(null);
        } else {
          // If keys provided, get all those keys
          const result = await getMultipleSessionData(keys);
          setData(result);

          // Also check if logged in
          const token =
            result[SESSION_KEYS.TOKEN] ||
            (await getSessionData(SESSION_KEYS.TOKEN));
          setIsLoggedIn(!!token);
        }
      } catch (error) {
        console.error("Session fetch error:", error);
        setIsLoggedIn(false);
        setData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [keys?.join(",")]);

  const logout = async () => {
    await await clearUserSession();
    setData(null);
  };

  return {
    isLoggedIn,
    isLoading,
    data,
    logout,
  };
};
