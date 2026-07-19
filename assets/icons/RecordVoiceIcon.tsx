import * as React from "react";
import Svg, { Path, Rect, SvgProps } from "react-native-svg";

type RecordVoiceIconProps = SvgProps & {
  size?: number;
  color?: string;
};

const RecordVoiceIcon = ({
  size = 24,
  color = "#000",
  ...props
}: RecordVoiceIconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
    <Rect
      x={9}
      y={3}
      width={6}
      height={11}
      rx={3}
      stroke={color}
      strokeWidth={2.2}
    />
    <Path
      d="M5 11V12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12V11"
      stroke={color}
      strokeWidth={2.2}
      strokeLinecap="round"
    />
    <Path d="M12 19V22" stroke={color} strokeWidth={2.2} strokeLinecap="round" />
    <Path d="M9 22H15" stroke={color} strokeWidth={2.2} strokeLinecap="round" />
  </Svg>
);

export default RecordVoiceIcon;
