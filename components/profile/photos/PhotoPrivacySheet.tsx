import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Modal, Pressable, View } from "react-native";
import { Text } from "@/components/ui/Text";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export type PrivacyOption = {
  id: string;
  label: string;
};

type PhotoPrivacySheetProps = {
  visible: boolean;
  title: string;
  options: PrivacyOption[];
  selectedId?: string;
  onSelect: (id: string) => void;
  onClose: () => void;
};

export const PhotoPrivacySheet: React.FC<PhotoPrivacySheetProps> = ({
  visible,
  title,
  options,
  selectedId,
  onSelect,
  onClose,
}) => {
  const insets = useSafeAreaInsets();
  const translateY = useSharedValue(900);
  const [localSelected, setLocalSelected] = React.useState(selectedId);

  const panelStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  React.useEffect(() => {
    if (visible) {
      translateY.value = 900;
      setLocalSelected(selectedId);
      const timer = setTimeout(() => {
        translateY.value = withTiming(0, {
          duration: 300,
          easing: Easing.bezier(0, 0, 0.58, 1),
        });
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [visible, selectedId]);

  const doClose = () => {
    onClose();
  };

  const animateClose = () => {
    translateY.value = withTiming(
      900,
      { duration: 250, easing: Easing.bezier(0.42, 0, 1, 1) },
      () => {
        runOnJS(doClose)();
      },
    );
  };

  const handleSelect = (option: PrivacyOption) => {
    setLocalSelected(option.id);
  };

  const handleSave = () => {
    if (localSelected) onSelect(localSelected);
    animateClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="none"
      transparent
      statusBarTranslucent
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View
          className="flex-1 justify-end"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <Pressable style={{ flex: 1 }} onPress={animateClose} />

          <Animated.View
            style={[
              panelStyle,
              {
                paddingBottom: 16 + insets.bottom,
              },
            ]}
            className="bg-white rounded-t-[20px]"
          >
            {/* Header */}
            <View className="items-center px-5 py-5 border-b border-light-divider-color">
              <Text className="text-lg font-bold text-black text-center">
                {title}
              </Text>
            </View>

            <View className="items-center pt-6">
              <View className="w-24 h-24 rounded-full bg-gray-200 items-center justify-center mb-6">
                <Ionicons name="eye-outline" size={40} color="#d1d5db" />
              </View>
            </View>

            {/* Options */}
            <View className="py-2">
              {options.map((option) => {
                const isSelected = option.id === localSelected;
                return (
                  <Pressable
                    key={option.id}
                    onPress={() => handleSelect(option)}
                    className="flex-row items-center px-5 py-4 active:bg-gray-50"
                  >
                    <View
                      className={`w-5 h-5 rounded-full border items-center justify-center mr-4 ${
                        isSelected ? "border-pink-600" : "border-black"
                      }`}
                    >
                      {isSelected && (
                        <View className="w-2.5 h-2.5 rounded-full bg-pink-600" />
                      )}
                    </View>
                    <Text
                      className={`flex-1 text-base font-bold ${
                        isSelected ? "text-pink-600" : "text-black"
                      }`}
                    >
                      {option.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            <View className="px-5 pt-2">
              <Pressable
                onPress={handleSave}
                className="w-full py-4 bg-pink-600 rounded-full items-center active:bg-pink-700"
              >
                <Text className="text-white font-bold text-base">
                  Save &amp; Update
                </Text>
              </Pressable>

              <Pressable
                onPress={animateClose}
                className="w-full mt-2 items-center justify-center rounded-full py-4 active:opacity-60"
              >
                <Text className="text-base font-bold text-[#8b8b8b]">
                  Close
                </Text>
              </Pressable>
            </View>
          </Animated.View>
        </View>
      </GestureHandlerRootView>
    </Modal>
  );
};

export default PhotoPrivacySheet;
