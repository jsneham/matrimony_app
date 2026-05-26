import * as Location from "expo-location";

export const getCurrentLocation = async (): Promise<{
  latitude: string;
  longitude: string;
}> => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      console.log("Location permission denied");
      return { latitude: "", longitude: "" };
    }

    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });

    return {
      latitude: location.coords.latitude.toString(),
      longitude: location.coords.longitude.toString(),
    };
  } catch (error) {
    console.log("Error getting location:", error);
    return { latitude: "", longitude: "" };
  }
};
