import * as ImageManipulator from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";
import { Alert, Image } from "react-native";

// Reads an image's real pixel dimensions.
export function getImageSize(
  uri: string,
): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    Image.getSize(
      uri,
      (width, height) => resolve({ width, height }),
      (error) => reject(error),
    );
  });
}

/**
 * Picks a raw image with NO native crop UI (allowsEditing is always false).
 * iOS's native crop UI is unreliable — it commonly forces a square crop
 * regardless of the requested aspect ratio, while Android does respect it.
 * To get consistent behavior cross-platform, we skip native editing
 * entirely and use our own custom crop modal (ImageCropModal) instead.
 */
export async function pickRawImage(
  source: "gallery" | "camera",
): Promise<string | null> {
  const permission =
    source === "gallery"
      ? await ImagePicker.requestMediaLibraryPermissionsAsync()
      : await ImagePicker.requestCameraPermissionsAsync();

  if (!permission.granted) {
    Alert.alert(
      "Permission needed",
      `Please allow access to your ${
        source === "gallery" ? "photo library" : "camera"
      } to continue.`,
    );
    return null;
  }

  const result =
    source === "gallery"
      ? await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: false,
          quality: 1,
        })
      : await ImagePicker.launchCameraAsync({
          allowsEditing: false,
          quality: 1,
        });

  if (result.canceled) return null;
  return result.assets[0].uri;
}

/**
 * Compresses an image with no re-crop — used after a free-form pick
 * (e.g. horoscope photo) where no fixed ratio is required.
 */
export async function compressOnly(uri: string): Promise<string> {
  const manipulated = await ImageManipulator.manipulateAsync(uri, [], {
    compress: 0.85,
    format: ImageManipulator.SaveFormat.JPEG,
  });
  return manipulated.uri;
}

/**
 * Applies a final crop (in source-image pixel coordinates) and resizes to
 * the exact target dimensions. Called after the user confirms their
 * selection in the custom ImageCropModal.
 */
export async function applyCropAndResize(
  uri: string,
  crop: { originX: number; originY: number; width: number; height: number },
  targetWidth: number,
  targetHeight: number,
): Promise<string> {
  const manipulated = await ImageManipulator.manipulateAsync(
    uri,
    [
      {
        crop: {
          originX: Math.round(crop.originX),
          originY: Math.round(crop.originY),
          width: Math.round(crop.width),
          height: Math.round(crop.height),
        },
      },
      { resize: { width: targetWidth, height: targetHeight } },
    ],
    { compress: 0.85, format: ImageManipulator.SaveFormat.JPEG },
  );
  return manipulated.uri;
}
