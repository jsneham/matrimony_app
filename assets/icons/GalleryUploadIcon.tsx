import * as React from "react";
import Svg, { Circle, Path, Rect, SvgProps } from "react-native-svg";

type GalleryUploadIconProps = SvgProps & {
  size?: number;
  color?: string;
};

const GalleryUploadIcon = ({
  size = 24,
  color = "#000",
  ...props
}: GalleryUploadIconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
    <Rect
      x={3}
      y={4}
      width={18}
      height={16}
      rx={2}
      stroke={color}
      strokeWidth={2.2}
    />
    <Circle cx={8.5} cy={9.5} r={1.5} stroke={color} strokeWidth={2.2} />
    <Path
      d="M21 16L16.5 11.5C16.1 11.1 15.4 11.1 15 11.5L8 18.5"
      stroke={color}
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 18.5L9.5 16C9.1 15.6 8.4 15.6 8 16L4.5 19.5"
      stroke={color}
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default GalleryUploadIcon;
