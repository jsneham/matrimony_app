import { MenuItem } from "@/components/MenuItem";
import { helpSupportMenu } from "@/constants/data";
import { useSession } from "@/hooks/useSession";
import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";

export const HelpSupport = () => {
  const { logout } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.replace("/(auth)/login");
  };

  const handlePress = (item: (typeof helpSupportMenu)[0]) => {
    console.log(item.title);
    switch (item.title.toLowerCase()) {
      case "logout":
        handleLogout();
        break;
    }
  };

  return (
    <View className="bg-white">
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
  );
};
