import { Stack } from "expo-router";
import React from "react";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
        contentStyle: {
          backgroundColor: "white",
        },
      }}
    >
      <Stack.Screen
        name="login"
        options={{
          title: "Login",
          headerBackButtonDisplayMode: "minimal",
        }}
      />

      <Stack.Screen
        name="signup"
        options={{
          title: "Sign Up",
          headerBackButtonDisplayMode: "minimal",
        }}
      />
      {/*<Stack.Screen
        name="forgot-password"
        options={{
          title: "Forgot Password",
         headerBackButtonDisplayMode: "minimal", 
        }}
      /> */}
    </Stack>
  );
}
