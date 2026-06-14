import { View } from "react-native";
import Svg, { Circle } from "react-native-svg";

const DummyIcon = () => (
  <View className="items-center justify-center mr-3">
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={12} r={12} fill="#F3F3F3" />
    </Svg>
  </View>
);

export default DummyIcon;
