import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { SplashScreen, Stack } from "expo-router";
import "react-native-reanimated";

import "@/global.css";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { Text, type TextProps } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

const NativeText = Text as typeof Text & { defaultProps?: TextProps };

NativeText.defaultProps = {
  ...NativeText.defaultProps,
  allowFontScaling: false,
};

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({
    Regular: require("../assets/fonts/regular.ttf"),
    Medium: require("../assets/fonts/medium.ttf"),
    Bold: require("../assets/fonts/bold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={DefaultTheme}>
        <SafeAreaProvider>
          <GestureHandlerRootView className="flex-1">
            <Stack
              screenOptions={{
                headerShown: false,
              }}
            >
              {/* Welcome/Landing Screen */}
              <Stack.Screen
                name="index"
                options={{
                  headerShown: false,
                }}
              />

              {/* Auth Group - login, signup, etc */}
              <Stack.Screen
                name="(auth)"
                options={{
                  headerShown: false,
                }}
              />

              {/* Main App Tabs - after login */}
              <Stack.Screen
                name="(tabs)"
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="(account)"
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="(membership)"
                options={{
                  title: "Membership Plan",
                  headerShown: true,
                  headerTitleAlign: "center",
                  headerBackTitle: "",
                }}
              />
              <Stack.Screen
                name="(profile)"
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="help-support"
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="search-matches"
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="search-results"
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="(notification)"
                options={{
                  title: "Notifications",
                  headerShown: true,
                  headerTitleAlign: "center",
                  headerBackTitle: "",
                }}
              />
            </Stack>
            {/* </SafeAreaView> */}
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
