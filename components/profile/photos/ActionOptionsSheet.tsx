import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Modal, Pressable, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, {
    Easing,
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export type ActionSheetOption = {
  id: string;
  label: string;
  onPress: () => void;
  destructive?: boolean;
};

type ActionOptionsSheetProps = {
  visible: boolean;
  title: string;
  options: ActionSheetOption[];
  onClose: () => void;
};

export const ActionOptionsSheet: React.FC<ActionOptionsSheetProps> = ({
  visible,
  title,
  options,
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

  const handleOptionPress = (option: ActionSheetOption) => {
    translateY.value = withTiming(
      900,
      { duration: 250, easing: Easing.bezier(0.42, 0, 1, 1) },
      () => {
        runOnJS(doClose)();
        runOnJS(option.onPress)();
      },
    );
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
                paddingTop: 20,
                paddingBottom: Math.max(insets.bottom, 20),
              },
            ]}
          >
            {/* Header */}
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-xl font-bold text-black">{title}</Text>
              <Pressable onPress={animateClose} hitSlop={10}>
                <Ionicons name="close" size={24} color="black" />
              </Pressable>
            </View>

            {/* Grouped options card */}
            <View className="border border-gray-200 rounded-2xl bg-white overflow-hidden">
              {options.map((option, index) => (
                <View key={option.id}>
                  <Pressable
                    onPress={() => handleOptionPress(option)}
                    className="flex-row items-center px-4 py-4 active:bg-gray-50"
                  >
                    <View className="w-6 h-6 rounded-full bg-gray-200 mr-4" />
                    <Text
                      className={`text-base font-bold ${
                        option.destructive ? "text-red-500" : "text-gray-900"
                      }`}
                    >
                      {option.label}
                    </Text>
                  </Pressable>
                  {index < options.length - 1 && (
                    <View className="h-px bg-gray-100 ml-4" />
                  )}
                </View>
              ))}
            </View>
          </Animated.View>
        </View>
      </GestureHandlerRootView>
    </Modal>
  );
};

export default ActionOptionsSheet;
