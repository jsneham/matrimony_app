import * as React from "react";
import Svg, { Circle, Path, SvgProps } from "react-native-svg";

type CameraCaptureIconProps = SvgProps & {
  size?: number;
  color?: string;
};

const CameraCaptureIcon = ({
  size = 24,
  color = "#000",
  ...props
}: CameraCaptureIconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M4 8C4 6.89543 4.89543 6 6 6H7.17157C7.70201 6 8.21071 5.78929 8.58579 5.41421L9.41421 4.58579C9.78929 4.21071 10.298 4 10.8284 4H13.1716C13.702 4 14.2107 4.21071 14.5858 4.58579L15.4142 5.41421C15.7893 5.78929 16.298 6 16.8284 6H18C19.1046 6 20 6.89543 20 8V17C20 18.1046 19.1046 19 18 19H6C4.89543 19 4 18.1046 4 17V8Z"
      stroke={color}
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle cx={12} cy={12.5} r={3.25} stroke={color} strokeWidth={2.2} />
  </Svg>
);

export default CameraCaptureIcon;
