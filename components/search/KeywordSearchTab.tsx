import { useIdKeywordSearch } from "@/hooks/useIdKeywordSearch";
import { Feather, Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function KeywordSearchTab() {
  const insets = useSafeAreaInsets();

  const footerHeight = 16 + 50 + Math.max(insets.bottom, 16);
  const [keyword, setKeyword] = useState("");
  const [withPhotoOnly, setWithPhotoOnly] = useState(false);
  const [keywordError, setKeywordError] = useState<string | undefined>();
  const { searchByKeyword } = useIdKeywordSearch();

  const handleSearch = () => {
    setKeywordError(undefined);

    if (keyword.trim()) {
      const { error } = searchByKeyword(keyword, withPhotoOnly);
      if (error) setKeywordError(error);
      return;
    }
  };
  const canSearch = keyword.trim().length > 0;

  return (
    <View style={{ flex: 1, minHeight: 0, position: "relative" }}>
      <View
        className="flex-1 px-5 pt-6"
        style={{ paddingBottom: footerHeight + 20 }}
      >
        <View className="flex-1 bg-white rounded-2xl px-8 justify-evenly">
          <View>
            <Text className="text-base font-regular text-gray leading-5">
              Search using a keyword — like a name, profession, or city — to
              find matching profiles.
            </Text>
            <View className="mt-8 flex-row items-center pb-3 border-b border-[#8B8B8B]">
              <Feather name="search" size={16} color="#8B8B8B" />
              <TextInput
                value={keyword}
                onChangeText={(text) => {
                  setKeyword(text);
                  setKeywordError(undefined);
                }}
                placeholder="Enter Keyword"
                placeholderTextColor="#8B8B8B"
                autoCapitalize="none"
                autoCorrect={false}
                style={{ flex: 1, padding: 0, marginLeft: 8 }}
                className={`text-base text-black ${
                  keyword ? "font-bold" : "font-regular"
                }`}
              />
            </View>
            {keywordError && (
              <Text className="text-red-500 text-xs mt-1">{keywordError}</Text>
            )}

            <Pressable
              onPress={() => setWithPhotoOnly((prev) => !prev)}
              className="flex-row items-center mt-3"
              hitSlop={8}
            >
              <View
                className={`w-5 h-5 rounded border items-center justify-center mr-2 ${
                  withPhotoOnly
                    ? "bg-pink-600 border-pink-600"
                    : "border-gray-400 bg-white"
                }`}
              >
                {withPhotoOnly && (
                  <Ionicons name="checkmark" size={14} color="white" />
                )}
              </View>
              <Text className="text-sm text-gray font-regular">
                With Photo Only
              </Text>
            </Pressable>
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
