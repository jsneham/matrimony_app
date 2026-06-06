import BottomModal from "@/components/BottomModal";
import { MenuItem } from "@/components/MenuItem";
import { helpSupportMenu } from "@/constants/data";
import { useSession } from "@/hooks/useSession";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";

export const HelpSupport = () => {
  const { logout } = useSession();
  const router = useRouter();

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
    console.log(item.title);
    switch (item.title.toLowerCase()) {
      case "logout":
        setShowLogoutModal(true);
        break;
    }
  };

  return (
    <View className="flex-1 bg-white">
      <View>
        {helpSupportMenu.map((item) => (
          <MenuItem
            key={item.id}
            icon={item.icon}
            title={item.title}
            subtitle={item.subtitle}
            onPress={() => handlePress(item)}
          />
        ))}
      </View>
      <BottomModal
        visible={showLogoutModal}
        onConfirm={handleLogoutConfirm}
        onCancel={handleLogoutCancel}
      />
    </View>
  );
};
