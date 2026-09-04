import { useIdKeywordSearch } from "@/hooks/useIdKeywordSearch";
import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, View } from "react-native";
import { Text } from "@/components/ui/Text";
import { TextInput } from "@/components/ui/TextInput";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function IdSearchTab() {
  const insets = useSafeAreaInsets();
  const footerHeight = 16 + 50 + Math.max(insets.bottom, 16);
  const [matriId, setMatriId] = useState("");
  const [matriIdError, setMatriIdError] = useState<string | undefined>();

  const { searchById } = useIdKeywordSearch();

  const handleSearch = () => {
    setMatriIdError(undefined);

    if (matriId.trim()) {
      const { error } = searchById(matriId);
      if (error) setMatriIdError(error);
      return;
    }
  };

  const canSearch = matriId.trim().length > 0;

  return (
    <View style={{ flex: 1, minHeight: 0, position: "relative" }}>
      <View
        className="flex-1 px-5 pt-6"
        style={{ paddingBottom: footerHeight + 20 }}
      >
        <View className="flex-1 bg-white rounded-2xl px-8 justify-evenly">
          <View>
            <Text className="text-base font-regular text-gray leading-5">
              Know the Matrimony ID shared with you? Enter it below to go
              straight to that member's profile.
            </Text>
            <View className="mt-8 flex-row items-center pb-3 border-b border-[#8B8B8B]">
              <Feather name="search" size={16} color="#8B8B8B" />
              <TextInput
                value={matriId}
                onChangeText={(text) => {
                  setMatriId(text);
                  setMatriIdError(undefined);
                }}
                placeholder="Enter Matrimony ID"
                placeholderTextColor="#8B8B8B"
                autoCapitalize="characters"
                autoCorrect={false}
                style={{ flex: 1, padding: 0, marginLeft: 8 }}
                className={`text-base text-black ${
                  matriId ? "font-bold" : "font-regular"
                }`}
              />
            </View>
            {matriIdError && (
              <Text className="text-red-500 text-xs mt-1">{matriIdError}</Text>
            )}
          </View>
        </View>
      </View>

      {/* Footer */}
      <View
        className="bg-white px-5 pt-4"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          paddingBottom: Math.max(insets.bottom, 16),
        }}
      >
        <Pressable
          onPress={handleSearch}
          disabled={!canSearch}
          className={`py-4 rounded-full items-center ${
            canSearch ? "bg-pink-600 active:bg-pink-700" : "bg-gray-300"
          }`}
        >
          <Text className="text-white font-bold text-base">Search</Text>
        </Pressable>
      </View>
    </View>
  );
}
