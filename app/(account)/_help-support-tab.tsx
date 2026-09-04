import BottomModal from "@/components/BottomModal";
import { MenuItem } from "@/components/MenuItem";
import { helpSupportMenu } from "@/constants/data";
import { useSession } from "@/hooks/useSession";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Platform, View } from "react-native";
import { Text } from "@/components/ui/Text";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// helpSupportMenu's icon names are MaterialCommunityIcons-specific (e.g.
// "information", "cash-refund") — mapped to Feather equivalents here only,
// matching the list design used in the standalone Help & Support screen.
const FEATHER_ICON_BY_TITLE: Record<string, string> = {
  "FAQs - Frequently Asked Questions": "help-circle",
  "About Us": "info",
  "Terms & Conditions": "file-text",
  "Privacy Policy": "shield",
  "Refund Policy": "credit-card",
  "Delete Account": "trash-2",
  Logout: "log-out",
};

// Screen-specific extras, prepended below rather than added to the shared
// constant, so the standalone Help & Support screen is unaffected.
const EXTRA_HELP_MENU = [
  { id: "extra-1", icon: "lock", title: "Change Password" },
  { id: "extra-2", icon: "flag", title: "Report Profile or Misuse" },
];

export const HelpSupport = () => {
  const { logout } = useSession();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogoutConfirm = async () => {
    setShowLogoutModal(false);
    try {
      await logout();
      router.replace("/(auth)/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleLogoutCancel = () => {
    setShowLogoutModal(false);
  };

  const handlePress = (item: { title: string }) => {
    switch (item.title.toLowerCase()) {
      case "logout":
        setShowLogoutModal(true);
        break;
    }
  };

  const generalHelpMenu = [
    ...EXTRA_HELP_MENU,
    ...helpSupportMenu.filter((item) => item.title !== "Stay Safe"),
  ];

  return (
    <View className="flex-1 bg-app-background">
      <Text className="px-5 pt-14 pb-5 text-sm font-bold text-black">
        General Help &amp; Support
      </Text>
      <View className="bg-white">
        {generalHelpMenu.map((item, index) => (
          <MenuItem
            key={item.id}
            icon={FEATHER_ICON_BY_TITLE[item.title] ?? item.icon}
            iconSet="feather"
            title={item.title}
            onPress={() => handlePress(item)}
            isLast={index === generalHelpMenu.length - 1}
          />
        ))}
      </View>
      <View
        style={{
          height: 56 + (Platform.OS === "ios" ? insets.bottom : 0),
        }}
      />
      <BottomModal
        visible={showLogoutModal}
        onConfirm={handleLogoutConfirm}
        onCancel={handleLogoutCancel}
      />
    </View>
  );
};
