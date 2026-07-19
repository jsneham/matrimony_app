import * as React from "react";
import Svg, { Path, Rect, SvgProps } from "react-native-svg";

type AddVideoIconProps = SvgProps & {
  size?: number;
  color?: string;
};

const AddVideoIcon = ({
  size = 24,
  color = "#000",
  ...props
}: AddVideoIconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
    <Rect width={24} height={24} fill="white" />
    <Path
      d="M2.15625 17.7188H8.15625M5.15625 14.7188V20.7188"
      stroke={color}
      strokeWidth={1.80723}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M21.375 7.08516L18.375 8.8125V5.25C18.375 4.42266 17.7023 3.75 16.875 3.75H3C2.17266 3.75 1.5 4.42266 1.5 5.25V13.5H3.1875V5.4375H16.6875V18.5625H10.5V20.25H16.875C17.7023 20.25 18.375 19.5773 18.375 18.75V15.1875L21.375 16.9148C21.8742 17.2031 22.5 16.8422 22.5 16.268V7.73438C22.5 7.15781 21.8742 6.79687 21.375 7.08516ZM20.8125 14.6484L18.375 13.2469V10.7555L20.8125 9.35156V14.6484Z"
      fill={color}
    />
    <Path
      d="M7.5 8.4375C7.60313 8.4375 7.6875 8.35313 7.6875 8.25V7.125C7.6875 7.02187 7.60313 6.9375 7.5 6.9375H4.875C4.77187 6.9375 4.6875 7.02187 4.6875 7.125V8.25C4.6875 8.35313 4.77187 8.4375 4.875 8.4375H7.5Z"
      fill={color}
    />
  </Svg>
);

export default AddVideoIcon;
