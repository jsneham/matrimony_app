import { MenuItem } from "@/components/MenuItem";
import { MY_ACCOUNT_MENU } from "@/constants/data";
import React from "react";
import { View } from "react-native";

export const MyAccount = () => {
  const handlePress = (item: (typeof MY_ACCOUNT_MENU)[0]) => {
    console.log(item.title);
    // if (item.route) {
    //   router.push(item.route as any);
    // }
  };

  return (
    <View className="bg-white">
      {MY_ACCOUNT_MENU.map((item) => (
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
