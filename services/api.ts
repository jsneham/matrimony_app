import axios from "axios";
import * as Application from "expo-application";
import * as Device from "expo-device";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const USER_AGENT = "NI-AAPP"; // Replace with your app name
const REQUEST_TIMEOUT = 30000; // 30 seconds

// Create axios instance with base configuration
export const api = axios.create({
  baseURL: "https://www.milann.in/", // Replace with your API URL
  timeout: REQUEST_TIMEOUT,
  headers: {
    // "Content-Type": "application/json",
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

// Get token from secure storage
export const getToken = async () => {
  return await SecureStore.getItemAsync("csrf_token");
};

// Get user ID from secure storage
export const getUserId = async () => {
  return await SecureStore.getItemAsync("user_id");
};

// Get device token/ID
export const getDeviceToken = async () => {
  let deviceId = await SecureStore.getItemAsync("device_token");
  if (!deviceId) {
    try {
      // Try to get Android ID first
      if (Platform.OS === "android") {
        deviceId = await Application.getAndroidId();
      } else if (Platform.OS === "ios") {
        deviceId = await Application.getIosIdForVendorAsync();
      }

      // Fallback to device model if no ID available
      if (!deviceId) {
        deviceId = Device.modelId || Device.modelName || "unknown";
      }

      // Save the device ID
      await SecureStore.setItemAsync("device_token", deviceId as string);
    } catch (error) {
      console.log("Error getting device ID:", error);
      deviceId = "unknown";
      await SecureStore.setItemAsync("device_token", deviceId);
    }
  }
  return deviceId;
};

// Request interceptor - Add common parameters to all requests
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await getToken();
      const userId = await getUserId();

      if (config.method === "post" || config.method === "put") {
        // Ensure config.data is an object
        if (!config.data) {
          config.data = {};
        }

        // Add authentication parameters
        config.data = {
          ...config.data,
          user_agent: USER_AGENT,
          csrf_new_matrimonial: token || "",
          logged_in_user_id: userId || "",
        };

        console.log("🔄 API Request:", {
          url: config.url,
          method: config.method,
          dataKeys: Object.keys(config.data),
        });
      }

      return config;
    } catch (error) {
      console.error("❌ Request interceptor error:", error);
      return Promise.reject(error);
    }
  },
  (error) => {
    console.error("❌ Request error:", error);
    return Promise.reject(error);
  },
);

// Response interceptor - Handle errors globally
api.interceptors.response.use(
  (response) => {
    console.log("✅ API Response received:", {
      status: response.status,
      dataType: typeof response.data,
      isArray: Array.isArray(response.data),
    });
    return response;
  },
  async (error) => {
    console.error("❌ API Error:", {
      message: error.message,
      status: error.response?.status,
      url: error.config?.url,
      data: error.response?.data,
    });

    if (error.response) {
      const statusCode = error.response.status;

      if (statusCode === 401) {
        console.warn("⚠️ Unauthorized - clearing tokens");
        try {
          await SecureStore.deleteItemAsync("csrf_token");
          await SecureStore.deleteItemAsync("user_id");
        } catch (e) {
          console.error("Error clearing tokens:", e);
        }
      }
    }

    return Promise.reject(error);
  },
);

// Helper function to get error message from status code
export const getErrorMessageFromErrorCode = (statusCode: number): string => {
  switch (statusCode) {
    case 400:
      return "Bad Request";
    case 401:
      return "Unauthorized. Please login again.";
    case 403:
      return "Forbidden";
    case 404:
      return "Not Found";
    case 500:
      return "Internal Server Error";
    case 502:
      return "Bad Gateway";
    case 503:
      return "Service Unavailable";
    default:
      return "Something went wrong. Please try again.";
  }
};
