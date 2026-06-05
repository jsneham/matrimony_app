import React from "react";
import { Pressable, Text, View } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "react-native-collapsible-tab-view";

import { ActionCard } from "@/components/ActionCard";
import { ProfileCompletionCard } from "@/components/ProfileCompletionCard";
import { colors } from "@/constants/theme";
import { MyAccount } from ".";
import { AppSettings } from "./app-settings";
import { HelpSupport } from "./help-support";

const HEADER_HEIGHT = 320;

export default function AccountLayout() {
  const renderHeader = () => (
    <View className="bg-white" pointerEvents="box-none">
      {/* Profile */}
      <View className="items-center px-6 py-6">
        <View
          className="w-24 h-24 rounded-full items-center justify-center mb-4"
          style={{
            borderWidth: 4,
            borderColor: colors.accent,
            backgroundColor: "#E5F0F5",
          }}
        >
          <MaterialCommunityIcons
            name="account"
            size={60}
            color={colors.accent}
          />
        </View>

        <Text className="text-2xl font-bold text-black">Radhika Punekar</Text>

        <Text className="text-gray-500 mt-1">JJ125575</Text>
      </View>

      {/* Action Cards */}
      <View className="flex-row px-4 mb-5">
        <ProfileCompletionCard onPress={() => {}} />

        <ActionCard
          icon="file-document"
          title="Preview"
          subtitle="How your Profile looks"
          onPress={() => {}}
        />

        <ActionCard
          icon="download"
          title="Download"
          subtitle="Download Bio Data"
          onPress={() => {}}
        />
      </View>

      {/* Membership */}
      <View
        className="mx-4 mb-4 p-4 rounded-lg flex-row items-center justify-between"
        style={{ backgroundColor: "#F5EFE0" }}
      >
        <Text className="text-lg font-bold">Gold 1 month</Text>

        <Pressable
          className="rounded-full px-5 py-2"
          style={{
            backgroundColor: colors.accent,
          }}
        >
          <Text className="text-white font-bold text-xs">UPGRADE</Text>
        </Pressable>
      </View>
    </View>
  );

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
