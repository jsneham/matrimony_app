// LogoutModal.js
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Modal, Pressable, View } from "react-native";
import { Text } from "@/components/ui/Text";
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "@/constants/theme";

type BottomModalProps = {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function BottomModal({
  visible,
  onConfirm,
  onCancel,
}: BottomModalProps) {
  const insets = useSafeAreaInsets();
  const translateY = useSharedValue(900);

  const panelStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  React.useEffect(() => {
    if (visible) {
      translateY.value = 900;
      const timer = setTimeout(() => {
        translateY.value = withTiming(0, {
          duration: 300,
          easing: Easing.bezier(0, 0, 0.58, 1),
        });
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  const animateClose = (after: () => void) => {
    translateY.value = withTiming(
      900,
      {
        duration: 250,
        easing: Easing.bezier(0.42, 0, 1, 1),
      },
      () => {
        runOnJS(after)();
      },
    );
  };

  const handleCancel = () => animateClose(onCancel);
  const handleConfirm = () => animateClose(onConfirm);

  return (
    <Modal
      visible={visible}
      animationType="none"
      transparent
      statusBarTranslucent
    >
      <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}>
        <Pressable style={{ flex: 1 }} onPress={handleCancel} />

        <Animated.View
          style={[
            panelStyle,
            {
              backgroundColor: "white",
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              paddingBottom: 16 + insets.bottom,
            },
          ]}
        >
          <View className="items-center px-5 py-5 border-b border-light-divider-color">
            <Text className="text-2xl leading-none font-bold text-black text-center">
              Logout
            </Text>
          </View>

          <View className="px-6 pt-6 items-center">
            <View className="w-24 h-24 rounded-full bg-gray-200 items-center justify-center mb-6">
              <Ionicons name="log-out-outline" size={40} color="#d1d5db" />
            </View>

            <Text className="text-xl font-bold text-black text-center mb-4">
              Are you sure you want to logout?
            </Text>

            <Text className="text-base font-regular text-gray-400 text-center mb-8 leading-6">
              If you&apos;re facing any issues or need assistance, please visit the Help &amp;
              Support section.
            </Text>

            <Pressable onPress={handleConfirm} className="mt-4 mb-8">
              <Text
                className="text-base font-regular text-gray-400 pb-[1px]"
                style={{ borderBottomWidth: 1, borderBottomColor: colors.gray }}
              >
                Logout
              </Text>
            </Pressable>

            <Pressable
              onPress={handleCancel}
              className="w-full py-4 bg-pink-600 rounded-full items-center active:bg-pink-700"
            >
              <Text className="text-white font-bold text-base">
                Go to Help &amp; Support Section
              </Text>
            </Pressable>

            <Pressable
              onPress={handleCancel}
              className="w-full mt-2 items-center justify-center rounded-full py-4 active:opacity-60"
            >
              <Text className="text-base font-bold text-gray">
                Close
              </Text>
            </Pressable>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}
