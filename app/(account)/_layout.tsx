import React from "react";

import { Tabs } from "react-native-collapsible-tab-view";

import { AccountProfileHeader } from "@/components/AccountProfileHeader";
import { AccountTabBar } from "@/components/account/AccountTabBar";
import { MyAccount } from ".";
import { AppSettings } from "./app-settings";
import { HelpSupport } from "./help-support";

const HEADER_HEIGHT = 320;

export default function AccountLayout() {
  const renderHeader = () => <AccountProfileHeader />;
  const renderTabBar = (props: React.ComponentProps<typeof AccountTabBar>) => (
    <AccountTabBar {...props} />
  );

  return (
    <Tabs.Container
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
        <Tabs.ScrollView>
          <MyAccount />
        </Tabs.ScrollView>
      </Tabs.Tab>

      <Tabs.Tab name="Safety Centre">
        <Tabs.ScrollView>
          <AppSettings />
        </Tabs.ScrollView>
      </Tabs.Tab>

      <Tabs.Tab name="Help & Support">
        <Tabs.ScrollView>
          <HelpSupport />
        </Tabs.ScrollView>
      </Tabs.Tab>
    </Tabs.Container>
  );
}
