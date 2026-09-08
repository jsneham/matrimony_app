import { Platform } from "react-native";

export function platformTextSize(iosSize: number): string {
  const size = Platform.OS === "android" ? iosSize - 2 : iosSize;
  console.log("size", Platform.OS, size);
  
  return `text-${size}`;
}
