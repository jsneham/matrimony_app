// components/RangeSlider.tsx
import React, { useState } from "react";
import { LayoutChangeEvent, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const THUMB_SIZE = 22;

type RangeSliderProps = {
  length: number;
  lowIndex: number;
  highIndex: number;
  onChange?: (low: number, high: number) => void;
  onSlidingComplete?: (low: number, high: number) => void;
  minGap?: number;
};

export const RangeSlider: React.FC<RangeSliderProps> = ({
  length,
  lowIndex,
  highIndex,
  onChange,
  onSlidingComplete,
  minGap = 0,
}) => {
  const [trackWidth, setTrackWidth] = useState(0);
  const usableWidth = Math.max(trackWidth - THUMB_SIZE, 1);
  const maxIndex = Math.max(length - 1, 1);
  const minGapPx = (minGap / maxIndex) * usableWidth;

  const lowX = useSharedValue((lowIndex / maxIndex) * usableWidth);
  const highX = useSharedValue((highIndex / maxIndex) * usableWidth);
  const lowStartX = useSharedValue(0);
  const highStartX = useSharedValue(0);
  const isDragging = useSharedValue(false); // 👈 new — tracks active gesture

  // Only re-sync from external props when NOT actively dragging
  React.useEffect(() => {
    if (usableWidth > 0 && !isDragging.value) {
      lowX.value = (lowIndex / maxIndex) * usableWidth;
      highX.value = (highIndex / maxIndex) * usableWidth;
    }
  }, [lowIndex, highIndex, usableWidth, maxIndex]);

  const indexFromX = (x: number) => {
    "worklet";
    return Math.round((x / usableWidth) * maxIndex);
  };
  const handleLayout = (e: LayoutChangeEvent) => {
    setTrackWidth(e.nativeEvent.layout.width);
  };

  const reportChange = (low: number, high: number) => onChange?.(low, high);
  const commit = (low: number, high: number) => onSlidingComplete?.(low, high);

  const lowGesture = Gesture.Pan()
    .onStart(() => {
      isDragging.value = true;
      lowStartX.value = lowX.value;
    })
    .onUpdate((e) => {
      const next = Math.max(
        0,
        Math.min(lowStartX.value + e.translationX, highX.value - minGapPx),
      );
      lowX.value = next;
      runOnJS(reportChange)(indexFromX(next), indexFromX(highX.value));
    })
    .onEnd(() => {
      isDragging.value = false;
      runOnJS(commit)(indexFromX(lowX.value), indexFromX(highX.value));
    });

  const highGesture = Gesture.Pan()
    .onStart(() => {
      isDragging.value = true;
      highStartX.value = highX.value;
    })
    .onUpdate((e) => {
      const next = Math.max(
        lowX.value + minGapPx,
        Math.min(highStartX.value + e.translationX, usableWidth),
      );
      highX.value = next;
      runOnJS(reportChange)(indexFromX(lowX.value), indexFromX(next));
    })
    .onEnd(() => {
      isDragging.value = false;
      runOnJS(commit)(indexFromX(lowX.value), indexFromX(highX.value));
    });

  const lowThumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: lowX.value }],
  }));
  const highThumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: highX.value }],
  }));
  const rangeBarStyle = useAnimatedStyle(() => ({
    left: lowX.value + THUMB_SIZE / 2,
    width: Math.max(highX.value - lowX.value, 0),
  }));

  return (
    <View
      onLayout={handleLayout}
      style={{ height: THUMB_SIZE, justifyContent: "center" }}
    >
      <View
        style={{
          position: "absolute",
          left: THUMB_SIZE / 2,
          right: THUMB_SIZE / 2,
          height: 2,
          backgroundColor: "#e5e7eb",
          borderRadius: 1,
        }}
      />
      <Animated.View
        style={[
          {
            position: "absolute",
            height: 2,
            backgroundColor: "#000000",
            borderRadius: 1,
          },
          rangeBarStyle,
        ]}
      />

      {trackWidth > 0 && (
        <>
          <GestureDetector gesture={lowGesture}>
            <Animated.View
              style={[
                {
                  position: "absolute",
                  width: THUMB_SIZE,
                  height: THUMB_SIZE,
                  borderRadius: THUMB_SIZE / 2,
                  backgroundColor: "#ffffff",
                  borderWidth: 2,
                  borderColor: "#000000",
                },
                lowThumbStyle,
              ]}
            />
          </GestureDetector>

          <GestureDetector gesture={highGesture}>
            <Animated.View
              style={[
                {
                  position: "absolute",
                  width: THUMB_SIZE,
                  height: THUMB_SIZE,
                  borderRadius: THUMB_SIZE / 2,
                  backgroundColor: "#ffffff",
                  borderWidth: 2,
                  borderColor: "#000000",
                },
                highThumbStyle,
              ]}
            />
          </GestureDetector>
        </>
      )}
    </View>
  );
};

export default RangeSlider;
