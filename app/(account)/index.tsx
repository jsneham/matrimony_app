import { MenuItem } from "@/components/MenuItem";
import { MY_ACCOUNT_MENU } from "@/constants/data";
import { Href, router } from "expo-router";
import React from "react";
import { View } from "react-native";
import { Text } from "@/components/ui/Text";

export const MyAccount = () => {
  const handlePress = (item: (typeof MY_ACCOUNT_MENU)[0]) => {
    switch (item.title.toLowerCase()) {
      case "manage photos":
        router.push({
          pathname: "/(profile)",
          params: { tab: "photos" },
        } as Href);
        break;
      case "preview & update profile":
        router.push({
          pathname: "/(profile)",
          params: { tab: "profile" },
        } as Href);
        break;
      case "update partner preferences":
        router.push({
          pathname: "/(profile)",
          params: { tab: "preferences" },
        } as Href);
        break;
      case "safety & support center":
        router.push("/help-support" as Href);
        break;
      default:
        console.log(item.title);
    }
  };

  return (
    <View className="w-full bg-app-background">
      <Text className="px-5 pt-12 pb-4 text-sm font-bold text-black">
        Account Settings
      </Text>
      <View className="mx-5 rounded-2xl overflow-hidden bg-white">
        {MY_ACCOUNT_MENU.map((item, index) => (
          <MenuItem
            key={item.id}
            icon={item.icon}
            iconSet="feather"
            title={item.title}
            onPress={() => handlePress(item)}
            isLast={index === MY_ACCOUNT_MENU.length - 1}
          />
        ))}
      </View>
    </View>
  );
};
