import * as ImageManipulator from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";
import { Alert, Image } from "react-native";

export type PickedImagePair = {
  originalUri: string;
  cropUri: string;
};

// 1:1.5 ratio (width:height). Expressed as integers for ImagePicker's aspect tuple.
const DEFAULT_ASPECT: [number, number] = [2, 3]; // 2:3 == 1:1.5
const DEFAULT_CROP_WIDTH = 800;
const DEFAULT_CROP_HEIGHT = 1200; // 800:1200 == 1:1.5

// Reads an image's real pixel dimensions. Needed because ImageManipulator
// itself doesn't expose the source size — we must ask RN's Image API first.
function getImageSize(uri: string): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    Image.getSize(
      uri,
      (width, height) => resolve({ width, height }),
      (error) => reject(error),
    );
  });
}

/**
 * Center-crops an image to the exact target aspect ratio (targetWidth:targetHeight),
 * then resizes it to those exact pixel dimensions. This guarantees the final
 * output is always precisely that ratio — never stretched — regardless of
 * whether the native crop UI's selection was itself perfectly on-ratio
 * (a known inconsistency on some Android devices/OEM skins).
 */
async function cropToRatioAndResize(
  uri: string,
  targetWidth: number,
  targetHeight: number,
): Promise<string> {
  const { width: srcWidth, height: srcHeight } = await getImageSize(uri);

  const targetRatio = targetWidth / targetHeight;
  const srcRatio = srcWidth / srcHeight;

  let cropWidth = srcWidth;
  let cropHeight = srcHeight;
  let originX = 0;
  let originY = 0;

  if (srcRatio > targetRatio) {
    // Source is relatively too wide — crop the sides
    cropWidth = srcHeight * targetRatio;
    originX = (srcWidth - cropWidth) / 2;
  } else if (srcRatio < targetRatio) {
    // Source is relatively too tall — crop the top/bottom
    cropHeight = srcWidth / targetRatio;
    originY = (srcHeight - cropHeight) / 2;
  }
  // If srcRatio === targetRatio, no cropping needed — origin stays (0,0),
  // crop dimensions stay full source dimensions.

  const manipulated = await ImageManipulator.manipulateAsync(
    uri,
    [
      {
        crop: {
          originX: Math.round(originX),
          originY: Math.round(originY),
          width: Math.round(cropWidth),
          height: Math.round(cropHeight),
        },
      },
      {
        resize: {
          width: targetWidth,
          height: targetHeight,
        },
      },
    ],
    {
      compress: 0.85,
      format: ImageManipulator.SaveFormat.JPEG,
    },
  );

  return manipulated.uri;
}

/**
 * Picks an image (gallery or camera), lets the user crop it via Expo's
 * built-in editing UI (locked to the given aspect ratio), then guarantees
 * the final output is precisely on-ratio via an explicit center-crop +
 * resize pass — mirroring the org/crop pair the API expects.
 *
 * Used for profile photo slots, which require a fixed 1:1.5 ratio.
 *
 * `originalUri` = the raw picked image (pre-manipulation)
 * `cropUri`     = resized/compressed version we generate ourselves, always
 *                 exactly cropWidth:cropHeight, never stretched
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
  const cropWidth = options?.cropWidth ?? DEFAULT_CROP_WIDTH;
  const cropHeight = options?.cropHeight ?? DEFAULT_CROP_HEIGHT;

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

  const cropUri = await cropToRatioAndResize(
    originalUri,
    cropWidth,
    cropHeight,
  );

  return {
    originalUri,
    cropUri,
  };
}

/**
 * Simple pick without generating a second file — used for FREE-FORM crops
 * like the horoscope photo, where forcing a fixed ratio would distort or
 * awkwardly cut off a document that doesn't naturally fit 1:1.5.
 *
 * No `aspect` is passed to the native picker, so the user can freely drag
 * the crop box to any shape/size they want. Whatever they choose is used
 * as-is (only compressed, never re-cropped or resized to a fixed ratio).
 */
export async function pickImageSimple(
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
          allowsEditing: true, // crop UI still shows, but with no aspect lock — free-form
          quality: 1,
        })
      : await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          quality: 1,
        });

  if (result.canceled) return null;

  // Just compress, no forced re-crop/resize — preserves whatever
  // free-form crop the user chose.
  const manipulated = await ImageManipulator.manipulateAsync(
    result.assets[0].uri,
    [],
    { compress: 0.85, format: ImageManipulator.SaveFormat.JPEG },
  );

  return manipulated.uri;
}
