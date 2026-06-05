import React from "react";

import { Tabs } from "react-native-collapsible-tab-view";

import { AccountProfileHeader } from "@/components/AccountProfileHeader";
import { MyAccount } from ".";
import { AppSettings } from "./app-settings";
import { HelpSupport } from "./help-support";

const HEADER_HEIGHT = 320;

export default function AccountLayout() {
  const renderHeader = () => <AccountProfileHeader />;

  return (
    <Tabs.Container
      renderHeader={renderHeader}
      headerHeight={HEADER_HEIGHT}
      allowHeaderOverscroll
    >
      <Tabs.Tab name="My Account">
        <Tabs.ScrollView>
          <MyAccount />
        </Tabs.ScrollView>
      </Tabs.Tab>

      <Tabs.Tab name="App Settings">
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
