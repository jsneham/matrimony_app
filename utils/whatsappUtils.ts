import { useState } from "react";
import { Alert, Linking, Platform } from "react-native";

export const useWhatsApp = () => {
  const [loading, setLoading] = useState(false);

  const openWhatsApp = async () => {
    setLoading(true);
    const phoneNumber = "919076094316"; // Without +
    const message = "Hi, I need help with membership plans";

    let url: string;

    if (Platform.OS === "android") {
      url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(
        message,
      )}`;
    } else {
      url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(
        message,
      )}`;
    }

    try {
      const canOpen = await Linking.canOpenURL(url);

      if (canOpen) {
        await Linking.openURL(url);
      } else {
        // Show options if WhatsApp not installed
        Alert.alert(
          "WhatsApp Not Installed",
          "Would you like to open WhatsApp Web instead?",
          [
            {
              text: "Open Web",
              onPress: () => {
                const webUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
                  message,
                )}`;
                Linking.openURL(webUrl);
              },
            },
            { text: "Cancel", style: "cancel" },
          ],
        );
      }
    } catch (error) {
      Alert.alert("Error", "Failed to open WhatsApp");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return { openWhatsApp, loading };
};
