import { useSession } from "@/hooks/useSession";
import { useRouter } from "expo-router";
import React from "react";
import { Button, View } from "react-native";

export default function membership() {
  const { logout } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.replace("/(auth)/login");
  };

  return (
    <View>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}
