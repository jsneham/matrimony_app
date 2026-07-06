import { DummyIcon } from "@/constants/icons";
import { colors } from "@/constants/theme";
import { EditableFieldDescriptor } from "@/types/profile";
import { formatTime, parseTimeToDate } from "@/utils/dateTime";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { Platform, Pressable, Text, TextInput, View } from "react-native";

export const EditableFieldRow: React.FC<{
  descriptor: EditableFieldDescriptor;
  value: string;
  onChange: (text: string) => void;
  isLast: boolean;
}> = ({ descriptor, value, onChange, isLast }) => {
  const { label, placeholder, type = "text" } = descriptor;
  const [showPicker, setShowPicker] = useState(false);

  const rowStyle = isLast
    ? { borderBottomLeftRadius: 16, borderBottomRightRadius: 16 }
    : undefined;
  const rowClass = `px-5 py-4 flex-row items-center bg-white ${
    isLast ? "" : "border-b border-gray-100"
  }`;

  if (type === "time") {
    return (
      <View className={rowClass} style={rowStyle}>
        <DummyIcon />
        <View className="flex-1">
          <Text className="text-base font-bold text-black mb-1">{label}</Text>

          <Pressable onPress={() => setShowPicker(true)}>
            <Text
              className={`text-base ${
                value
                  ? "text-gray font-regular"
                  : "text-placeholder font-regular"
              }`}
            >
              {value || placeholder || `Select ${label}`}
            </Text>
          </Pressable>

          {showPicker && (
            <DateTimePicker
              value={parseTimeToDate(value)}
              mode="time"
              is24Hour={false}
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={(event, selectedDate) => {
                // Android fires "dismissed" on cancel; only commit on a real pick
                setShowPicker(Platform.OS === "ios"); // iOS spinner stays open until user dismisses sheet manually if you add a Done button; set false here if you add explicit close
                if (event.type === "dismissed" || !selectedDate) return;
                onChange(formatTime(selectedDate));
              }}
            />
          )}
        </View>
      </View>
    );
  }

  // default: plain text field (unchanged behavior)
  return (
    <View
      className={`py-4 bg-white ${isLast ? "" : "border-b border-gray-100"}`}
      style={rowStyle}
    >
      <DummyIcon />
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder || `Enter ${label}`}
        className={`text-base border border-gray-300 rounded-md py-2 px-3 w-full mt-2 ${
          value ? "text-gray font-regular" : "text-placeholder font-regular"
        }`}
        style={{ textAlignVertical: "center", includeFontPadding: false }}
        placeholderTextColor={colors.placeholder}
      />
    </View>
  );
};
