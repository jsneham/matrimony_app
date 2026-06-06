// LogoutModal.js
import React, { useEffect } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function BottomModal({ visible, onConfirm, onCancel }) {
  const translateY = useSharedValue(600);
  const opacity = useSharedValue(0);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (visible) {
      translateY.value = withSpring(0, {
        damping: 12,
        mass: 1,
        stiffness: 100,
      });
      opacity.value = withSpring(1, {
        damping: 12,
        mass: 1,
        stiffness: 100,
      });
    } else {
      translateY.value = withSpring(600, {
        damping: 12,
        mass: 1,
        stiffness: 100,
      });
      opacity.value = withSpring(0, {
        damping: 12,
        mass: 1,
        stiffness: 100,
      });
    }
  }, [visible]);

  const animatedModalStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const animatedOverlayStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  if (!visible) return null;

  return (
    <View className="absolute inset-0 justify-end">
      {/* Animated Overlay */}
      <Animated.View
        style={animatedOverlayStyle}
        className="absolute inset-0 bg-black/50"
        pointerEvents={visible ? "auto" : "none"}
      >
        <Pressable className="flex-1" onPress={onCancel} />
      </Animated.View>

      {/* Animated Modal Content */}
      <Animated.View
        style={[animatedModalStyle, { paddingBottom: insets.bottom }]}
        className="bg-white rounded-t-3xl px-6 py-8"
      >
        {/* Handle Bar */}
        <View className="w-12 h-1 bg-gray-300 rounded-full self-center mb-6" />

        {/* Title */}
        <Text className="text-2xl font-bold text-black mb-4">Logout</Text>

        {/* Message */}
        <Text className="text-base text-gray-500 mb-8">
          Are you sure want to logout from the app?
        </Text>

        {/* Buttons Container */}
        <View className="gap-3">
          {/* No Button (Filled Orange) */}
          <Pressable
            onPress={onCancel}
            className="bg-orange-500 rounded-xl py-4 active:bg-orange-600"
          >
            <Text className="text-white text-center text-lg font-semibold">
              No
            </Text>
          </Pressable>

          {/* Yes Button (Outlined Orange) */}
          <Pressable
            onPress={onConfirm}
            className="border-2 border-orange-500 rounded-xl py-4 active:bg-orange-50"
          >
            <Text className="text-orange-500 text-center text-lg font-semibold">
              Yes
            </Text>
          </Pressable>
        </View>

        {/* Bottom divider line */}
        <View className="w-16 h-1 bg-gray-400 rounded-full self-center mt-6" />
      </Animated.View>
    </View>
  );
}
