// components/ui/TextInput.tsx
import { Platform, TextInput as RNTextInput, TextInputProps } from "react-native";

export function TextInput({ style, multiline, ...props }: TextInputProps) {
  return (
    <RNTextInput
      multiline={multiline}
      style={[
        Platform.OS === "android"
          ? {
              includeFontPadding: false,
              textAlignVertical: multiline ? "top" : "center",
            }
          : null,
        style,
      ]}
      {...props}
    />
  );
}
