import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

type SearchFortabProps = SvgProps & {
  size?: number;
  color?: string;
};

const search_fortab = ({
  size = 16,
  color = "#8B8B8B",
  ...props
}: SearchFortabProps) => (
  <Svg width={size} height={size} viewBox="0 0 16 16" fill="none" {...props}>
    <Path
      d="M7.49911 12C10.26 12 12.4982 9.76142 12.4982 7C12.4982 4.23858 10.26 2 7.49911 2C4.73818 2 2.5 4.23858 2.5 7C2.5 9.76142 4.73818 12 7.49911 12Z"
      stroke={color}
      strokeWidth={1.71884}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M13.5 13L11.5 11"
      stroke={color}
      strokeWidth={1.71884}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default search_fortab;
