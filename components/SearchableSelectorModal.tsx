import { EditableFieldDescriptor } from "@/types/profile";
import { Feather, Ionicons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { EditableFieldRow } from "./EditableFieldRow";

type Option = {
  id: string;
  val: string;
};

type SearchableSelectorModalProps = {
  visible: boolean;
  title: string;
  options: Option[];
  selectedValue?: string | string[];
  onSelect: (option: Option | Option[]) => void;
  onClose: () => void;
  isMultiSelect?: boolean;
  editableTextFields?: EditableFieldDescriptor[];
  editableFieldsData: Record<string, string>;
  onEditableFieldChange: (key: string, text: string) => void;
  handleEditTextSave: () => void;
};

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
  editableTextFields,
  editableFieldsData,
  onEditableFieldChange,
  handleEditTextSave,
}) => {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState("");
  const [localSelected, setLocalSelected] = useState<string[]>(
    Array.isArray(selectedValue)
      ? selectedValue
      : selectedValue
        ? [selectedValue]
        : [],
  );

  const translateY = useSharedValue(900);

  const panelStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  React.useEffect(() => {
    if (visible) {
      translateY.value = 900;
      setLocalSelected(
        Array.isArray(selectedValue)
          ? selectedValue
          : selectedValue
            ? [selectedValue]
            : [],
      );
      const timer = setTimeout(() => {
        translateY.value = withTiming(0, {
          duration: 300,
          easing: Easing.bezier(0, 0, 0.58, 1),
        });
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [visible, selectedValue]);

  const doClose = () => {
    setSearchQuery("");
    onClose();
  };

  const animateClose = () => {
    translateY.value = withTiming(
      900,
      {
        duration: 250,
        easing: Easing.bezier(0.42, 0, 1, 1),
      },
      () => {
        runOnJS(doClose)();
      },
    );
  };

  const filteredOptions = useMemo(() => {
    if (!searchQuery) return options;
    return options.filter((opt) =>
      opt.val.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [options, searchQuery]);

  const handleSelectOption = (option: Option) => {
    if (isMultiSelect) {
      setLocalSelected((prev) =>
        prev.includes(option.id)
          ? prev.filter((id) => id !== option.id)
          : [...prev, option.id],
      );
    } else {
      onSelect(option);
      animateClose();
    }
  };

  const handleSave = () => {
    if (isMultiSelect) {
      const selectedOptions = options.filter((opt) =>
        localSelected.includes(opt.id),
      );
      onSelect(selectedOptions);
      animateClose();
    }
  };

  const handleReset = () => {
    setLocalSelected([]);
    setSearchQuery("");
  };

  const isSelected = (optionId: string) => localSelected.includes(optionId);
  const hasEditableFields = !!editableTextFields?.length;

  return (
    <Modal
      visible={visible}
      animationType="none"
      transparent
      statusBarTranslucent
    >
      <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}>
        <Animated.View
          style={[
            panelStyle,
            {
              flex: 1,
              marginTop: 100,
              backgroundColor: "white",
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              paddingBottom: insets.bottom,
            },
          ]}
        >
          {/* Header */}
          <View
            className="bg-white px-5 py-5 flex-row items-center border-b border-gray-200"
            style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
          >
            <Pressable
              onPress={animateClose}
              style={{ width: 24, alignItems: "center" }}
            >
              <Ionicons name="close" size={24} color="black" />
            </Pressable>
            <Text className="flex-1 text-lg font-bold text-black text-center">
              {title}
            </Text>
            <Pressable onPress={handleReset} className="p-1 -mr-1">
              <Text className="text-gray-500 text-sm font-medium">Clear</Text>
            </Pressable>
          </View>

          {hasEditableFields ? (
            <View className="bg-white border-t border-gray-200 px-5 py-4 gap-3 pb-6">
              {editableTextFields!.map((descriptor, index) => (
                <EditableFieldRow
                  key={descriptor.field}
                  descriptor={descriptor}
                  value={editableFieldsData[descriptor.field] ?? ""}
                  onChange={(text) =>
                    onEditableFieldChange(descriptor.field, text)
                  }
                  isLast={index === editableTextFields!.length - 1}
                />
              ))}
              <Pressable
                onPress={handleEditTextSave}
                className="py-3 bg-pink-600 rounded-full items-center active:bg-pink-700"
              >
                <Text className="text-white font-semibold text-base">Save</Text>
              </Pressable>
            </View>
          ) : (
            <View className="flex-1">
              {/* Search Box */}
              <View className="bg-white px-5 py-2 border-b border-gray-100">
                <View className="flex-row items-center bg-white py-1.5">
                  <View
                    style={{ width: 24, alignItems: "center", marginRight: 8 }}
                  >
                    <Feather name="search" size={18} color="#8B8B8B" />
                  </View>
                  <TextInput
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    placeholder={`Search ${title}...`}
                    placeholderTextColor="#8B8B8B"
                    className="flex-1 text-gray text-base py-0 font-regular"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  {searchQuery.length > 0 && (
                    <Pressable
                      onPress={() => setSearchQuery("")}
                      className="p-1"
                    >
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
                initialNumToRender={12}
                maxToRenderPerBatch={12}
                windowSize={5}
                renderItem={({ item }) => (
                  <Pressable
                    onPress={() => handleSelectOption(item)}
                    className="flex-row items-center px-5 py-5 border-b border-gray-100 bg-white active:bg-gray-50"
                  >
                    <View
                      style={{
                        width: 24,
                        alignItems: "center",
                        marginRight: 16,
                        marginTop: -1,
                      }}
                    >
                      {isMultiSelect ? (
                        <View
                          className={`w-6 h-6 rounded border-2 items-center justify-center ${
                            isSelected(item.id)
                              ? "bg-pink-600 border-pink-600"
                              : "border-gray bg-white"
                          }`}
                        >
                          {isSelected(item.id) && (
                            <Ionicons
                              name="checkmark"
                              size={16}
                              color="white"
                            />
                          )}
                        </View>
                      ) : (
                        <View
                          style={
                            isSelected(item.id)
                              ? {
                                  width: 20,
                                  height: 20,
                                  borderRadius: 10,
                                  borderWidth: 2,
                                  borderColor: "#db2777",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }
                              : {
                                  width: 20,
                                  height: 20,
                                  borderRadius: 10,
                                  borderWidth: 1,
                                  borderColor: "#000000",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }
                          }
                        >
                          {isSelected(item.id) && (
                            <View className="w-2.5 h-2.5 rounded-full bg-pink-600" />
                          )}
                        </View>
                      )}
                    </View>

                    <Text
                      className={`flex-1 text-lg ${isSelected(item.id) ? "font-bold text-pink-600" : "font-bold"}`}
                      style={
                        !isSelected(item.id) ? { color: "#000000" } : undefined
                      }
                    >
                      {item.val}
                    </Text>
                  </Pressable>
                )}
                ListEmptyComponent={() => (
                  <View className="flex-1 items-center justify-center">
                    <Ionicons name="search" size={48} color="#d1d5db" />
                    <Text className="text-gray-500 text-base mt-2 font-regular">
                      No options found
                    </Text>
                  </View>
                )}
              />

              {isMultiSelect && (
                <View className="bg-white border-t border-gray-200 px-5 py-4 gap-3 pb-6">
                  {/* <Pressable
                    onPress={handleReset}
                    className="py-3 bg-gray-100 rounded-full items-center active:bg-gray-200"
                  >
                    <Text className="text-gray-800 font-semibold text-base">
                      Reset
                    </Text>
                  </Pressable> */}
                  <Pressable
                    onPress={handleSave}
                    className="py-3 bg-pink-600 rounded-full items-center active:bg-pink-700"
                  >
                    <Text className="text-white font-semibold text-base">
                      Save
                    </Text>
                  </Pressable>
                </View>
              )}
            </View>
          )}
        </Animated.View>
      </View>
    </Modal>
  );
};

export default SearchableSelectorModal;
