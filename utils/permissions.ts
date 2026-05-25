// utils/permissions.ts
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import * as MediaLibrary from "expo-media-library";
import { Alert, Linking } from "react-native";

export const requestCameraPermission = async (): Promise<boolean> => {
  const { status } = await ImagePicker.requestCameraPermissionsAsync();

  if (status !== "granted") {
    Alert.alert(
      "Permission Required",
      "Camera permission is needed to take photos",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Open Settings", onPress: () => Linking.openSettings() },
      ],
    );
    return false;
  }
  return true;
};

export const requestMediaLibraryPermission = async (): Promise<boolean> => {
  const { status } = await MediaLibrary.requestPermissionsAsync();

  if (status !== "granted") {
    Alert.alert(
      "Permission Required",
      "Media library permission is needed to select photos",
    );
    return false;
  }
  return true;
};

export const requestLocationPermission = async (): Promise<boolean> => {
  const { status } = await Location.requestForegroundPermissionsAsync();

  if (status !== "granted") {
    Alert.alert(
      "Permission Required",
      "Location permission is needed to show nearby matches",
    );
    return false;
  }
  return true;
};

// Check if permission is already granted
export const checkCameraPermission = async (): Promise<boolean> => {
  const { status } = await ImagePicker.getCameraPermissionsAsync();
  return status === "granted";
};

export const checkMediaLibraryPermission = async (): Promise<boolean> => {
  const { status } = await MediaLibrary.getPermissionsAsync();
  return status === "granted";
};

export const checkLocationPermission = async (): Promise<boolean> => {
  const { status } = await Location.getForegroundPermissionsAsync();
  return status === "granted";
};
