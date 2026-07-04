// components/profile/NonEditableFieldModal.tsx
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Modal, Pressable, Text, View } from "react-native";
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type NonEditableFieldModalProps = {
  visible: boolean;
  onClose: () => void;
  helpUrl?: string; // link to your Help & Support section
};

export const NonEditableFieldModal: React.FC<NonEditableFieldModalProps> = ({
  visible,
  onClose,
  helpUrl = "",
}) => {
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

  const doClose = () => {
    onClose();
  };

  const animateClose = () => {
    translateY.value = withTiming(
      900,
      {
        duration: 250,
        easing: Easing.bezier(0.42, 0, 1, 1),
      },
      () => {
        runOnJS(doClose)();
      },
    );
  };

  const handleGoToHelp = () => {
    animateClose();
    // Linking.openURL(helpUrl);
  };

  return (
    <Modal
      visible={visible}
      animationType="none"
      transparent
      statusBarTranslucent
    >
      <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}>
        <Pressable style={{ flex: 1 }} onPress={animateClose} />

        <Animated.View
          style={[
            panelStyle,
            {
              backgroundColor: "white",
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              paddingBottom: insets.bottom + 16,
            },
          ]}
        >
          <View className="items-center pt-3 pb-1">
            <View className="w-10 h-1.5 rounded-full bg-gray-200" />
          </View>

          <View className="px-6 pt-6 items-center">
            <View className="w-24 h-24 rounded-full bg-gray-200 items-center justify-center mb-6">
              <Ionicons name="person" size={40} color="#d1d5db" />
            </View>

            <Text className="text-xl font-bold text-black text-center mb-4">
              Some Fields like Date of Birth, Age, Height cannot be edited
            </Text>

            <Text className="text-base text-gray-400 text-center mb-8 leading-6">
              If you have made a mistake, please visit the Help Center and reach
              out to customer support team to modify these
            </Text>

            <Pressable
              onPress={handleGoToHelp}
              className="w-full py-4 bg-pink-600 rounded-full items-center active:bg-pink-700"
            >
              <Text className="text-white font-bold text-base">
                Go to Help &amp; Support Section
              </Text>
            </Pressable>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default NonEditableFieldModal;
