import { Ionicons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";

interface Option {
  id: string;
  val: string;
}

interface SearchableSelectorModalProps {
  visible: boolean;
  title: string;
  options: Option[];
  selectedValue?: string;
  onSelect: (option: Option) => void;
  onClose: () => void;
}

export const SearchableSelectorModal: React.FC<
  SearchableSelectorModalProps
> = ({ visible, title, options, selectedValue, onSelect, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter options based on user text search
  const filteredOptions = useMemo(() => {
    if (!searchQuery) return options;
    return options.filter((opt) =>
      opt.val.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [options, searchQuery]);

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View className="flex-1 bg-black/60 justify-end">
        <View className="bg-white rounded-t-3xl h-[75%] px-5 py-6">
          {/* Header */}
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold text-black">{title}</Text>
            <Pressable
              onPress={() => {
                setSearchQuery("");
                onClose();
              }}
            >
              <Ionicons name="close" size={24} color="black" />
            </Pressable>
          </View>

          {/* Search Box */}
          <View className="flex-row items-center bg-gray-100 rounded-xl px-3 py-2.5 mb-4 border border-gray-200">
            <Ionicons
              name="search"
              size={18}
              color="#9ca3af"
              style={{ marginRight: 8 }}
            />
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder={`Search ${title}...`}
              placeholderTextColor="#9ca3af"
              className="flex-1 text-black text-base py-0"
              autoCapitalize="none"
              autoCorrect={false}
            />
            {searchQuery.length > 0 && (
              <Pressable onPress={() => setSearchQuery("")}>
                <Ionicons name="close-circle" size={18} color="#9ca3af" />
              </Pressable>
            )}
          </View>

          {/* List */}
          <FlatList
            data={filteredOptions}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            renderItem={({ item }) => {
              const isSelected =
                selectedValue === item.id || selectedValue === item.val;
              return (
                <Pressable
                  onPress={() => {
                    onSelect(item);
                    setSearchQuery("");
                    onClose();
                  }}
                  className={`flex-row justify-between items-center py-3.5 border-b border-gray-100 ${
                    isSelected ? "bg-pink-50/40 rounded-lg px-2" : "px-2"
                  }`}
                >
                  <Text
                    className={`text-base ${
                      isSelected
                        ? "font-bold text-pink-600"
                        : "font-normal text-gray-800"
                    }`}
                  >
                    {item.val}
                  </Text>
                  {isSelected && (
                    <Ionicons name="checkmark" size={20} color="#db2777" />
                  )}
                </Pressable>
              );
            }}
            ListEmptyComponent={() => (
              <View className="items-center justify-center py-8">
                <Text className="text-gray-500 text-base">
                  No options found
                </Text>
              </View>
            )}
          />
        </View>
      </View>
    </Modal>
  );
};

export default SearchableSelectorModal;
