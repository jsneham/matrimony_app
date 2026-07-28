import { SafetyCentreSection } from "@/components/account/SafetyCentreSection";
import BottomModal from "@/components/BottomModal";
import { MenuItem } from "@/components/MenuItem";
import { helpSupportMenu } from "@/constants/data";
import { useSession } from "@/hooks/useSession";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Platform, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Screen-specific extras, prepended to the shared helpSupportMenu list below
// rather than added to the constant, so the existing tab screen is unaffected.
const EXTRA_HELP_MENU = [
  {
    id: "extra-1",
    icon: "lock",
    title: "Change Password",
    subtitle: "Update your account password",
  },
  {
    id: "extra-2",
    icon: "flag",
    title: "Report Profile or Misuse",
    subtitle: "Report inappropriate behaviour or profiles",
  },
  {
    id: "extra-3",
    icon: "user-x",
    title: "Blocked Profiles",
    subtitle: "Manage the profiles you've blocked",
  },
  {
    id: "extra-4",
    icon: "eye",
    title: "Contact Viewed",
    subtitle: "See who viewed your contact details",
  },
];

// helpSupportMenu's icon names are MaterialCommunityIcons-specific (e.g.
// "information", "cash-refund") — mapped to Feather equivalents here only,
// so the shared constant/old tab screen keep their original icon set.
const FEATHER_ICON_BY_TITLE: Record<string, string> = {
  "FAQs - Frequently Asked Questions": "help-circle",
  "About Us": "info",
  "Terms & Conditions": "file-text",
  "Privacy Policy": "shield",
  "Refund Policy": "credit-card",
  "Delete Account": "trash-2",
  Logout: "log-out",
};

export default function HelpSupportScreen() {
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

  const handlePress = (item: (typeof helpSupportMenu)[0]) => {
    switch (item.title.toLowerCase()) {
      case "logout":
        setShowLogoutModal(true);
        break;
    }
  };

  // Covered by the Safety Centre section above, so hidden here — shared
  // helpSupportMenu list is left untouched for the existing tab screen.
  const generalHelpMenu = [
    ...EXTRA_HELP_MENU,
    ...helpSupportMenu.filter((item) => item.title !== "Stay Safe"),
  ];

  return (
    <View className="flex-1 bg-app-background">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 56 + (Platform.OS === "ios" ? insets.bottom : 0),
        }}
      >
        <SafetyCentreSection />
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
      </ScrollView>
      <BottomModal
        visible={showLogoutModal}
        onConfirm={handleLogoutConfirm}
        onCancel={handleLogoutCancel}
      />
    </View>
  );
}
