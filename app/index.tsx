import "@/global.css";
import { requestCameraPermission } from "@/utils/permissions";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Button, Text, View } from "react-native";

export default function App() {
  const [image, setImage] = useState<string | null>(null);

  const handleTakePhoto = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) return;

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-medium text-muted-foreground">
        Welcome to
      </Text>
      <Button title="Milan" onPress={handleTakePhoto} />
    </View>
  );
}
