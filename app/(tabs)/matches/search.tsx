import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    FlatList,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

const FILTER_CHIPS = ["Age", "Height", "Religion", "Location", "Education"];

export default function SearchTab() {
  const [query, setQuery] = useState("");

  return (
    <View className="flex-1 bg-gray-50">
      {/* Search Bar */}
      <View className="px-4 pt-4 pb-3">
        <View className="flex-row items-center bg-white rounded-xl px-4 py-3 shadow-sm border border-gray-100">
          <Ionicons name="search-outline" size={18} color="#9ca3af" />
          <TextInput
            className="flex-1 ml-3 text-gray-900 text-sm"
            placeholder="Search by name, ID, location..."
            placeholderTextColor="#9ca3af"
            value={query}
            onChangeText={setQuery}
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery("")}>
              <Ionicons name="close-circle" size={18} color="#9ca3af" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Filter Chips */}
      <View className="px-4 mb-3">
        <FlatList
          horizontal
          data={FILTER_CHIPS}
          keyExtractor={(item) => item}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity className="flex-row items-center bg-white border border-gray-200 rounded-full px-4 py-1.5 mr-2 shadow-sm">
              <Text className="text-gray-600 text-xs font-medium">{item}</Text>
              <Ionicons
                name="chevron-down"
                size={12}
                color="#6b7280"
                style={{ marginLeft: 4 }}
              />
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Empty state */}
      <View className="flex-1 items-center justify-center px-6">
        <Ionicons name="search" size={56} color="#e5e7eb" />
        <Text className="text-gray-400 font-bold text-lg mt-4">
          Search Profiles
        </Text>
        <Text className="text-gray-400 text-sm text-center mt-2">
          Enter a name, Matri ID, or location
        </Text>
      </View>
    </View>
  );
}
