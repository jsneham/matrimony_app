// TODO: replace with your real API base URL / config
const API_BASE_URL = "https://www.milann.in/";

type UploadProgressCallback = (percent: number) => void;

type SessionInfo = {
  memberId: string;
  token: string;
};

/**
 * Mirrors the Android `uploadFileToServer()` flow for image_id 1-4:
 * uploads both the cropped file (profile_photoX_crop) and the
 * original file (profile_photoX_org) in a single multipart request.
 */
export async function uploadProfilePhotoWithCrop({
  slotIndex, // 1-4, matches Android's image_id
  originalUri,
  cropUri,
  session,
  onProgress,
}: {
  slotIndex: number;
  originalUri: string;
  cropUri: string;
  session: SessionInfo;
  onProgress?: UploadProgressCallback;
}): Promise<{ status: string; errmessage: string }> {
  const orgParam = `profile_photo${slotIndex}_org`;
  const cropParam = `profile_photo${slotIndex}_crop`;

  const formData = new FormData();

  formData.append("member_id", session.memberId);
  formData.append("user_agent", "NI-AAPP");
  formData.append("csrf_new_matrimonial", session.token);

  formData.append(cropParam, {
    uri: cropUri,
    name: sanitizeFileName(cropUri),
    type: guessMimeType(cropUri),
  } as any);

  formData.append(orgParam, {
    uri: originalUri,
    name: sanitizeFileName(originalUri),
    type: guessMimeType(originalUri),
  } as any);

  const url = `${API_BASE_URL}/modify_photo/upload_photo_new`;

  try {
    const response = await uploadWithProgress(url, formData, onProgress);
    return response;
  } catch (err) {
    throw err;
  }
}

/**
 * Mirrors the Android flow for image_id 0 (cover_photo, no crop) and
 * similar single-file endpoints (id_proof, horoscope_photo).
 */
export async function uploadSinglePhoto({
  fieldName, // "cover_photo" | "id_proof" | "horoscope_photo"
  fileUri,
  session,
  onProgress,
  endpointPath,
}: {
  fieldName: string;
  fileUri: string;
  session: SessionInfo;
  onProgress?: UploadProgressCallback;
  endpointPath: string;
}): Promise<{ status: string; errmessage: string }> {
  const formData = new FormData();

  formData.append("member_id", session.memberId);
  formData.append("user_agent", "NI-AAPP");
  formData.append("csrf_new_matrimonial", session.token);

  formData.append(fieldName, {
    uri: fileUri,
    name: sanitizeFileName(fileUri),
    type: guessMimeType(fileUri),
  } as any);

  const url = `${API_BASE_URL}${endpointPath}`;

  try {
    const response = await uploadWithProgress(url, formData, onProgress);
    return response;
  } catch (err) {
    throw err;
  }
}

// ── Helpers ─────────────────────────────────────────────────────────────────

function sanitizeFileName(uri: string): string {
  const raw = uri.split("/").pop() ?? `file_${Date.now()}.jpg`;
  return raw.replace(/[^a-zA-Z0-9.]/g, "");
}

function guessMimeType(uri: string): string {
  const ext = uri.split(".").pop()?.toLowerCase();
  switch (ext) {
    case "png":
      return "image/png";
    case "heic":
      return "image/heic";
    case "jpg":
    case "jpeg":
    default:
      return "image/jpeg";
  }
}

/**
 * XMLHttpRequest is used instead of fetch because fetch doesn't expose
 * upload progress events (mirrors ProgressRequestBody's callback behavior).
 */
function uploadWithProgress(
  url: string,
  formData: FormData,
  onProgress?: UploadProgressCallback,
): Promise<{ status: string; errmessage: string }> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable && onProgress) {
        const percent = Math.round((event.loaded / event.total) * 100);
        onProgress(percent);
      }
    };

    xhr.onload = () => {
      try {
        const data = JSON.parse(xhr.responseText);
        resolve(data);
      } catch (parseErr) {
        reject(new Error("Invalid server response"));
      }
    };

    xhr.onerror = () => {
      reject(new Error("Network request failed"));
    };

    xhr.send(formData);
  });
}

/**
 * Mirrors the Android `setProfilePhotoApi()` flow: sets an already-uploaded
 * photo slot as the main/profile photo. Simple form POST, no file upload.
 */
export async function setMainProfilePhoto({
  memberId,
  photoNumber,
  session,
  onProgress,
}: {
  memberId: string;
  photoNumber: number;
  session: SessionInfo;
  onProgress?: UploadProgressCallback;
}): Promise<{ status: string; errmessage: string }> {
  const formData = new FormData();

  formData.append("member_id", memberId);
  formData.append("photo_number", String(photoNumber));
  formData.append("set_profile", "set_profile");
  formData.append("user_agent", "NI-AAPP");
  formData.append("csrf_new_matrimonial", session.token);

  const url = `${API_BASE_URL}modify_photo/set_profile_pic`;

  try {
    const response = await uploadWithProgress(url, formData, onProgress);
    return response;
  } catch (err) {
    throw err;
  }
}

export async function changePhotoVisibility({
  matriId,
  photoViewStatus, // "0" | "1" | "2" — matches PRIVACY_OPTIONS ids
  onProgress,
}: {
  matriId: string;
  photoViewStatus: string;
  onProgress?: UploadProgressCallback;
}): Promise<{ status: string; errmessage: string }> {
  const formData = new FormData();

  formData.append("matri_id", matriId);
  formData.append("photo_view_status", photoViewStatus);
  formData.append("action", "photo_view_status");

  // TODO: replace with your real endpoint path (Android's AppConstants.photo_visibility_status)
  const url = `${API_BASE_URL.replace(/\/$/, "")}/modify_photo/photo_visibility_status`;

  try {
    const response = await uploadWithProgress(url, formData, onProgress);
    return response;
  } catch (err) {
    throw err;
  }
}
