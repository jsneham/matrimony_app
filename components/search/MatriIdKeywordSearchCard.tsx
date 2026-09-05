import { colors } from "@/constants/theme";
import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, View } from "react-native";
import { Text } from "@/components/ui/Text";
import { TextInput } from "@/components/ui/TextInput";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Shared by the "ID" and "Keyword" search tabs — same card, same two fields,
// until it's decided whether those tabs get merged into one.
export default function MatriIdKeywordSearchCard() {
  const insets = useSafeAreaInsets();
  // Footer is position:absolute, so it doesn't reserve space in the column's
  // own flex layout — this is its real rendered height (pt-4 + button + its
  // own bottom safe-area padding), used to reserve matching space above it.
  const footerHeight = 16 + 50 + Math.max(insets.bottom, 16);
  const [matriId, setMatriId] = useState("");
  const [keyword, setKeyword] = useState("");

  const handleSearch = () => {
    // TODO: wire to the real search endpoint(s) once confirmed
    console.log("Search by Matri ID / Keyword:", { matriId, keyword });
  };

  const canSearch = matriId.trim().length > 0 || keyword.trim().length > 0;

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
            <View className="mt-8 flex-row items-center pb-3 border-b border-gray">
              <Feather name="search" size={16} color={colors.gray} />
              <TextInput
                value={matriId}
                onChangeText={setMatriId}
                placeholder="Enter Matrimony ID"
                placeholderTextColor={colors.gray}
                autoCapitalize="characters"
                autoCorrect={false}
                style={{ flex: 1, padding: 0, marginLeft: 8 }}
                className={`text-base text-black ${
                  matriId ? "font-bold" : "font-regular"
                }`}
              />
            </View>
          </View>

          <Text className="text-left text-xs font-bold text-gray">OR</Text>

          <View>
            <Text className="text-base font-regular text-gray leading-5">
              Search using a keyword — like a name, profession, or city — to
              find matching profiles.
            </Text>
            <View className="mt-8 flex-row items-center pb-3 border-b border-gray">
              <Feather name="search" size={16} color={colors.gray} />
              <TextInput
                value={keyword}
                onChangeText={setKeyword}
                placeholder="Enter Keyword"
                placeholderTextColor={colors.gray}
                autoCapitalize="none"
                autoCorrect={false}
                style={{ flex: 1, padding: 0, marginLeft: 8 }}
                className={`text-base text-black ${
                  keyword ? "font-bold" : "font-regular"
                }`}
              />
            </View>
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
