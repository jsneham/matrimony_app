import NonEditableFieldModal from "@/components/NonEditableFieldModal";
import { DummyIcon } from "@/constants/icons";
import { colors } from "@/constants/theme";
import { EditRowProps } from "@/types/profile";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Text } from "@/components/ui/Text";

export const NonEditableText: React.FC<EditRowProps> = ({
  label,
  value,
  onPress,
  placeholder,
  editable = true,
  isFirst = false,
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
        className={`pl-5 pr-4 pt-5 pb-4 flex-row justify-between items-start bg-white ${isLast ? "" : "border-b border-gray-100"}`}
        style={{
          ...(isFirst
            ? { borderTopLeftRadius: 16, borderTopRightRadius: 16 }
            : null),
          ...(isLast
            ? { borderBottomLeftRadius: 16, borderBottomRightRadius: 16 }
            : null),
        }}
      >
        <View className="flex-1">
          <View className="flex-row items-center mb-3">
            <DummyIcon />
            <Text className="text-base font-bold text-black">{label}</Text>
          </View>
          <Text
            className={`text-base ${
              value ? "text-gray font-regular" : "text-placeholder font-regular"
            }`}
            style={{ marginLeft: 36 }}
          >
            {value || placeholder || `Enter ${label}`}
          </Text>
        </View>

        {editable ? (
          <Ionicons name="chevron-forward" size={16} color={colors.gray} />
        ) : (
          <Feather name="info" size={16} color={colors.gray} />
        )}
      </TouchableOpacity>

      <NonEditableFieldModal
        visible={showInfo}
        onClose={() => setShowInfo(!showInfo)}
      />
    </>
  );
};
