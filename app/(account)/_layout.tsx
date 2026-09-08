import ChevronLeftIcon from "@/assets/icons/ChevronLeftIcon";
import { router } from "expo-router";
import React from "react";
import { Pressable, View } from "react-native";
import { Text } from "@/components/ui/Text";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Tabs } from "react-native-collapsible-tab-view";

import { AccountProfileHeader } from "@/components/AccountProfileHeader";
import { AccountTabBar } from "@/components/account/AccountTabBar";
import { AppSettings } from "@/components/account/AppSettingsTab";
import { HelpSupport } from "@/components/account/HelpSupportTab";
import { MyAccount } from "@/components/account/MyAccountTab";

const HEADER_HEIGHT = 320;
const TOOLBAR_HEIGHT = 49;

export default function AccountLayout() {
  const insets = useSafeAreaInsets();
  const toolbarOffset = insets.top + TOOLBAR_HEIGHT;
  const renderHeader = () => <AccountProfileHeader />;
  const renderTabBar = (props: React.ComponentProps<typeof AccountTabBar>) => (
    <AccountTabBar {...props} />
  );

  return (
    <View className="bg-app-background" style={{ flex: 1 }}>
      <Tabs.Container
        containerStyle={{ flex: 1, marginTop: toolbarOffset }}
        renderHeader={renderHeader}
        renderTabBar={renderTabBar}
        headerHeight={HEADER_HEIGHT}
        allowHeaderOverscroll
        headerContainerStyle={{
          shadowOpacity: 0,
          shadowRadius: 0,
          shadowOffset: { width: 0, height: 0 },
          elevation: 0,
        }}
      >
        <Tabs.Tab name="My Account">
          <Tabs.ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <MyAccount />
          </Tabs.ScrollView>
        </Tabs.Tab>

        <Tabs.Tab name="Safety Centre">
          <Tabs.ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <AppSettings />
          </Tabs.ScrollView>
        </Tabs.Tab>

        <Tabs.Tab name="Help & Support">
          <Tabs.ScrollView>
            <HelpSupport />
          </Tabs.ScrollView>
        </Tabs.Tab>
      </Tabs.Container>

      {/* Fixed header, drawn on top of the tab view */}
      <View
        className="bg-white flex-row items-center"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          paddingTop: insets.top,
        }}
      >
        <Pressable
          onPress={() => router.back()}
          hitSlop={10}
          style={{
            width: 44,
            height: TOOLBAR_HEIGHT,
            justifyContent: "center",
            paddingLeft: 20,
          }}
        >
          <ChevronLeftIcon size={24} color="black" />
        </Pressable>
        <Text
          className="flex-1 text-center text-lg font-bold text-black"
          style={{ marginRight: 44 }}
        >
          Account & More
        </Text>
      </View>
    </View>
  );
}
