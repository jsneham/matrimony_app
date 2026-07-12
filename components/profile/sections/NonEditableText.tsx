import NonEditableFieldModal from "@/components/NonEditableFieldModal";
import { DummyIcon } from "@/constants/icons";
import { EditRowProps } from "@/types/profile";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export const NonEditableText: React.FC<EditRowProps> = ({
  label,
  value,
  onPress,
  placeholder,
  editable = true,
  isLast = false,
}) => {
  const [showInfo, setShowInfo] = useState(false);

  const handlePress = () => {
    if (editable) {
      onPress?.();
    } else {
      setShowInfo(!showInfo);
    }
  };

  return (
    <>
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.7}
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
          <Text
            className={`text-base ${
              value ? "text-gray font-regular" : "text-placeholder font-regular"
            }`}
          >
            {value || placeholder || `Enter ${label}`}
          </Text>
        </View>

        {editable ? (
          <Ionicons name="chevron-forward" size={16} color="#9ca3af" />
        ) : (
          <Feather name="info" size={16} color="#9ca3af" />
        )}
      </TouchableOpacity>

      <NonEditableFieldModal
        visible={showInfo}
        onClose={() => setShowInfo(!showInfo)}
      />
    </>
  );
};
