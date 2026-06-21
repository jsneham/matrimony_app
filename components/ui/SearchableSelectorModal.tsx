import { Ionicons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  SafeAreaView,
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
  selectedValue?: string | string[]; // Support both single and multi
  onSelect: (option: Option | Option[]) => void;
  onClose: () => void;
  isMultiSelect?: boolean; // Toggle single vs multi-select
}

export const SearchableSelectorModal: React.FC<
  SearchableSelectorModalProps
> = ({
  visible,
  title,
  options,
  selectedValue,
  onSelect,
  onClose,
  isMultiSelect = false,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [localSelected, setLocalSelected] = useState<string[]>(
    Array.isArray(selectedValue)
      ? selectedValue
      : selectedValue
        ? [selectedValue]
        : [],
  );

  // Update local state when modal opens with new selectedValue
  React.useEffect(() => {
    if (visible) {
      setLocalSelected(
        Array.isArray(selectedValue)
          ? selectedValue
          : selectedValue
            ? [selectedValue]
            : [],
      );
    }
  }, [visible, selectedValue]);

  // Filter options based on search
  const filteredOptions = useMemo(() => {
    if (!searchQuery) return options;
    return options.filter((opt) =>
      opt.val.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [options, searchQuery]);

  const handleSelectOption = (option: Option) => {
    if (isMultiSelect) {
      // Multi-select: toggle in local state
      setLocalSelected((prev) =>
        prev.includes(option.id)
          ? prev.filter((id) => id !== option.id)
          : [...prev, option.id],
      );
    } else {
      // Single-select: immediately save and close
      setSearchQuery("");
      onSelect(option);
      onClose();
    }
  };

  const handleSave = () => {
    if (isMultiSelect) {
      const selectedOptions = options.filter((opt) =>
        localSelected.includes(opt.id),
      );
      onSelect(selectedOptions);
      setSearchQuery("");
      onClose();
    }
  };

  const handleReset = () => {
    setLocalSelected([]);
    setSearchQuery("");
  };

  const isSelected = (optionId: string) => localSelected.includes(optionId);

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <SafeAreaView className="flex-1 bg-black/50">
        {/* Header with Title and Close button */}
        <View className="bg-white px-5 py-4 flex-row justify-between items-center border-b border-gray-200">
          <Text className="text-lg font-bold text-black flex-1">{title}</Text>
          <Pressable
            onPress={() => {
              setSearchQuery("");
              onClose();
            }}
            className="p-2 -mr-2"
          >
            <Ionicons name="close" size={24} color="black" />
          </Pressable>
        </View>

        {/* Search Box */}
        <View className="bg-white px-5 py-3 border-b border-gray-100">
          <View className="flex-row items-center bg-gray-100 rounded-xl px-3 py-2.5 border border-gray-200">
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
              <Pressable onPress={() => setSearchQuery("")} className="p-1">
                <Ionicons name="close-circle" size={18} color="#9ca3af" />
              </Pressable>
            )}
          </View>
        </View>

        {/* Options List */}
        <FlatList
          data={filteredOptions}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          className="flex-1 bg-white"
          renderItem={({ item }) => (
            <Pressable
              onPress={() => handleSelectOption(item)}
              className="flex-row items-center px-5 py-4 border-b border-gray-100 bg-white active:bg-gray-50"
            >
              {/* Radio or Checkbox */}
              <View className="mr-4">
                {isMultiSelect ? (
                  // Checkbox
                  <View
                    className={`w-6 h-6 rounded border-2 items-center justify-center ${
                      isSelected(item.id)
                        ? "bg-pink-600 border-pink-600"
                        : "border-gray-300 bg-white"
                    }`}
                  >
                    {isSelected(item.id) && (
                      <Ionicons name="checkmark" size={16} color="white" />
                    )}
                  </View>
                ) : (
                  // Radio Button
                  <View
                    className={`w-6 h-6 rounded-full border-2 items-center justify-center ${
                      isSelected(item.id)
                        ? "border-pink-600"
                        : "border-gray-300"
                    }`}
                  >
                    {isSelected(item.id) && (
                      <View className="w-3 h-3 rounded-full bg-pink-600" />
                    )}
                  </View>
                )}
              </View>

              {/* Label */}
              <Text
                className={`flex-1 text-base ${
                  isSelected(item.id)
                    ? "font-bold text-pink-600"
                    : "font-normal text-gray-800"
                }`}
              >
                {item.val}
              </Text>
            </Pressable>
          )}
          ListEmptyComponent={() => (
            <View className="flex-1 items-center justify-center">
              <Ionicons name="search" size={48} color="#d1d5db" />
              <Text className="text-gray-500 text-base mt-2">
                No options found
              </Text>
            </View>
          )}
        />

        {/* Footer - Multi-select only */}
        {isMultiSelect && (
          <View className="bg-white border-t border-gray-200 px-5 py-4 gap-3 pb-6">
            <Pressable
              onPress={handleReset}
              className="py-3 bg-gray-100 rounded-full items-center active:bg-gray-200"
            >
              <Text className="text-gray-800 font-semibold text-base">
                Reset
              </Text>
            </Pressable>
            <Pressable
              onPress={handleSave}
              className="py-3 bg-pink-600 rounded-full items-center active:bg-pink-700"
            >
              <Text className="text-white font-semibold text-base">Save</Text>
            </Pressable>
          </View>
        )}
      </SafeAreaView>
    </Modal>
  );
};

export default SearchableSelectorModal;
