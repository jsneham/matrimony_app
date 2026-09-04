// components/VerticalRangeSlider.tsx
// Same interaction model as RangeSlider.tsx (index-based dual-thumb range
// over a fixed-length options list, gesture-driven via reanimated), just
// laid out along the Y axis instead of X.
import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import { LayoutChangeEvent, View } from "react-native";
import { Text } from "@/components/ui/Text";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const THUMB_SIZE = 22;
const LABEL_COLOR = "#8B8B8B"; // matches the sidebar category label color

type VerticalRangeSliderProps = {
  length: number;
  lowIndex: number;
  highIndex: number;
  // Display value per index (e.g. "18", "5'4\"") — shown live next to each
  // thumb, and as the min/max endpoints at the top/bottom of the track.
  labels?: string[];
  onChange?: (low: number, high: number) => void;
  onSlidingComplete?: (low: number, high: number) => void;
  minGap?: number;
  // When set, the range width is locked to this many index steps — only
  // the low thumb is draggable, and the high thumb always follows at
  // exactly lowIndex + fixedRange (clamped to the list's last index).
  fixedRange?: number;
};

export const VerticalRangeSlider: React.FC<VerticalRangeSliderProps> = ({
  length,
  lowIndex,
  highIndex,
  labels,
  onChange,
  onSlidingComplete,
  minGap = 0,
  fixedRange,
}) => {
  const [trackHeight, setTrackHeight] = useState(0);
  const usableHeight = Math.max(trackHeight - THUMB_SIZE, 1);
  const maxIndex = Math.max(length - 1, 1);
  const minGapPx = (minGap / maxIndex) * usableHeight;
  const fixedRangePx =
    fixedRange != null ? (fixedRange / maxIndex) * usableHeight : 0;

  const lowY = useSharedValue((lowIndex / maxIndex) * usableHeight);
  const highY = useSharedValue((highIndex / maxIndex) * usableHeight);
  const lowStartY = useSharedValue(0);
  const highStartY = useSharedValue(0);
  const isDragging = useSharedValue(false);
  const lastHapticLowIndex = useSharedValue(lowIndex);
  const lastHapticHighIndex = useSharedValue(highIndex);

  React.useEffect(() => {
    if (usableHeight > 0 && !isDragging.value) {
      lowY.value = (lowIndex / maxIndex) * usableHeight;
      highY.value = (highIndex / maxIndex) * usableHeight;
    }
  }, [lowIndex, highIndex, usableHeight, maxIndex]);

  const indexFromY = (y: number) => {
    "worklet";
    return Math.round((y / usableHeight) * maxIndex);
  };
  const handleLayout = (e: LayoutChangeEvent) => {
    setTrackHeight(e.nativeEvent.layout.height);
  };

  const reportChange = (low: number, high: number) => onChange?.(low, high);
  const commit = (low: number, high: number) => onSlidingComplete?.(low, high);
  const tick = () => Haptics.selectionAsync();

  const lowGesture = Gesture.Pan()
    .onStart(() => {
      isDragging.value = true;
      lowStartY.value = lowY.value;
    })
    .onUpdate((e) => {
      const upperBound =
        fixedRange != null ? usableHeight - fixedRangePx : highY.value - minGapPx;
      const next = Math.max(0, Math.min(lowStartY.value + e.translationY, upperBound));
      lowY.value = next;
      if (fixedRange != null) {
        highY.value = next + fixedRangePx;
      }
      const idx = indexFromY(next);
      if (idx !== lastHapticLowIndex.value) {
        lastHapticLowIndex.value = idx;
        runOnJS(tick)();
      }
      const highIdx =
        fixedRange != null
          ? Math.min(idx + fixedRange, maxIndex)
          : indexFromY(highY.value);
      runOnJS(reportChange)(idx, highIdx);
    })
    .onEnd(() => {
      isDragging.value = false;
      const highIdx =
        fixedRange != null
          ? Math.min(indexFromY(lowY.value) + fixedRange, maxIndex)
          : indexFromY(highY.value);
      runOnJS(commit)(indexFromY(lowY.value), highIdx);
    });

  const highGesture = Gesture.Pan()
    .onStart(() => {
      isDragging.value = true;
      highStartY.value = highY.value;
    })
    .onUpdate((e) => {
      const lowerBound = fixedRange != null ? fixedRangePx : lowY.value + minGapPx;
      const next = Math.max(
        lowerBound,
        Math.min(highStartY.value + e.translationY, usableHeight),
      );
      highY.value = next;
      if (fixedRange != null) {
        lowY.value = next - fixedRangePx;
      }
      const idx = indexFromY(next);
      if (idx !== lastHapticHighIndex.value) {
        lastHapticHighIndex.value = idx;
        runOnJS(tick)();
      }
      runOnJS(reportChange)(indexFromY(lowY.value), idx);
    })
    .onEnd(() => {
      isDragging.value = false;
      runOnJS(commit)(indexFromY(lowY.value), indexFromY(highY.value));
    });

  const lowThumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: lowY.value }],
  }));
  const highThumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: highY.value }],
  }));
  const rangeBarStyle = useAnimatedStyle(() => ({
    top: lowY.value + THUMB_SIZE / 2,
    height: Math.max(highY.value - lowY.value, 0),
  }));

  const lowValueLabel = labels?.[lowIndex] ?? String(lowIndex);
  const highValueLabel = labels?.[highIndex] ?? String(highIndex);

  return (
    <View
      onLayout={handleLayout}
      style={{ width: THUMB_SIZE, flex: 1, alignItems: "center" }}
    >
        <View
          style={{
            position: "absolute",
            top: THUMB_SIZE / 2,
            bottom: THUMB_SIZE / 2,
            width: 2,
            backgroundColor: "#e5e7eb",
            borderRadius: 1,
          }}
        />
        <Animated.View
          style={[
            {
              position: "absolute",
              width: 2,
              backgroundColor: "#000000",
              borderRadius: 1,
            },
            rangeBarStyle,
          ]}
        />

        {trackHeight > 0 && (
          <>
            {/* Live "from" value — tracks the low thumb, always visible */}
            <Animated.View
              style={[
                {
                  position: "absolute",
                  left: -82,
                  width: 74,
                  height: THUMB_SIZE,
                  justifyContent: "center",
                },
                lowThumbStyle,
              ]}
            >
              <Text
                numberOfLines={1}
                className="text-sm font-bold"
                style={{ color: LABEL_COLOR, textAlign: "right" }}
              >
                {lowValueLabel}
              </Text>
            </Animated.View>

            <GestureDetector gesture={lowGesture}>
              <Animated.View
                hitSlop={12}
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
                hitSlop={12}
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

            {/* Live "to" value — tracks the high thumb, always visible */}
            <Animated.View
              style={[
                {
                  position: "absolute",
                  left: THUMB_SIZE + 8,
                  width: 74,
                  height: THUMB_SIZE,
                  justifyContent: "center",
                },
                highThumbStyle,
              ]}
            >
              <Text
                numberOfLines={1}
                className="text-sm font-bold"
                style={{ color: LABEL_COLOR }}
              >
                {highValueLabel}
              </Text>
            </Animated.View>
          </>
        )}
      </View>
  );
};

export default VerticalRangeSlider;
