import * as React from "react";
import Svg, { Path, Rect, SvgProps } from "react-native-svg";

type AddVoiceNoteIconProps = SvgProps & {
  size?: number;
  color?: string;
};

const AddVoiceNoteIcon = ({
  size = 24,
  color = "#000",
  ...props
}: AddVoiceNoteIconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
    <Rect width={24} height={24} fill="white" />
    <Path
      d="M15.7323 5.5C15.7323 3.567 14.0608 2 11.999 2C9.9371 2 8.26562 3.567 8.26562 5.5V12C8.26562 13.933 9.9371 15.5 11.999 15.5C14.0608 15.5 15.7323 13.933 15.7323 12V5.5Z"
      stroke={color}
      strokeWidth={2}
      strokeLinejoin="round"
    />
    <Path
      d="M4 11.5C4 15.642 7.58187 19 12 19M12 19C16.4181 19 20 15.642 20 11.5M12 19V22"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Rect x={14} y={14} width={10} height={10} rx={5} fill="white" />
    <Path
      d="M19 15C19.5095 15.0003 19.9229 15.4133 19.9229 15.9229V18.0762H22.0762C22.5858 18.0763 22.999 18.4903 22.999 19C22.9987 19.5094 22.5856 19.9227 22.0762 19.9229H19.9229V22.0762C19.9227 22.5856 19.5094 22.9987 19 22.999C18.4903 22.999 18.0763 22.5858 18.0762 22.0762V19.9229H15.9229C15.4133 19.9229 15.0003 19.5095 15 19C15 18.4902 15.4131 18.0762 15.9229 18.0762H18.0762V15.9229C18.0762 15.4131 18.4902 15 19 15Z"
      fill={color}
    />
  </Svg>
);

export default AddVoiceNoteIcon;
