import { colors } from "@/constants/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { View } from "react-native";
import { Text } from "@/components/ui/Text";
import Animated, {
    useAnimatedProps,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import Svg, { Circle, G } from "react-native-svg";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export const ProfilePhotoWIthProgress: React.FC<{
  profileCompletion: number;
}> = ({ profileCompletion }) => {
  const size = 120;
  const strokeWidth = 4;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const strokeDashoffsetValue = useSharedValue(circumference);

  useEffect(() => {
    strokeDashoffsetValue.value = withTiming(
      circumference - (profileCompletion / 100) * circumference,
      { duration: 1000 },
    );
  }, [profileCompletion]);

  const animatedCircleProps = useAnimatedProps(() => ({
    strokeDashoffset: strokeDashoffsetValue.value,
  }));

  return (
    <View className="items-center justify-center mb-4">
      <View
        style={{
          width: size,
          height: size,
          position: "relative",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* SVG Progress Ring */}
        <Svg width={size} height={size} style={{ position: "absolute" }}>
          <G rotation="-90" origin={`${size / 2}, ${size / 2}`}>
            {/* Background Circle */}
            <Circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="#E5F0F5"
              strokeWidth={strokeWidth}
              fill="none"
            />

            {/* Animated Progress Circle */}
            <AnimatedCircle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={colors.accent}
              strokeWidth={strokeWidth}
              fill="none"
              strokeDasharray={circumference}
              animatedProps={animatedCircleProps}
              strokeLinecap="round"
            />
          </G>
        </Svg>

        {/* Profile Photo */}
        <View
          className="w-20 h-20 rounded-full items-center justify-center"
          style={{
            backgroundColor: "#E5F0F5",
          }}
        >
          <MaterialCommunityIcons
            name="account"
            size={50}
            color={colors.accent}
          />
        </View>

        {/* Percentage Text */}
        <View
          style={{
            position: "absolute",
            bottom: 4,
            right: 4,
            backgroundColor: colors.accent,
            width: 28,
            height: 28,
            borderRadius: 14,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            className="font-bold"
            style={{
              fontSize: 11,
              color: "white",
            }}
          >
            {profileCompletion}%
          </Text>
        </View>
      </View>
    </View>
  );
};
