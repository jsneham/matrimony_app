// components/ui/Text.tsx
import { Platform, Text as RNText, TextProps } from "react-native";

export function Text({ style, ...props }: TextProps) {
  return (
    <RNText
      style={[
        Platform.OS === "android" ? { includeFontPadding: false } : null,
        style,
      ]}
      {...props}
    />
  );
}
