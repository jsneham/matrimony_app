import * as ImageManipulator from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";

export type PickedImagePair = {
  originalUri: string;
  cropUri: string;
};

// 1:1.5 ratio (width:height). Expressed as integers for ImagePicker's aspect tuple.
const DEFAULT_ASPECT: [number, number] = [2, 3]; // 2:3 == 1:1.5
const DEFAULT_CROP_WIDTH = 800;
const DEFAULT_CROP_HEIGHT = 1200; // 800:1200 == 1:1.5

/**
 * Picks an image (gallery or camera), lets the user crop it via Expo's
 * built-in editing UI (locked to the given aspect ratio), then runs it
 * through image-manipulator to produce a resized "cropped" version —
 * mirroring the org/crop pair the API expects.
 *
 * `originalUri` = the raw picked image (pre-manipulation)
 * `cropUri`     = resized/compressed version we generate ourselves
 */
export async function pickAndPrepareImage(
  source: "gallery" | "camera",
  options?: {
    aspect?: [number, number];
    cropWidth?: number;
    cropHeight?: number;
  },
): Promise<PickedImagePair | null> {
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

  const aspect = options?.aspect ?? DEFAULT_ASPECT;

  const result =
    source === "gallery"
      ? await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect,
          quality: 1, // keep full quality here; compression happens in the manipulator step below
        })
      : await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          aspect,
          quality: 1,
        });

  if (result.canceled) return null;

  const originalUri = result.assets[0].uri;

  // Generate the "cropped" version: resize to exact target dimensions + compress.
  const manipulated = await ImageManipulator.manipulateAsync(
    originalUri,
    [
      {
        resize: {
          width: options?.cropWidth ?? DEFAULT_CROP_WIDTH,
          height: options?.cropHeight ?? DEFAULT_CROP_HEIGHT,
        },
      },
    ],
    {
      compress: 0.85,
      format: ImageManipulator.SaveFormat.JPEG,
    },
  );

  return {
    originalUri,
    cropUri: manipulated.uri,
  };
}

/**
 * Simple pick without generating a second file — used for single-file
 * uploads like the horoscope photo. Still locked to 1:1.5 by default.
 */
export async function pickImageSimple(
  source: "gallery" | "camera",
  options?: { aspect?: [number, number] },
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

  const aspect = options?.aspect ?? DEFAULT_ASPECT;

  const result =
    source === "gallery"
      ? await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect,
          quality: 0.85,
        })
      : await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          aspect,
          quality: 0.85,
        });

  if (result.canceled) return null;
  return result.assets[0].uri;
}
