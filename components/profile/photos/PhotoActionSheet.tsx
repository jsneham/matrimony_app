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

export type PhotoActionOption = {
  id: string;
  label: string;
  onPress: () => void;
  destructive?: boolean;
};

type PhotoActionSheetProps = {
  visible: boolean;
  title: string;
  options: PhotoActionOption[];
  onClose: () => void;
};

export const PhotoActionSheet: React.FC<PhotoActionSheetProps> = ({
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
      {
        duration: 250,
        easing: Easing.bezier(0.42, 0, 1, 1),
      },
      () => {
        runOnJS(doClose)();
      },
    );
  };

  const handleOptionPress = (option: PhotoActionOption) => {
    // Close first, then fire the callback once the sheet is off-screen
    translateY.value = withTiming(
      900,
      {
        duration: 250,
        easing: Easing.bezier(0.42, 0, 1, 1),
      },
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
                paddingBottom: Math.max(insets.bottom, 16),
              },
            ]}
          >
            {/* Header */}
            <View className="px-5 py-5 flex-row items-center justify-between border-b border-light-divider-color">
              <Text className="text-xl font-bold text-black">{title}</Text>
              <Pressable
                onPress={animateClose}
                style={{ width: 24, alignItems: "center" }}
              >
                <Ionicons name="close" size={24} color="black" />
              </Pressable>
            </View>

            {/* Options */}
            <View className="px-5 pt-2">
              {options.map((option, index) => (
                <View key={option.id}>
                  <Pressable
                    onPress={() => handleOptionPress(option)}
                    className="flex-row items-center py-4 active:opacity-60"
                  >
                    <View className="w-6 h-6 rounded-full border-2 border-gray-300 mr-4" />
                    <Text
                      className={`text-base font-semibold ${
                        option.destructive ? "text-red-500" : "text-gray-900"
                      }`}
                    >
                      {option.label}
                    </Text>
                  </Pressable>
                  {index < options.length - 1 && (
                    <View className="h-px bg-gray-100" />
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

export default PhotoActionSheet;
