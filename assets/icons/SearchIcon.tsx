import Svg, { Path } from "react-native-svg";

const SearchIcon = ({
  size = 15,
  color = "#8B8B8B",
}: {
  size?: number;
  color?: string;
}) => (
  <Svg width={size} height={size} viewBox="0 0 15 15" fill="none">
    <Path
      d="M6.76575 11.7659C9.52724 11.7659 11.7659 9.52724 11.7659 6.76575C11.7659 4.00426 9.52724 1.76562 6.76575 1.76562C4.00426 1.76562 1.76562 4.00426 1.76562 6.76575C1.76562 9.52724 4.00426 11.7659 6.76575 11.7659Z"
      stroke={color}
      strokeWidth={1.87505}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M13.0157 13.0137L10.2969 10.2949"
      stroke={color}
      strokeWidth={1.87505}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default SearchIcon;
