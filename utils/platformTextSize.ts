import { Platform } from "react-native";

export function platformTextSize(iosSize: number): string {
  const size = Platform.OS === "android" ? iosSize - 1 : iosSize;
  return `text-${size}`;
}
