import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

type VisibilityPremiumIconProps = SvgProps & {
  size?: number;
  color?: string;
};

const VisibilityPremiumIcon = ({
  size = 24,
  color = "#000",
  ...props
}: VisibilityPremiumIconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M3.75 8.25L7.5 11.25L12 4.5L16.5 11.25L20.25 8.25L18.75 17.25H5.25L3.75 8.25Z"
      stroke={color}
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path d="M5.25 19.5H18.75" stroke={color} strokeWidth={2.2} strokeLinecap="round" />
  </Svg>
);

export default VisibilityPremiumIcon;
