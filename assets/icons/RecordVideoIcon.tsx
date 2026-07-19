import * as React from "react";
import Svg, { Circle, Path, Rect, SvgProps } from "react-native-svg";

type RecordVideoIconProps = SvgProps & {
  size?: number;
  color?: string;
};

const RecordVideoIcon = ({
  size = 24,
  color = "#000",
  ...props
}: RecordVideoIconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
    <Rect
      x={3}
      y={6}
      width={13}
      height={12}
      rx={2}
      stroke={color}
      strokeWidth={2.2}
    />
    <Path
      d="M16 10.5L20.15 8.06C20.65 7.77 21.25 8.14 21.25 8.72V15.28C21.25 15.86 20.65 16.23 20.15 15.94L16 13.5"
      stroke={color}
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle cx={9.5} cy={12} r={1.3} fill={color} />
  </Svg>
);

export default RecordVideoIcon;
