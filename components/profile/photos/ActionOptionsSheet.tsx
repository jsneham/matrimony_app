import React from "react";
import { Modal, Pressable, View } from "react-native";
import { Text } from "@/components/ui/Text";
import { colors } from "@/constants/theme";
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
  icon?: React.ComponentType<{ size?: number; color?: string }>;
};

type ActionOptionsSheetProps = {
  visible: boolean;
  title: string;
  options: ActionSheetOption[];
  onClose: () => void;
};

export const ActionOptionsSheet: React.FC<ActionOptionsSheetProps> = ({
  visible,
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
      navigationBarTranslucent
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
                borderRadius: 20,
                marginHorizontal: 20,
                marginBottom: insets.bottom + 20,
                paddingHorizontal: 20,
                paddingTop: 32,
                paddingBottom: 20,
              },
            ]}
          >
            {options.map((option) => {
              const Icon = option.icon;
              const iconColor = option.destructive ? "#EF4444" : "#374151";
              return (
                <Pressable
                  key={option.id}
                  onPress={() => handleOptionPress(option)}
                  className="flex-row items-center py-4 active:opacity-60"
                >
                  <View className="w-[18px] h-[18px] mr-4 items-center justify-center">
                    {Icon ? (
                      <Icon size={18} color={iconColor} />
                    ) : (
                      <View className="w-[18px] h-[18px] rounded-full bg-gray-200" />
                    )}
                  </View>
                  <Text
                    className={`text-base font-bold ${
                      option.destructive ? "text-red-500" : "text-black"
                    }`}
                  >
                    {option.label}
                  </Text>
                </Pressable>
              );
            })}

            <Pressable
              onPress={animateClose}
              className="mt-8 items-center justify-center rounded-full py-4 active:opacity-60"
            >
              <Text className="text-base font-bold text-gray">
                Cancel
              </Text>
            </Pressable>
          </Animated.View>
        </View>
      </GestureHandlerRootView>
    </Modal>
  );
};

export default ActionOptionsSheet;
