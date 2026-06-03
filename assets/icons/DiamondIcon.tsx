import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

const DiamondIcon = () => (
  <View
    className="w-12 h-12 items-center justify-center rounded-xl mr-3"
    style={{ backgroundColor: "#e0f2fe" }}
  >
    <Ionicons name="diamond-outline" size={26} color="#0ea5e9" />
  </View>
);

export default DiamondIcon;
