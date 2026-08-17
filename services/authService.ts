import {
  LoginRequest,
  LoginResponse,
  SignupRequest,
  User,
} from "@/types/login";
import { getCurrentLocation } from "@/utils/location";
import { api, getDeviceToken } from "./api";

export const authService = {
  // Login
  //   login: async (data: LoginRequest): Promise<LoginResponse> => {
  //     const response = await api.post("/login/check_login_service", data);
  //     return response.data;
  //   },
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const location = await getCurrentLocation();
    const deviceToken = await getDeviceToken();

    const params = {
      username: data.username,
      password: data.password,
      latitude: location.latitude,
      longitude: location.longitude,
      android_device_id: deviceToken,
    };

    const response = await api.post("login/check_login_service", params);
    // console.log("Login Details", response.data);

    return response.data;
  },

  // Signup
  signup: async (data: SignupRequest): Promise<LoginResponse> => {
    const response = await api.post("login/signup", data);
    return response.data;
  },

  // Get current user
  getCurrentUser: async (): Promise<User> => {
    const response = await api.get("/login/me");
    return response.data;
  },

  // Logout
  logout: async (): Promise<void> => {
    await api.post("/login/logout");
  },

  // Forgot password
  forgotPassword: async (email: string): Promise<{ message: string }> => {
    const response = await api.post("/login/forgot-password", { email });
    return response.data;
  },

  // Reset password
  resetPassword: async (
    token: string,
    password: string,
  ): Promise<{ message: string }> => {
    const response = await api.post("/login/reset-password", {
      token,
      password,
    });
    return response.data;
  },
};
