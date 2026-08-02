import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

type ChevronLeftIconProps = SvgProps & {
  size?: number;
  color?: string;
};

const ChevronLeftIcon = ({
  size = 24,
  color = "black",
  ...props
}: ChevronLeftIconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M15 18L9 12L15 6"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default ChevronLeftIcon;
