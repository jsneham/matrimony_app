import { DummyIcon } from "@/constants/icons";
import { colors } from "@/constants/theme";
import { EditableTextProps, EditRowProps } from "@/types/profile";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import NonEditableFieldModal from "../NonEditableFieldModal";

export const EditRow: React.FC<EditRowProps> = ({
  label,
  value,
  onPress,
  placeholder,
  editable = true,
  isLast = false,
}) => {
  const [showInfo, setShowInfo] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);

  const handlePress = () => {
    if (editable) {
      onPress?.();
    } else {
      setShowInfo(true);
    }
  };

  const displayText = value || placeholder || `Select ${label}`;
  const showViewMore = isTruncated && !expanded;

  return (
    <>
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={editable ? 0.7 : 1}
        className={`px-5 py-4 flex-row justify-between items-center bg-white ${isLast ? "" : "border-b border-gray-100"}`}
        style={
          isLast
            ? { borderBottomLeftRadius: 16, borderBottomRightRadius: 16 }
            : undefined
        }
      >
        <DummyIcon />

        <View className="flex-1">
          <Text className="text-base font-bold text-black mb-1">{label}</Text>

          <View>
            {/* Hidden measurement pass — detects if full text exceeds 3 lines */}
            <Text
              className="text-base absolute opacity-0"
              style={{ zIndex: -1 }}
              onTextLayout={(e) => {
                if (e.nativeEvent.lines.length > 3 && !isTruncated) {
                  setIsTruncated(true);
                }
              }}
            >
              {displayText}
            </Text>

            <Text
              numberOfLines={expanded ? undefined : 3}
              className={`text-base ${
                value
                  ? "text-gray font-regular"
                  : "text-placeholder font-regular"
              }`}
              style={showViewMore ? { lineHeight: 20 } : undefined}
            >
              {displayText}
            </Text>

            {showViewMore && (
              <TouchableOpacity
                onPress={(e) => {
                  e.stopPropagation();
                  setExpanded(true);
                }}
                hitSlop={{ top: 4, bottom: 4, left: 4, right: 4 }}
                style={{
                  position: "absolute",
                  right: 0,
                  bottom: 0,
                  flexDirection: "row",
                  alignItems: "flex-end",
                }}
              >
                <LinearGradient
                  colors={["transparent", "#ffffff", "#ffffff"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{ paddingLeft: 24 }}
                >
                  <Text className="text-pink-600 text-base font-semibold">
                    View more
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            )}
          </View>

          {expanded && (
            <TouchableOpacity
              onPress={(e) => {
                e.stopPropagation();
                setExpanded(false);
              }}
              hitSlop={{ top: 4, bottom: 4, left: 4, right: 4 }}
              className="mt-1 self-start"
            >
              <Text className="text-pink-600 text-sm font-semibold">
                View less
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {editable ? (
          <Ionicons name="chevron-forward" size={16} color="#9ca3af" />
        ) : (
          <Ionicons
            name="information-circle-outline"
            size={16}
            color="#9ca3af"
          />
        )}
      </TouchableOpacity>

      <NonEditableFieldModal
        visible={showInfo}
        onClose={() => setShowInfo(false)}
      />
    </>
  );
};

// 2. Section divider headers
export const EditSectionHeader: React.FC<{ title: string }> = ({ title }) => (
  <View
    style={{
      paddingTop: 12,
      paddingBottom: 12,
      paddingRight: 20,
      paddingLeft: 0,
    }}
  >
    <Text className="text-black font-bold text-sm">{title}</Text>
  </View>
);

// 3. Top Banner displaying completion level and verification link
type ProfileProgressBannerProps = {
  percentage: number;
};

export const ProfileProgressBanner: React.FC<ProfileProgressBannerProps> = ({
  percentage,
}) => (
  <View className="flex-row items-center justify-between mx-5 h-[34px] my-3 bg-white px-3 rounded-xl">
    <Text className="text-gray font-regular text-sm">
      Profile is {percentage}% updated.
    </Text>
    <TouchableOpacity className="flex-row items-center">
      <Text className="text-black text-sm font-bold">Verify Profile</Text>
      <Ionicons
        name="pencil"
        size={14}
        color="black"
        style={{ marginLeft: 6 }}
      />
    </TouchableOpacity>
  </View>
);

export const PreferenceProgressBanner: React.FC<ProfileProgressBannerProps> = ({
  percentage,
}) => (
  <View className="flex-row items-center justify-between mx-5 h-[34px] my-3 bg-white px-3 rounded-xl">
    <Ionicons
      name="information-circle-outline"
      size={14}
      color="#9ca3af"
      style={{ marginRight: 6 }}
    />
    <Text className="text-gray font-regular text-sm">
      Matches are calculated based on these preferences.
    </Text>
  </View>
);

// 4. Foreground blocker with loading spinners during updates
type LoadingOverlayProps = {
  visible: boolean;
  label: string;
};

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  visible,
  label,
}) => {
  if (!visible) return null;
  return (
    <View className="absolute inset-0 bg-white/60 z-50 items-center justify-center">
      <ActivityIndicator size="large" color="#db2777" />
      <Text className="mt-2 text-pink-600 font-bold text-sm">{label}</Text>
    </View>
  );
};

export const EditableText: React.FC<EditableTextProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  isLast = false,
}) => {
  return (
    <View
      className={`px-5 py-4 flex-row items-center bg-white ${isLast ? "" : "border-b border-gray-100"}`}
      style={
        isLast
          ? { borderBottomLeftRadius: 16, borderBottomRightRadius: 16 }
          : undefined
      }
    >
      <DummyIcon />

      <View className="flex-1">
        <Text className="text-base font-bold text-black mb-1">{label}</Text>

        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder || `Enter ${label}`}
          className={`text-base ${
            value ? "text-gray font-regular" : "text-placeholder font-regular"
          }`}
          placeholderTextColor={colors.placeholder}
        />
      </View>
    </View>
  );
};
