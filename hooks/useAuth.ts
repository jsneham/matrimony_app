import { authService } from "@/services/authService";
import { LoginRequest } from "@/types/login";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as SecureStore from "expo-secure-store";

// Session Manager Keys
export const SESSION_KEYS = {
  TOKEN: "csrf_token",
  USER_ID: "user_id",
  EMAIL: "email",
  USERNAME: "username",
  GENDER: "gender",
  MATRI_ID: "matri_id",
  PLAN_STATUS: "plan_status",
  LOGIN_WITH: "login_with",
  DEVICE_TOKEN: "device_token",
};

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

    console.log("User session saved successfully");
  } catch (error) {
    console.error("Error saving session:", error);
  }
};

// Clear user session
const clearUserSession = async () => {
  try {
    await SecureStore.deleteItemAsync(SESSION_KEYS.TOKEN);
    await SecureStore.deleteItemAsync(SESSION_KEYS.USER_ID);
    await SecureStore.deleteItemAsync(SESSION_KEYS.EMAIL);
    await SecureStore.deleteItemAsync(SESSION_KEYS.USERNAME);
    await SecureStore.deleteItemAsync(SESSION_KEYS.GENDER);
    await SecureStore.deleteItemAsync(SESSION_KEYS.MATRI_ID);
    await SecureStore.deleteItemAsync(SESSION_KEYS.PLAN_STATUS);
    await SecureStore.deleteItemAsync(SESSION_KEYS.LOGIN_WITH);

    console.log("User session cleared");
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

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginRequest) => authService.login(data),
    onSuccess: async (response) => {
      console.log("Login response:", response);

      if (response.status === "success") {
        // Save token
        return await saveUserSession(response.user_data, response.token);

        // Navigate to dashboard with flags to clear stack
        // router.replace('/(tabs)');
      } else {
        // Show error message from API
        // Alert.alert('Login Failed', response.errmessage || 'Something went wrong');
        return response.errmessage || "Something went wrong. Please try again.";
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

      return errorMessage;
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
//       queryClient.invalidateQueries({ queryKey: ["user"] });
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
