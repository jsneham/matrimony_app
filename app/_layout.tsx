import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { SplashScreen, Stack } from "expo-router";
import "react-native-reanimated";

import "@/global.css";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

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
        <GestureHandlerRootView style={{ flex: 1 }}>
          {/* <SafeAreaView className="flex-1 bg-white"> */}
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
                title: "Account & More",
                headerShown: true,
                headerTitleAlign: "center",
                headerShadowVisible: false,
              }}
            />
            <Stack.Screen
              name="(membership)"
              options={{
                title: "Membership Plan",
                headerShown: true,
                headerTitleAlign: "center",
              }}
            />
            <Stack.Screen
              name="(profile)"
              options={{
                title: "Profile",
                headerShown: true,
                headerTitleAlign: "left",
                headerTitleStyle: {
                  fontSize: 24,
                  fontFamily: "bold",
                },
                headerShadowVisible: false,
              }}
            />
            <Stack.Screen
              name="help-support"
              options={{
                title: "Help & Support",
                headerShown: true,
                headerTitleAlign: "center",
                headerShadowVisible: false,
              }}
            />
          </Stack>
          {/* </SafeAreaView> */}
        </GestureHandlerRootView>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
