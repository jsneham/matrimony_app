import { MenuItem } from "@/components/MenuItem";
import { APP_SETTINGS_MENU } from "@/constants/data";
import React from "react";
import { View } from "react-native";

export const AppSettings = () => {
  const handlePress = (item: (typeof APP_SETTINGS_MENU)[0]) => {
    console.log(item.title);
    // if (item.route) {
    //   router.push(item.route as any);
    // }
  };

  return (
    <View className="bg-white">
      {APP_SETTINGS_MENU.map((item) => (
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
