import { HeaderMenu } from "@/components/HeaderMenu";
import { Text } from "@/components/ui/Text";
import { tabs } from "@/constants/data";
import { colors } from "@/constants/theme";
import { TabIconProps } from "@/types/dashboard";
import { Tabs } from "expo-router";
import { Image, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const TabIcon = ({ focused, icon }: TabIconProps) => {
  return (
    <View className="w-6 h-6 items-center justify-center">
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
        headerRight: () => <HeaderMenu />,
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.tabIconDefault,
        tabBarStyle: {
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 62 + insets.bottom,
          backgroundColor: colors.white,
          paddingBottom: insets.bottom,
          elevation: 0,
          shadowOpacity: 0,
          borderTopColor: "#F9F9F9",
        },
        // Matches the Figma tab-item frame: padding 6px 14px 4px 15px
        // (App_NewMargins, node 6261-642). Horizontal padding is left to
        // the default even split (390px / 5 tabs = 78px each, matching
        // the Figma frame width), only vertical padding is set explicitly.
        tabBarItemStyle: {
          paddingTop: 6,
          paddingBottom: 4,
        },
      }}
    >
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            headerTitleAlign: "left",
            headerTitle: () => (
              <Text className="text-2xl leading-none font-bold text-black">
                {tab.title}
              </Text>
            ),
            headerTitleContainerStyle: {
              left: 4,
            },
            headerStyle: {
              borderBottomWidth: 0,
              borderBottomColor: "transparent",
              shadowOpacity: 0,
              elevation: 0,
              height: 100,
            },

            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} icon={tab.icon} />
            ),
            tabBarLabel: ({ focused }) => (
              <Text
                className="text-[11px] leading-none text-center mt-[6px] font-medium"
                style={{
                  color: focused ? colors.accent : colors.tabIconDefault,
                }}
                numberOfLines={1}
                maxFontSizeMultiplier={1.3}
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
