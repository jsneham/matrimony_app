import { authService } from "@/services/authService";
import { SESSION_KEYS } from "@/types/common";
import { LoginRequest } from "@/types/login";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as SecureStore from "expo-secure-store";

// Save user session data
const saveUserSession = async (userData: any, token: string) => {
  try {
    await SecureStore.setItemAsync(SESSION_KEYS.TOKEN, token);
    await SecureStore.setItemAsync(SESSION_KEYS.USER_ID, userData.id);
    await SecureStore.setItemAsync(SESSION_KEYS.EMAIL, userData.email);
    await SecureStore.setItemAsync(SESSION_KEYS.USERNAME, userData.username);
    await SecureStore.setItemAsync(SESSION_KEYS.GENDER, userData.gender);
    await SecureStore.setItemAsync(SESSION_KEYS.MATRI_ID, userData.matri_id);
    await SecureStore.setItemAsync(
      SESSION_KEYS.PLAN_STATUS,
      userData.plan_status,
    );
    await SecureStore.setItemAsync(SESSION_KEYS.LOGIN_WITH, "local");
  } catch (error) {
    console.error("Error saving session:", error);
  }
};

// Clear user session
export const clearUserSession = async () => {
  try {
    await SecureStore.deleteItemAsync(SESSION_KEYS.TOKEN);
    await SecureStore.deleteItemAsync(SESSION_KEYS.USER_ID);
    await SecureStore.deleteItemAsync(SESSION_KEYS.EMAIL);
    await SecureStore.deleteItemAsync(SESSION_KEYS.USERNAME);
    await SecureStore.deleteItemAsync(SESSION_KEYS.GENDER);
    await SecureStore.deleteItemAsync(SESSION_KEYS.MATRI_ID);
    await SecureStore.deleteItemAsync(SESSION_KEYS.PLAN_STATUS);
    await SecureStore.deleteItemAsync(SESSION_KEYS.LOGIN_WITH);
  } catch (error) {
    console.error("Error clearing session:", error);
  }
};

// Get session data
export const getSessionData = async (key: string): Promise<string | null> => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.error("Error getting session data:", error);
    return null;
  }
};

export const getSessionDataByKeys = async (
  keys: string[],
): Promise<Record<string, string | null>> => {
  const result: Record<string, string | null> = {};

  await Promise.all(
    keys.map(async (key) => {
      result[key] = await SecureStore.getItemAsync(key);
    }),
  );

  return result;
};

// Get multiple session values at once
export const getMultipleSessionData = async (
  keys: string[],
): Promise<Record<string, string | null>> => {
  try {
    const result: Record<string, string | null> = {};

    await Promise.all(
      keys.map(async (key) => {
        result[key] = await SecureStore.getItemAsync(key);
      }),
    );

    return result;
  } catch (error) {
    console.error("Error getting multiple session data:", error);
    return {};
  }
};

// Get all session data
export const getAllSessionData = async (): Promise<
  Record<string, string | null>
> => {
  return getMultipleSessionData(Object.values(SESSION_KEYS));
};

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginRequest) => authService.login(data),

    onSuccess: async (response) => {
      if (response.status === "success") {
        queryClient.invalidateQueries({ queryKey: ["login"] });
        // Save token
        await saveUserSession(response.user_data, response.token);

        // Navigate to dashboard with flags to clear stack
        // router.push("/(tabs)" as Href);
      } else {
        // Show error message from API
        // Alert.alert('Login Failed', response.errmessage || 'Something went wrong');
        // return response.errmessage || "Something went wrong. Please try again.";
      }
    },
    onError: (error: any) => {
      console.error("Login error:", error);

      let errorMessage = "Something went wrong. Please try again.";

      if (error.response) {
        errorMessage =
          error.response.data?.errmessage ||
          error.response.data?.message ||
          errorMessage;
      } else if (error.message) {
        errorMessage = error.message;
      }

      // return errorMessage;
      //   Alert.alert("Login Failed", errorMessage);
    },
  });
};

// export const useSignup = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (data: SignupRequest) => authService.signup(data),
//     onSuccess: async (data) => {
//       await saveToken(data.token);
// queryClient.invalidateQueries({ queryKey: ["user"] });
//       //   router.replace("/(tabs)");
//     },
//     onError: (error: any) => {
//       console.error(
//         "Signup error:",
//         error.response?.data?.message || error.message,
//       );
//     },
//   });
// };

// export const useCurrentUser = () => {
//   return useQuery({
//     queryKey: ["user"],
//     queryFn: authService.getCurrentUser,
//     enabled: false, // Don't auto-fetch, only fetch when we have a token
//     retry: false,
//   });
// };

// export const useLogout = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: authService.logout,
//     onSuccess: async () => {
//       await removeToken();
//       queryClient.clear(); // Clear all queries
//       router.replace("/(auth)/login");
//     },
//   });
// };

// export const useForgotPassword = () => {
//   return useMutation({
//     mutationFn: (email: string) => authService.forgotPassword(email),
//     onSuccess: (data) => {
//       console.log(data.message);
//     },
//   });
// };
