import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
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

type UpgradePlanSheetProps = {
  visible: boolean;
  message: string;
  onClose: () => void;
};

export const UpgradePlanSheet: React.FC<UpgradePlanSheetProps> = ({
  visible,
  message,
  onClose,
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

  const doClose = () => onClose();

  const animateClose = () => {
    translateY.value = withTiming(
      900,
      { duration: 250, easing: Easing.bezier(0.42, 0, 1, 1) },
      () => {
        runOnJS(doClose)();
      },
    );
  };

  const handleUpgrade = () => {
    // translateY.value = withTiming(
    //   900,
    //   { duration: 250, easing: Easing.bezier(0.42, 0, 1, 1) },
    //   () => {
    //     runOnJS(doClose)();
    //     runOnJS(() => router.push("/(membership)"))();
    //   },
    // );
    router.push("/(membership)");
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
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "flex-end",
          }}
        >
          <Pressable style={{ flex: 1 }} onPress={animateClose} />

          <Animated.View
            style={[
              panelStyle,
              {
                backgroundColor: "white",
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                paddingHorizontal: 20,
                paddingTop: 24,
                paddingBottom: Math.max(insets.bottom, 20),
              },
            ]}
          >
            {/* Icon + close */}
            <View className="items-end">
              <Pressable onPress={animateClose} hitSlop={10}>
                <Ionicons name="close" size={24} color="#111827" />
              </Pressable>
            </View>

            <View className="items-center -mt-4 mb-2">
              <View className="w-14 h-14 rounded-full bg-pink-50 items-center justify-center mb-4">
                <Ionicons name="lock-closed" size={26} color="#db2777" />
              </View>
              <Text className="text-2xl leading-none font-bold text-black text-center">
                Upgrade Required
              </Text>
              <Text className="text-sm text-gray-500 text-center mt-2 leading-5 font-regular">
                {message}
              </Text>
            </View>

            <View className="mt-6 gap-3">
              <Pressable
                onPress={handleUpgrade}
                className="py-3 bg-pink-600 rounded-full items-center active:bg-pink-700"
              >
                <Text className="text-white font-bold text-base">
                  Upgrade Membership
                </Text>
              </Pressable>
              <Pressable onPress={animateClose} className="py-3 items-center">
                <Text className="text-gray-500 font-medium text-base">
                  Maybe Later
                </Text>
              </Pressable>
            </View>
          </Animated.View>
        </View>
      </GestureHandlerRootView>
    </Modal>
  );
};

export default UpgradePlanSheet;
