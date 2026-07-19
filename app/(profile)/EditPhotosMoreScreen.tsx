import {
  ActionOptionsSheet,
  ActionSheetOption,
} from "@/components/profile/photos/ActionOptionsSheet";
import { AddPhotoSlot } from "@/components/profile/photos/AddPhotoSlot";
import { GuidelinesLink } from "@/components/profile/photos/GuidelinesLink";
import AddVideoIcon from "@/assets/icons/AddVideoIcon";
import AddVoiceNoteIcon from "@/assets/icons/AddVoiceNoteIcon";
import { PhotoCard } from "@/components/profile/photos/PhotoCard";
import { UploadRow } from "@/components/profile/photos/UploadRow";
import { ProfileProgressBanner } from "@/components/profile/ProfileEditComponents";
import { useMyProfile } from "@/hooks/useProfile";
import { useSession } from "@/hooks/useSession";
import {
  setMainProfilePhoto,
  uploadProfilePhotoWithCrop,
  uploadSinglePhoto,
} from "@/services/photoUploadApi";
import { SESSION_KEYS } from "@/types/common";
import { pickAndPrepareImage, pickImageSimple } from "@/utils/imagePicker";
import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

// 1:1.5 ratio (width:height) used for all photo crops on this screen
const PHOTO_ASPECT: [number, number] = [2, 3];
const PHOTO_CROP_WIDTH = 800;
const PHOTO_CROP_HEIGHT = 1200;

// Which sheet is currently active — drives title + dynamic option set
type SheetKind =
  | { type: "photo-add"; slotIndex: number }
  | { type: "photo-edit"; slotIndex: number }
  | { type: "video" }
  | { type: "voice" }
  | { type: "horoscope" }
  | { type: "privacy" }
  | null;

const PRIVACY_OPTIONS = [
  { id: "everyone", label: "Visible to Everyone" },
  { id: "premium", label: "Visible to Premium Members" },
  { id: "premium-liked", label: "Visible to Premium Members & I like" },
];

const EditPhotosMoreScreen = () => {
  const { data: sessionData, isLoading: isLoadingSession } = useSession([
    SESSION_KEYS.USER_ID,
    SESSION_KEYS.TOKEN, // confirm this key exists in your SESSION_KEYS
  ]);
  const memberId = sessionData?.[SESSION_KEYS.USER_ID] || "";
  const token = sessionData?.[SESSION_KEYS.TOKEN] || "";

  const {
    data: profileResponse,
    isLoading: isLoadingProfile,
    refetch: refetchProfile,
  } = useMyProfile({ memberId });

  const profile = profileResponse?.data;

  // Local optimistic copy of the 4 photo slots.
  // Adjust field names (photo3 / photo4) to match your real API shape.
  const [photos, setPhotos] = useState<(string | undefined)[]>([
    profile?.photo1,
    profile?.photo2,
    profile?.photo3,
    profile?.photo4,
  ]);

  // Local optimistic copy of the horoscope photo
  const [horoscopePhoto, setHoroscopePhoto] = useState<string | undefined>(
    profile?.horoscope_photo,
  );

  // const [privacy, setPrivacy] = useState(
  //   profile?.photoPrivacy ?? "premium-liked",
  // );

  React.useEffect(() => {
    if (profile) {
      setPhotos([
        profile.photo1,
        profile.photo2,
        profile.photo3,
        profile.photo4,
      ]);
      setHoroscopePhoto(profile.horoscope_photo);
      // if (profile.photoPrivacy) setPrivacy(profile.photoPrivacy);
    }
  }, [profile]);

  const [activeSheet, setActiveSheet] = useState<SheetKind>(null);
  const closeSheet = () => setActiveSheet(null);

  // Upload progress overlay state (mirrors Android's ProgressDialog)
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);

  // ── Image picking + crop (Expo, 1:1.5 ratio) ──────────────────────────────
  const pickImageWithCrop = async (
    source: "gallery" | "camera",
    onPicked: (originalUri: string, cropUri: string) => void,
  ) => {
    const result = await pickAndPrepareImage(source, {
      aspect: PHOTO_ASPECT,
      cropWidth: PHOTO_CROP_WIDTH,
      cropHeight: PHOTO_CROP_HEIGHT,
    });
    if (!result) return;
    onPicked(result.originalUri, result.cropUri);
  };

  const pickImageForHoroscope = async (
    source: "gallery" | "camera",
    onPicked: (uri: string) => void,
  ) => {
    const uri = await pickImageSimple(source, { aspect: PHOTO_ASPECT });
    if (!uri) return;
    onPicked(uri);
  };

  // ── Upload: profile photo slots 1-4 (org + crop, matches Java) ──────────
  const uploadPhotoToSlot = async (
    slotIndex: number, // 0-based UI index
    originalUri: string,
    cropUri: string,
  ) => {
    if (!memberId) return;

    const imageId = slotIndex + 1; // Java's image_id is 1-based for these slots

    try {
      setUploadProgress(0);
      const response = await uploadProfilePhotoWithCrop({
        slotIndex: imageId,
        originalUri,
        cropUri,
        session: { memberId, token },
        onProgress: setUploadProgress,
      });

      if (response.status === "success") {
        setPhotos((prev) => {
          const next = [...prev];
          next[slotIndex] = cropUri;
          return next;
        });
        refetchProfile();
      } else {
        Alert.alert(
          "Upload failed",
          response.errmessage || "Please try again.",
        );
      }
    } catch (err) {
      Alert.alert(
        "Upload failed",
        "Please check your connection and try again.",
      );
    } finally {
      setUploadProgress(null);
    }
  };

  // ── Upload: horoscope photo (single file, matches image_id else-branch) ─
  const uploadHoroscopePhoto = async (uri: string) => {
    if (!memberId) return;

    try {
      setUploadProgress(0);
      const response = await uploadSinglePhoto({
        fieldName: "horoscope_photo",
        fileUri: uri,
        session: { memberId, token },
        endpointPath: "upload/upload_horoscope_photo",
        onProgress: setUploadProgress,
      });

      if (response.status === "success") {
        setHoroscopePhoto(uri);
        refetchProfile();
      } else {
        Alert.alert(
          "Upload failed",
          response.errmessage || "Please try again.",
        );
      }
    } catch (err) {
      Alert.alert(
        "Upload failed",
        "Please check your connection and try again.",
      );
    } finally {
      setUploadProgress(null);
    }
  };

  const setAsMainPhoto = async (index: number) => {
    if (index === 0) return;
    if (!memberId) return;

    const photoNumber = index + 1; // 0-based UI index → 1-based photo_number

    try {
      setUploadProgress(0);
      const response = await setMainProfilePhoto({
        memberId,
        photoNumber,
        session: { memberId, token },
        onProgress: setUploadProgress,
      });

      if (response.status === "success") {
        setPhotos((prev) => {
          const next = [...prev];
          [next[0], next[index]] = [next[index], next[0]];
          return next;
        });
        refetchProfile();
      } else {
        Alert.alert("Failed", response.errmessage || "Please try again.");
      }
    } catch (err) {
      Alert.alert("Failed", "Please check your connection and try again.");
    } finally {
      setUploadProgress(null);
    }
  };

  // TODO: wire to real video recording/upload flow
  const uploadVideo = async () => {
    Alert.alert("Coming soon", "Video upload isn't wired up yet.");
  };

  // TODO: wire to real audio recorder + upload flow (e.g. expo-av)
  const uploadVoiceNote = async () => {
    Alert.alert("Coming soon", "Voice note upload isn't wired up yet.");
  };

  const savePrivacy = (id: string) => {
    // TODO: replace with real mutation, e.g. updateProfile({ photoPrivacy: id })
    // setPrivacy(id);
  };

  // ── Build dynamic options per sheet kind ─────────────────────────────────
  const getSheetConfig = (): {
    title: string;
    options: ActionSheetOption[];
  } => {
    if (!activeSheet) return { title: "", options: [] };

    switch (activeSheet.type) {
      case "photo-add":
        return {
          title: "Photo",
          options: [
            {
              id: "gallery",
              label: "Upload from gallery",
              onPress: () =>
                pickImageWithCrop("gallery", (original, crop) =>
                  uploadPhotoToSlot(activeSheet.slotIndex, original, crop),
                ),
            },
            {
              id: "camera",
              label: "Take a photo",
              onPress: () =>
                pickImageWithCrop("camera", (original, crop) =>
                  uploadPhotoToSlot(activeSheet.slotIndex, original, crop),
                ),
            },
          ],
        };

      case "photo-edit":
        return {
          title: "Photo",
          options: [
            ...(activeSheet.slotIndex !== 0
              ? [
                  {
                    id: "set-main",
                    label: "Set as Main Photo",
                    onPress: () => setAsMainPhoto(activeSheet.slotIndex),
                  } as ActionSheetOption,
                ]
              : []),
            {
              id: "replace-gallery",
              label: "Replace Photo - from gallery",
              onPress: () =>
                pickImageWithCrop("gallery", (original, crop) =>
                  uploadPhotoToSlot(activeSheet.slotIndex, original, crop),
                ),
            },
            {
              id: "replace-camera",
              label: "Replace Photo - from camera",
              onPress: () =>
                pickImageWithCrop("camera", (original, crop) =>
                  uploadPhotoToSlot(activeSheet.slotIndex, original, crop),
                ),
            },
          ],
        };

      case "video":
        return {
          title: "Video",
          options: [
            {
              id: "gallery",
              label: "Upload the video from gallery",
              onPress: uploadVideo,
            },
            { id: "record", label: "Record a video", onPress: uploadVideo },
          ],
        };

      case "voice":
        return {
          title: "Voice Note",
          options: [
            {
              id: "upload",
              label: "Upload the audio file from gallery",
              onPress: uploadVoiceNote,
            },
            { id: "record", label: "Record now", onPress: uploadVoiceNote },
          ],
        };

      case "horoscope":
        return {
          title: "Horoscope Photo",
          options: [
            {
              id: "gallery",
              label: "Upload from gallery",
              onPress: () =>
                pickImageForHoroscope("gallery", (uri) =>
                  uploadHoroscopePhoto(uri),
                ),
            },
            {
              id: "camera",
              label: "Take a photo",
              onPress: () =>
                pickImageForHoroscope("camera", (uri) =>
                  uploadHoroscopePhoto(uri),
                ),
            },
          ],
        };

      case "privacy":
        return {
          title: "Photo Privacy",
          options: PRIVACY_OPTIONS.map((opt) => ({
            id: opt.id,
            label: opt.label,
            onPress: () => savePrivacy(opt.id),
          })),
        };

      default:
        return { title: "", options: [] };
    }
  };

  const { title: sheetTitle, options: sheetOptions } = getSheetConfig();

  // ── Loading state ───────────────────────────────────────────────────────────
  if (isLoadingSession || isLoadingProfile) {
    return (
      <View className="flex-1 items-center justify-center bg-app-background">
        <ActivityIndicator size="large" color="#db2777" />
        <Text className="mt-3 text-gray-500 font-medium">
          Loading profile...
        </Text>
      </View>
    );
  }

  // ── Render ──────────────────────────────────────────────────────────────────

  const renderSlot = (
    photo: string | undefined,
    index: number,
    size: "large" | "small" = "large",
  ) =>
    photo ? (
      <PhotoCard
        key={index}
        source={{ uri: photo }}
        mainLabel={index === 0 ? "Main Photo" : undefined}
        pendingLabel={index !== 0}
        size={size}
        onPressMenu={() =>
          setActiveSheet({ type: "photo-edit", slotIndex: index })
        }
      />
    ) : (
      <AddPhotoSlot
        key={index}
        size={size}
        onPress={() => setActiveSheet({ type: "photo-add", slotIndex: index })}
      />
    );

  const privacyLabel = "Visible to Premium Members & I like";
  // PRIVACY_OPTIONS.find((p) => p.id === privacy)?.label ??
  // "Visible to Premium Members & I like";

  return (
    <View className="flex-1 bg-app-background">
      <ProfileProgressBanner
        percentage={0}
        message="Photos will be rejected if guidelines are not followed."
        showVerify={false}
      />
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 56 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Main photos section */}
        <View className="mt-14 mb-4">
          <Text className="text-2xl font-bold text-gray-900">Photos</Text>
        </View>

        <View className="flex-row gap-3 mb-3">
          {renderSlot(photos[0], 0)}
          {renderSlot(photos[1], 1)}
        </View>

        <View className="flex-row gap-3">
          {renderSlot(photos[2], 2)}
          {renderSlot(photos[3], 3)}
        </View>

        <View className="flex-row items-center justify-between mt-4">
          <View className="flex-row items-center flex-1">
            <Feather
              name="info"
              size={12}
              color="#8B8B8B"
              style={{ marginRight: 6, marginTop: -2 }}
            />
            <Text className="text-gray font-regular text-sm flex-1">
              Atleast 2 photos, follow guidelines.
            </Text>
          </View>
          <GuidelinesLink />
        </View>

        {/* Photo Privacy */}
        <Text className="text-2xl font-bold text-gray-900 mb-4 mt-14">
          Photo Privacy
        </Text>
        <View className="border border-dashed border-gray-400 rounded-2xl px-4 py-4 flex-row items-center justify-between bg-white">
          <Text className="text-gray-900 font-bold text-base">
            {privacyLabel}
          </Text>
          <Pressable onPress={() => setActiveSheet({ type: "privacy" })}>
            <Text className="text-pink-600 font-medium">Change</Text>
          </Pressable>
        </View>

        {/* Video intro */}
        <UploadRow
          heading="Video"
          label="Introduce yourself with a video."
          note="30 seconds maximum, follow guidelines."
          onPress={() => setActiveSheet({ type: "video" })}
          icon={AddVideoIcon}
        />

        {/* Voice */}
        <UploadRow
          heading="Voice Note"
          label="Express yourself through your Voice"
          note="30 seconds maximum, follow guidelines."
          onPress={() => setActiveSheet({ type: "voice" })}
          icon={AddVoiceNoteIcon}
        />

        {/* Horoscope */}
        <UploadRow
          heading="Horoscope Photo"
          label="You can upload your Horoscope Photo"
          note="Photo of most important data in horoscope."
          onPress={() => setActiveSheet({ type: "horoscope" })}
          imageUri={horoscopePhoto}
        />
      </ScrollView>

      {/* Single shared sheet, content driven by activeSheet */}
      <ActionOptionsSheet
        visible={activeSheet !== null}
        title={sheetTitle}
        options={sheetOptions}
        onClose={closeSheet}
      />

      {/* Upload progress overlay */}
      {uploadProgress !== null && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.4)",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View className="bg-white rounded-2xl px-6 py-5 items-center w-56">
            <ActivityIndicator size="large" color="#db2777" />
            <Text className="mt-3 text-gray-900 font-semibold">
              Uploading... {uploadProgress}%
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default EditPhotosMoreScreen;
