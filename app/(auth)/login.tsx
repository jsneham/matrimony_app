import "@/global.css";

import { useLogin } from "@/hooks/useAuth";
import { Href, router } from "expo-router";
import { styled } from "nativewind";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledTextInput = styled(TextInput);
const StyledScrollView = styled(ScrollView);
const StyledKeyboardAvoidingView = styled(KeyboardAvoidingView);

export default function LoginScreen() {
  const [username, setUsername] = useState("jj125575");
  const [password, setPassword] = useState("radhika123");

  const loginMutation = useLogin();

  const handleLogin = () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    loginMutation.mutate(
      { username: username.trim(), password: password.trim() },
      {
        onSuccess: () => {
          console.log("Login successful, navigating to dashboard...");
          router.navigate("/(tabs)" as Href);
        },
        onError: (error: any) => {
          const msg =
            error.response?.data?.errmessage ||
            error.response?.data?.message ||
            error.message ||
            "Something went wrong. Please try again.";
          Alert.alert("Login Failed", msg);
        },
      },
    );
  };

  return (
    <StyledKeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar barStyle="dark-content" />

      <StyledScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <StyledView className="flex-1 justify-center px-6">
          {/* Back Button */}
          <StyledTouchableOpacity
            className="absolute top-12 left-6"
            onPress={() => router.back()}
            disabled={loginMutation.isPending}
          >
            <StyledText className="text-2xl">←</StyledText>
          </StyledTouchableOpacity>

          <StyledText className="text-3xl font-bold mb-2 text-center">
            Welcome Back
          </StyledText>
          <StyledText className="text-gray-500 mb-8 text-center">
            Login to continue
          </StyledText>

          {/* Username Input */}
          <StyledTextInput
            placeholder="Username or Email"
            className="border border-gray-300 rounded-xl px-4 py-4 mb-4"
            autoCapitalize="none"
            value={username}
            onChangeText={setUsername}
            editable={!loginMutation.isPending}
          />

          {/* Password Input */}
          <StyledTextInput
            placeholder="Password"
            className="border border-gray-300 rounded-xl px-4 py-4 mb-2"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            editable={!loginMutation.isPending}
          />

          {/* Forgot Password Link */}
          <StyledTouchableOpacity
            className="self-end mb-6"
            // onPress={() => router.push("/(auth)/forgot-password")}
            disabled={loginMutation.isPending}
          >
            <StyledText className="text-blue-600 text-sm">
              Forgot Password?
            </StyledText>
          </StyledTouchableOpacity>

          {/* Login Button */}
          <StyledTouchableOpacity
            className={`rounded-xl py-4 mb-4 ${
              loginMutation.isPending ? "bg-blue-400" : "bg-blue-600"
            }`}
            activeOpacity={0.8}
            onPress={handleLogin}
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? (
              <ActivityIndicator color="white" />
            ) : (
              <StyledText className="text-white text-center text-lg font-semibold">
                Login
              </StyledText>
            )}
          </StyledTouchableOpacity>

          {/* Sign Up Link */}
          <StyledView className="flex-row justify-center mt-4">
            <StyledText className="text-gray-600">
              Don't have an account?{" "}
            </StyledText>
            <StyledTouchableOpacity
              onPress={() => router.push("/(auth)/signup")}
              disabled={loginMutation.isPending}
            >
              <StyledText className="text-blue-600 font-semibold">
                Sign Up
              </StyledText>
            </StyledTouchableOpacity>
          </StyledView>
        </StyledView>
      </StyledScrollView>
    </StyledKeyboardAvoidingView>
  );
}
