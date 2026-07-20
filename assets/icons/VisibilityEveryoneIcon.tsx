import * as React from "react";
import Svg, { Circle, Path, SvgProps } from "react-native-svg";

type VisibilityEveryoneIconProps = SvgProps & {
  size?: number;
  color?: string;
};

const VisibilityEveryoneIcon = ({
  size = 24,
  color = "#000",
  ...props
}: VisibilityEveryoneIconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
    <Circle cx={12} cy={12} r={8.25} stroke={color} strokeWidth={2.2} />
    <Path d="M3.75 12H20.25" stroke={color} strokeWidth={2.2} strokeLinecap="round" />
    <Path
      d="M12 3.75C14.0711 6.02379 15.25 8.94773 15.25 12C15.25 15.0523 14.0711 17.9762 12 20.25C9.92893 17.9762 8.75 15.0523 8.75 12C8.75 8.94773 9.92893 6.02379 12 3.75Z"
      stroke={color}
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default VisibilityEveryoneIcon;
