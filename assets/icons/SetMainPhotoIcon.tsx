import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

type SetMainPhotoIconProps = SvgProps & {
  size?: number;
  color?: string;
};

const SetMainPhotoIcon = ({
  size = 24,
  color = "#000",
  ...props
}: SetMainPhotoIconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M12 3.5L14.28 8.99L20.25 9.51L15.74 13.36L17.1 19.19L12 16.1L6.9 19.19L8.26 13.36L3.75 9.51L9.72 8.99L12 3.5Z"
      stroke={color}
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default SetMainPhotoIcon;
