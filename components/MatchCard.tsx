import { useSession } from "@/hooks/useSession";
import { SESSION_KEYS } from "@/types/common";
import { MatchCardProps } from "@/types/matches";
import { getPlanAwareName } from "@/utils/profileHelpers";

import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

import React, { useMemo, useRef, useState } from "react";

import {
  ActivityIndicator,
  Animated,
  Image,
  TouchableOpacity,
  View,
} from "react-native";
import { Text } from "@/components/ui/Text";

type ActionButton = {
  key: string;
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  activeColor: string;
  onPress: (profileId: string) => void;
};

type MatchCardComponentProps = MatchCardProps & {
  cardHeight?: number;
};

export const MatchCard: React.FC<MatchCardComponentProps> = ({
  profile,
  cardHeight = 470,
}) => {
  /* ================================================================
     SESSION
     ================================================================ */

  const { data: sessionData } = useSession([SESSION_KEYS.PLAN_STATUS]);

  const planStatus = sessionData?.[SESSION_KEYS.PLAN_STATUS] ?? "";

  /* ================================================================
     ANIMATION
     ================================================================ */

  const scaleAnim = useRef(new Animated.Value(1)).current;

  /* ================================================================
     IMAGE STATE
     ================================================================ */

  const [imageLoading, setImageLoading] = useState(true);

  const [imageError, setImageError] = useState(false);

  /* ================================================================
     IMAGE URL
     ================================================================ */

  const imageUrl = useMemo(() => {
    if (!profile?.photoUrl || !profile?.photo1) {
      return null;
    }

    return `${profile.photoUrl}${profile.photo1}`;
  }, [profile?.photoUrl, profile?.photo1]);

  /* ================================================================
     DISPLAY NAME
     ================================================================ */

  const displayName = useMemo(
    () =>
      getPlanAwareName(
        planStatus,
        profile?.firstname,
        profile?.lastname,
        profile?.username,
      ),
    [planStatus, profile?.firstname, profile?.lastname, profile?.username],
  );

  /* ================================================================
     DISPLAY AGE
     ================================================================ */

  const displayAge = useMemo(() => {
    if (!profile?.age) {
      return null;
    }

    const match = String(profile.age).match(/(\d+)/);

    return match ? match[1] : String(profile.age);
  }, [profile?.age]);

  /* ================================================================
     ACTIVE LABEL
     ================================================================ */

  const activeLabel = useMemo(() => {
    if (profile?.active_status) {
      return profile.active_status;
    }

    if (profile?.last_login) {
      return `Active on ${profile.last_login}`;
    }

    return null;
  }, [profile?.active_status, profile?.last_login]);

  /* ================================================================
     MANAGED BY
     ================================================================ */

  const managedByLabel = profile?.profileby
    ? `Profile managed by ${profile.profileby}`
    : null;

  /* ================================================================
     PHOTO COUNT
     ================================================================ */

  const photoCount = profile?.photo_view_count ?? (profile?.photo1 ? 1 : 0);

  /* ================================================================
     PRESS ANIMATION
     ================================================================ */

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.97,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  /* ================================================================
     IMAGE CALLBACKS
     ================================================================ */

  const handleImageLoad = () => {
    setImageLoading(false);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };

  /* ================================================================
     ACTION BUTTONS
     ================================================================ */

  const actionButtons: ActionButton[] = [
    {
      key: "interest",
      icon: "mail-outline",
      label: "Interest",
      activeColor: "#f87171",

      onPress: (id) => {
        console.log("Interest ->", id);
      },
    },

    {
      key: "shortlist",
      icon: "star-outline",
      label: "Shortlist",
      activeColor: "#ffffff",

      onPress: (id) => {
        console.log("Shortlist ->", id);
      },
    },

    {
      key: "ignore",
      icon: "close",
      label: "Ignore",
      activeColor: "#ffffff",

      onPress: (id) => {
        console.log("Ignore ->", id);

        // TODO:
        // skipProfile(id);
      },
    },

    {
      key: "message",
      icon: "chatbubble-ellipses-outline",
      label: "Chat",
      activeColor: "#ffffff",

      onPress: (id) => {
        console.log("Message ->", id);

        router.push({
          pathname: "/message/chat/[other_matriId]",
          params: {
            other_matriId: profile.id,
          },
        });
      },
    },
  ];

  /* ================================================================
     CARD
     ================================================================ */

  return (
    <Animated.View
      style={{
        /**
         * THIS is the actual physical card height.
         *
         * It is intentionally shorter than the FlatList viewport.
         */
        height: cardHeight,

        transform: [
          {
            scale: scaleAnim,
          },
        ],
      }}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={() =>
          router.push({
            pathname: "/profile/[matriId]",
            params: {
              matriId: profile.id,
            },
          })
        }
        style={{
          flex: 1,

          overflow: "hidden",

          borderRadius: 20,

          backgroundColor: "#ffffff",

          shadowColor: "#000",

          shadowOpacity: 0.12,

          shadowRadius: 10,

          shadowOffset: {
            width: 0,
            height: 4,
          },

          elevation: 6,
        }}
      >
        {/* ==========================================================
            PHOTO
            ========================================================== */}

        <View className="relative flex-1 bg-gray-200">
          {/* ========================================================
              IMAGE
              ======================================================== */}

          {imageUrl && !imageError ? (
            <>
              <Image
                source={{
                  uri: imageUrl,
                }}
                style={{
                  width: "100%",
                  height: "100%",
                }}
                resizeMode="cover"
                onLoad={handleImageLoad}
                onError={handleImageError}
              />

              {imageLoading && (
                <View className="absolute inset-0 items-center justify-center bg-gray-300">
                  <ActivityIndicator size="large" color="#0066cc" />
                </View>
              )}
            </>
          ) : (
            /* ======================================================
               NO PHOTO
               ====================================================== */

            <View
              style={{
                width: "100%",
                height: "100%",
              }}
              className="items-center justify-center bg-gray-300"
            >
              <Ionicons name="image-outline" size={64} color="#999" />

              <Text className="mt-2 text-gray-600">No Photo</Text>
            </View>
          )}

          {/* ========================================================
              PHOTO COUNT
              ======================================================== */}

          {photoCount > 0 && (
            <View
              className="absolute flex-row items-center rounded-full bg-black/50 px-2 py-1"
              style={{
                top: 12,
                right: 12,
              }}
            >
              <Ionicons name="images-outline" size={12} color="white" />

              <Text className="ml-1 text-white text-xs font-medium">
                {photoCount}
              </Text>
            </View>
          )}

          {/* ========================================================
              BOTTOM CONTENT

              IMPORTANT:

              bottom = 0

              The gradient reaches exactly to the bottom of
              the CARD.

              There is no artificial bottom offset here.
              ======================================================== */}

          <LinearGradient
            colors={[
              "transparent",
              "rgba(0,0,0,0.20)",
              "rgba(0,0,0,0.60)",
              "rgba(0,0,0,0.92)",
            ]}
            locations={[0, 0.25, 0.55, 1]}
            style={{
              position: "absolute",

              left: 0,
              right: 0,
              bottom: 0,

              /**
               * Space above the content creates
               * the photo-to-gradient transition.
               */
              paddingTop: 75,

              paddingHorizontal: 16,

              /**
               * Small space below the action labels.
               */
              paddingBottom: 12,
            }}
          >
            {/* ======================================================
                ACTIVE STATUS
                ====================================================== */}

            {activeLabel && (
              <Text
                className="text-white/80 text-xs mb-1"
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {activeLabel}
              </Text>
            )}

            {/* ======================================================
                NAME + AGE
                ====================================================== */}

            <View className="flex-row items-center">
              <Text className="font-bold text-white mr-2">{displayName}</Text>

              {displayAge && (
                <Text className="font-medium text-white">{displayAge}</Text>
              )}
            </View>

            {/* ======================================================
                HEIGHT / CITY / RELIGION
                ====================================================== */}

            <Text
              className="mt-1 text-sm text-white"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {[profile?.height, profile?.city_name, profile?.religion_name]
                .filter(Boolean)
                .join(" • ")}
            </Text>

            {/* ======================================================
                OCCUPATION / INCOME
                ====================================================== */}

            {(profile?.occupation_name || profile?.income) && (
              <Text
                className="text-sm text-white"
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {[profile?.occupation_name, profile?.income]
                  .filter(Boolean)
                  .join(" • ")}
              </Text>
            )}

            {/* ======================================================
                EDUCATION
                ====================================================== */}

            {profile?.education_name && (
              <Text
                className="text-sm text-white"
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {profile.education_name}
              </Text>
            )}

            {/* ======================================================
                MANAGED BY
                ====================================================== */}

            {managedByLabel && (
              <Text
                className="mt-1 text-xs text-white/70 italic"
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {managedByLabel}
              </Text>
            )}

            {/* ======================================================
                ACTION BUTTONS

                The card ENDS immediately after this area.
                ====================================================== */}

            <View
              className="flex-row items-center justify-between"
              style={{
                marginTop: 10,
              }}
            >
              {actionButtons.map((button) => (
                <TouchableOpacity
                  key={button.key}
                  className="flex-1 items-center justify-center"
                  onPress={(event) => {
                    /**
                     * Prevent the parent card from opening
                     * the profile when an action is pressed.
                     */
                    event.stopPropagation();

                    button.onPress(profile.id);
                  }}
                  hitSlop={{
                    top: 8,
                    bottom: 8,
                    left: 8,
                    right: 8,
                  }}
                >
                  {/* ==================================================
                        ICON CIRCLE
                        ================================================== */}

                  <View
                    style={{
                      width: 40,
                      height: 40,

                      borderRadius: 20,

                      alignItems: "center",

                      justifyContent: "center",

                      backgroundColor: "rgba(0,0,0,0.45)",
                    }}
                  >
                    <Ionicons
                      name={button.icon}
                      size={20}
                      color={button.activeColor}
                    />
                  </View>

                  {/* ==================================================
                        LABEL
                        ================================================== */}

                  <Text
                    className="mt-1 text-xs text-white"
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {button.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </LinearGradient>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};
