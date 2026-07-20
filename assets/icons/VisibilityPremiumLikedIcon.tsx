import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

type VisibilityPremiumLikedIconProps = SvgProps & {
  size?: number;
  color?: string;
};

const VisibilityPremiumLikedIcon = ({
  size = 24,
  color = "#000",
  ...props
}: VisibilityPremiumLikedIconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M2.75 6.75L5.75 9.25L9.25 3.75L11.5 7.25"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M2.75 6.75L4 14.25H10.5"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path d="M4 16.5H10.5" stroke={color} strokeWidth={2} strokeLinecap="round" />
    <Path
      d="M18.25 21C18.25 21 14.75 18.4 14.75 15.85C14.75 14.57 15.71 13.6 16.88 13.6C17.55 13.6 18.03 13.91 18.25 14.3C18.47 13.91 18.95 13.6 19.62 13.6C20.79 13.6 21.75 14.57 21.75 15.85C21.75 18.4 18.25 21 18.25 21Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default VisibilityPremiumLikedIcon;
