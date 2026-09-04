import { applyCropAndResize, getImageSize } from "@/utils/imagePicker";
import React, { useEffect, useState } from "react";
import {
    Dimensions,
    Modal,
    Pressable,
    StatusBar,
    View,
} from "react-native";
import { Text } from "@/components/ui/Text";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
    useAnimatedStyle,
    useSharedValue
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const SCREEN_WIDTH = Dimensions.get("window").width;

type ImageCropModalProps = {
  visible: boolean;
  imageUri: string | null;
  aspectRatio: number; // width / height, e.g. 2/3 for 1:1.5
  targetWidth: number;
  targetHeight: number;
  onCancel: () => void;
  onConfirm: (croppedUri: string) => void;
};

export const ImageCropModal: React.FC<ImageCropModalProps> = ({
  visible,
  imageUri,
  aspectRatio,
  targetWidth,
  targetHeight,
  onCancel,
  onConfirm,
}) => {
  const insets = useSafeAreaInsets();

  // The crop frame is a fixed box on screen — sized to fit within the
  // viewport while matching the requested aspect ratio.
  const frameWidth = SCREEN_WIDTH - 40;
  const frameHeight = frameWidth / aspectRatio;

  const [srcSize, setSrcSize] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const savedTranslateX = useSharedValue(0);
  const savedTranslateY = useSharedValue(0);

  const minScaleRef = useSharedValue(1);

  useEffect(() => {
    if (!imageUri) return;
    setSrcSize(null);
    scale.value = 1;
    savedScale.value = 1;
    translateX.value = 0;
    translateY.value = 0;
    savedTranslateX.value = 0;
    savedTranslateY.value = 0;

    getImageSize(imageUri).then(({ width, height }) => {
      setSrcSize({ width, height });
      // "Cover" scale: the smallest scale at which the image still fully
      // covers the crop frame in both dimensions.
      const coverScale = Math.max(frameWidth / width, frameHeight / height);
      minScaleRef.value = coverScale;
      scale.value = coverScale;
      savedScale.value = coverScale;
    });
  }, [imageUri]);

  const clampTranslation = (
    tx: number,
    ty: number,
    currentScale: number,
    imgW: number,
    imgH: number,
  ) => {
    "worklet";
    const displayW = imgW * currentScale;
    const displayH = imgH * currentScale;
    const maxX = Math.max(0, (displayW - frameWidth) / 2);
    const maxY = Math.max(0, (displayH - frameHeight) / 2);
    return {
      x: Math.min(maxX, Math.max(-maxX, tx)),
      y: Math.min(maxY, Math.max(-maxY, ty)),
    };
  };

  const pinchGesture = Gesture.Pinch()
    .onUpdate((e) => {
      if (!srcSize) return;
      const next = Math.max(minScaleRef.value, savedScale.value * e.scale);
      scale.value = next;
      const clamped = clampTranslation(
        translateX.value,
        translateY.value,
        next,
        srcSize.width,
        srcSize.height,
      );
      translateX.value = clamped.x;
      translateY.value = clamped.y;
    })
    .onEnd(() => {
      savedScale.value = scale.value;
      savedTranslateX.value = translateX.value;
      savedTranslateY.value = translateY.value;
    });

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      if (!srcSize) return;
      const clamped = clampTranslation(
        savedTranslateX.value + e.translationX,
        savedTranslateY.value + e.translationY,
        scale.value,
        srcSize.width,
        srcSize.height,
      );
      translateX.value = clamped.x;
      translateY.value = clamped.y;
    })
    .onEnd(() => {
      savedTranslateX.value = translateX.value;
      savedTranslateY.value = translateY.value;
    });

  const composedGesture = Gesture.Simultaneous(pinchGesture, panGesture);

  const imageAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  const handleConfirm = async () => {
    if (!imageUri || !srcSize) return;
    setIsProcessing(true);
    try {
      // Convert on-screen frame + transform into source-image pixel coords.
      const displayScale = scale.value;
      const cropWidthOnSrc = frameWidth / displayScale;
      const cropHeightOnSrc = frameHeight / displayScale;

      // Center of the image in display space is offset by translateX/Y from
      // the center of the frame. Convert that back to source pixel origin.
      const centerXOnSrc = srcSize.width / 2 - translateX.value / displayScale;
      const centerYOnSrc = srcSize.height / 2 - translateY.value / displayScale;

      const originX = centerXOnSrc - cropWidthOnSrc / 2;
      const originY = centerYOnSrc - cropHeightOnSrc / 2;

      const croppedUri = await applyCropAndResize(
        imageUri,
        {
          originX: Math.max(0, originX),
          originY: Math.max(0, originY),
          width: Math.min(cropWidthOnSrc, srcSize.width),
          height: Math.min(cropHeightOnSrc, srcSize.height),
        },
        targetWidth,
        targetHeight,
      );

      onConfirm(croppedUri);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!imageUri) return null;

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      statusBarTranslucent
    >
      <StatusBar barStyle="light-content" />
      <View style={{ flex: 1, backgroundColor: "black" }}>
        {/* Header */}
        <View
          className="flex-row items-center justify-between px-5"
          style={{ paddingTop: insets.top + 12, paddingBottom: 12 }}
        >
          <Pressable onPress={onCancel} hitSlop={10}>
            <Text className="text-white text-base font-medium">Cancel</Text>
          </Pressable>
          <Text className="text-white text-base font-bold">Crop Photo</Text>
          <Pressable
            onPress={handleConfirm}
            hitSlop={10}
            disabled={isProcessing}
          >
            <Text className="text-pink-400 text-base font-bold">
              {isProcessing ? "..." : "Done"}
            </Text>
          </Pressable>
        </View>

        {/* Crop area */}
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <View
            style={{
              width: frameWidth,
              height: frameHeight,
              overflow: "hidden",
              borderWidth: 2,
              borderColor: "#db2777",
            }}
          >
            <GestureDetector gesture={composedGesture}>
              <Animated.View style={{ flex: 1 }}>
                {srcSize && (
                  <Animated.Image
                    source={{ uri: imageUri }}
                    style={[
                      {
                        width: srcSize.width,
                        height: srcSize.height,
                        position: "absolute",
                        left: (frameWidth - srcSize.width) / 2,
                        top: (frameHeight - srcSize.height) / 2,
                      },
                      imageAnimatedStyle,
                    ]}
                    resizeMode="cover"
                  />
                )}
              </Animated.View>
            </GestureDetector>
          </View>

          <Text className="text-white text-xs mt-4 opacity-70 font-regular">
            Pinch to zoom, drag to reposition
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export default ImageCropModal;
