import "@/global.css";
import { Text, View } from "react-native";

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-medium text-muted-foreground">
        Welcome to
      </Text>
      <Text className="text-xl font-bold text-blue-500">Milan!</Text>
    </View>
  );
}
