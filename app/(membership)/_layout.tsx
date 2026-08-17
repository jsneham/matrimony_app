import { Stack } from "expo-router";
import React from "react";

export default function MembershipLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Membership Plans",
          headerBackTitle: "",
        }}
      />
    </Stack>
  );
}
