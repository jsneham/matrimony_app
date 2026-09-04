import { DummyIcon } from "@/constants/icons";
import { colors } from "@/constants/theme";
import { EditableFieldDescriptor } from "@/types/profile";
import { formatTime, parseTimeToDate } from "@/utils/dateTime";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { Platform, Pressable, View } from "react-native";
import { Text } from "@/components/ui/Text";
import { TextInput } from "@/components/ui/TextInput";
import RangeSliderRow from "./RangeSliderRow";

const DEFAULT_MAX_LENGTH = 1000;

export const EditableFieldRow: React.FC<{
  descriptor: EditableFieldDescriptor;
  value: string;
  onChange: (text: string) => void;
  isLast: boolean;
  editableFieldsData: Record<string, string>;
  onEditableFieldChange: (key: string, text: string) => void;
}> = ({
  descriptor,
  value,
  onChange,
  isLast,
  editableFieldsData,
  onEditableFieldChange,
}) => {
  const { label, placeholder, type = "text", isMultiline = false } = descriptor;
  console.log("isMultiline", isMultiline);

  const [showPicker, setShowPicker] = useState(false);

  const rowStyle = isLast
    ? { borderBottomLeftRadius: 16, borderBottomRightRadius: 16 }
    : undefined;
  const rowClass = `px-5 py-4 flex-row items-center bg-white ${
    isLast ? "" : "border-b border-gray-100"
  }`;

  if (
    type === "range" &&
    descriptor.options &&
    descriptor.fromField &&
    descriptor.toField
  ) {
    return (
      <RangeSliderRow
        label={label}
        options={descriptor.options}
        fromId={editableFieldsData[descriptor.fromField]}
        toId={editableFieldsData[descriptor.toField]}
        isLast={isLast}
        onCommit={(fromItem, toItem) => {
          onEditableFieldChange(descriptor.fromField!, fromItem.id);
          onEditableFieldChange(descriptor.toField!, toItem.id);
        }}
      />
    );
  }

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

  // default: plain text field
  const maxLength = isMultiline
    ? (descriptor.maxLength ?? DEFAULT_MAX_LENGTH)
    : 50;

  return (
    <View
      className={`py-4 bg-white ${isLast ? "" : "border-b border-gray-100"}`}
      style={rowStyle}
    >
      <View style={{ marginTop: 12, marginBottom: 12 }}>
        <DummyIcon size={36} />
      </View>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder || `Enter ${label}`}
        maxLength={maxLength}
        multiline={isMultiline}
        numberOfLines={isMultiline ? 4 : 1}
        className={`text-base border border-gray-300 rounded-md py-2 px-3 w-full mt-2 ${
          value ? "text-gray font-regular" : "text-placeholder font-regular"
        }`}
        style={{
          minHeight: isMultiline ? 100 : 44,
          height: isMultiline ? undefined : 44,
        }}
        placeholderTextColor={colors.placeholder}
      />
      <Text className="text-xs text-gray-400 text-right mt-1 font-regular">
        {value.length}/{maxLength}
      </Text>
    </View>
  );
};
