import { tabs } from "@/constants/data";
import { colors, components } from "@/constants/theme";
import { TabIconProps } from "@/types/dashboard";
import { Tabs } from "expo-router";
import { Image, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const tabBar = components.tabBar;

const TabIcon = ({ focused, icon }: TabIconProps) => {
  return (
    <View className="size-12 items-center justify-center">
      <Image
        source={icon}
        resizeMode="contain"
        className="w-6 h-6"
        style={{
          tintColor: focused ? colors.accent : colors.tabIconDefault,
        }}
      />
    </View>
  );
};

const TabLayout = () => {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.tabIconDefault,
        tabBarStyle: {
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 60 + insets.bottom,
          backgroundColor: colors.white,
          paddingBottom: insets.bottom,
          paddingTop: 8,
          elevation: 0,
          shadowOpacity: 0.05,
          // bottom: Math.max(insets.bottom, tabBar.horizontalInset),
          // marginHorizontal: tabBar.horizontalInset,
          // borderRadius: tabBar.radius,
          // borderTopWidth: 1,
          // borderTopColor: "#E5E7EB",
        },
        // tabBarLabelStyle: {
        //   fontSize: 11,
        //   marginBottom: 4,
        //   fontFamily: "medium",
        // },
        // tabBarItemStyle: {
        //   paddingVertical: tabBar.height / 2 - tabBar.iconFrame / 1.6,
        // },
        // tabBarIconStyle: {
        //   width: tabBar.iconFrame,
        //   height: tabBar.iconFrame,
        //   alignItems: "center",
        // },
      }}
    >
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            headerTitleAlign: "center",
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} icon={tab.icon} />
            ),
            tabBarLabel: ({ focused, color }) => (
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "medium",
                  textAlign: "center",
                  marginBottom: 4,
                  color: focused ? colors.accent : colors.tabIconDefault,
                }}
              >
                {tab.title}
              </Text>
            ),
          }}
        />
      ))}
    </Tabs>
  );
};

export default TabLayout;
