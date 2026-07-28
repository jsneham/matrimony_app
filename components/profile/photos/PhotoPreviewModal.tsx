import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, Modal, Pressable, StatusBar, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type PhotoPreviewModalProps = {
  visible: boolean;
  imageUri?: string;
  onClose: () => void;
};

export const PhotoPreviewModal: React.FC<PhotoPreviewModalProps> = ({
  visible,
  imageUri,
  onClose,
}) => {
  const insets = useSafeAreaInsets();

  if (!imageUri) return null;

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <StatusBar barStyle="light-content" />
      <View style={{ flex: 1, backgroundColor: "black" }}>
        <Image
          source={{ uri: imageUri }}
          style={{ flex: 1, width: "100%" }}
          resizeMode="contain"
        />

        <Pressable
          onPress={onClose}
          hitSlop={12}
          style={{
            position: "absolute",
            top: insets.top + 12,
            right: 20,
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: "rgba(255,255,255,0.15)",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons name="close" size={24} color="white" />
        </Pressable>
      </View>
    </Modal>
  );
};

export default PhotoPreviewModal;
