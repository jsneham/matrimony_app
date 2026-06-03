import { Stack } from "expo-router";
import React from "react";

export default function MembershipLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        animation: "slide_from_right",
        contentStyle: {
          backgroundColor: "white",
        },
      }}
    >
      <Stack.Screen
        name="membershipPlanList"
        options={{
          title: "Membership Plans",
        }}
      />
    </Stack>
  );
}
