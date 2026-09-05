import { EditableFieldDescriptor } from "@/types/profile";
import { Feather, Ionicons } from "@expo/vector-icons";
import React, { useEffect, useMemo, useState } from "react";
import {
  FlatList,
  Keyboard,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  View,
} from "react-native";
import { Text } from "@/components/ui/Text";
import { TextInput } from "@/components/ui/TextInput";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { EditableFieldRow } from "./EditableFieldRow";

const MAX_SHEET_HEIGHT = "90%" as const;

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
  handleEditTextSave: (fieldsData: Record<string, string>) => void;
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

  const [draftFieldsData, setDraftFieldsData] = useState<
    Record<string, string>
  >({});

  const translateY = useSharedValue(900);

  // ── Keyboard height tracking ────────────────────────────────────────────
  // KeyboardAvoidingView alone is unreliable inside a Modal, especially on
  // Android (modals render in a separate native window and often don't get
  // automatic resize). Instead, we track the keyboard height directly and
  // shift the sheet upward by that amount via an animated style.
  const keyboardHeight = useSharedValue(0);

  useEffect(() => {
    const showEvent =
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const hideEvent =
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

    const showSub = Keyboard.addListener(showEvent, (e) => {
      keyboardHeight.value = withTiming(e.endCoordinates.height, {
        duration: Platform.OS === "ios" ? (e.duration ?? 250) : 200,
      });
    });
    const hideSub = Keyboard.addListener(hideEvent, () => {
      keyboardHeight.value = withTiming(0, { duration: 200 });
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const hasEditableFields = !!editableTextFields?.length;

  const panelStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { translateY: hasEditableFields ? -keyboardHeight.value : 0 },
    ],
  }));

  useEffect(() => {
    if (visible) {
      translateY.value = 900;
      setLocalSelected(
        Array.isArray(selectedValue)
          ? selectedValue
          : selectedValue
            ? [selectedValue]
            : [],
      );
      setDraftFieldsData(editableFieldsData);
      const timer = setTimeout(() => {
        translateY.value = withTiming(0, {
          duration: 300,
          easing: Easing.bezier(0, 0, 0.58, 1),
        });
      }, 50);
      return () => clearTimeout(timer);
    } else {
      keyboardHeight.value = 0;
    }
  }, [visible, selectedValue]);

  const doClose = () => {
    setSearchQuery("");
    onClose();
  };

  const animateClose = () => {
    Keyboard.dismiss();
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
    if (hasEditableFields) {
      setDraftFieldsData((prev) => {
        const next = { ...prev };
        editableTextFields!.forEach((d) => {
          if (d.type === "range" && d.fromField && d.toField) {
            next[d.fromField] = "";
            next[d.toField] = "";
          } else {
            next[d.field] = "";
          }
        });
        return next;
      });
    } else {
      setLocalSelected([]);
      setSearchQuery("");
    }
  };

  const onDraftFieldChange = (key: string, text: string) => {
    setDraftFieldsData((prev) => ({ ...prev, [key]: text }));
  };

  const handleEditableSave = () => {
    Keyboard.dismiss();
    handleEditTextSave(draftFieldsData);
  };

  const isSelected = (optionId: string) => localSelected.includes(optionId);

  return (
    <Modal
      visible={visible}
      animationType="none"
      transparent
      statusBarTranslucent
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: hasEditableFields ? "flex-end" : "flex-start",
          }}
        >
          <Animated.View
            style={[
              panelStyle,
              hasEditableFields
                ? {
                    maxHeight: MAX_SHEET_HEIGHT,
                    backgroundColor: "white",
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                  }
                : {
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
              className="bg-white px-5 py-5 flex-row items-center border-b border-light-divider-color"
              style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
            >
              <View style={{ width: 50, alignItems: "flex-start" }}>
                <Pressable onPress={handleReset} className="p-1 -ml-1">
                  <Text className="text-gray-500 text-base font-bold">
                    Clear
                  </Text>
                </Pressable>
              </View>
              <Text className="flex-1 text-2xl leading-none font-bold text-black text-center">
                {title}
              </Text>
              <View style={{ width: 50, alignItems: "flex-end" }}>
                <Pressable
                  onPress={animateClose}
                  style={{ width: 24, alignItems: "center" }}
                >
                  <Ionicons name="close" size={24} color="black" />
                </Pressable>
              </View>
            </View>

            {hasEditableFields ? (
              <View style={{ flexShrink: 1 }}>
                <ScrollView
                  bounces={false}
                  keyboardShouldPersistTaps="handled"
                  contentContainerStyle={{ paddingBottom: 8 }}
                >
                  <View className="bg-white px-5 py-4 gap-3">
                    {editableTextFields!.map((descriptor, index) => (
                      <EditableFieldRow
                        key={descriptor.field}
                        descriptor={descriptor}
                        value={draftFieldsData[descriptor.field] ?? ""}
                        onChange={(text) =>
                          onDraftFieldChange(descriptor.field, text)
                        }
                        isLast={index === editableTextFields!.length - 1}
                        editableFieldsData={draftFieldsData}
                        onEditableFieldChange={onDraftFieldChange}
                      />
                    ))}
                  </View>
                </ScrollView>

                <View
                  className="bg-white px-5 pt-4 border-t border-gray-100"
                  style={{ paddingBottom: Math.max(insets.bottom, 16) }}
                >
                  <Pressable
                    onPress={handleEditableSave}
                    className="py-4 bg-pink-600 rounded-full items-center active:bg-pink-700"
                  >
                    <Text className="text-white font-bold text-base">Save</Text>
                  </Pressable>
                </View>
              </View>
            ) : (
              <View className="flex-1">
                {/* Search Box */}
                <View className="bg-white px-5 py-6">
                  <View className="flex-row items-center bg-white">
                    <View
                      style={{
                        width: 24,
                        height: 24,
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: 12,
                      }}
                    >
                      <Feather name="search" size={18} color="#8B8B8B" />
                    </View>
                    <TextInput
                      value={searchQuery}
                      onChangeText={setSearchQuery}
                      placeholder="Search"
                      placeholderTextColor="#8B8B8B"
                      className="flex-1 text-gray text-base font-regular"
                      style={{ padding: 0, margin: 0 }}
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                    {searchQuery.length > 0 && (
                      <Pressable
                        onPress={() => setSearchQuery("")}
                        style={{
                          width: 24,
                          height: 24,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Ionicons
                          name="close-circle"
                          size={18}
                          color="#9ca3af"
                        />
                      </Pressable>
                    )}
                  </View>
                </View>
                <View className="mx-5 border-b border-[#EEEEEE]" />

                {/* Options List */}
                <FlatList
                  data={filteredOptions}
                  keyExtractor={(item) => item.id}
                  showsVerticalScrollIndicator={false}
                  keyboardShouldPersistTaps="handled"
                  className="flex-1 bg-white"
                  contentContainerStyle={{
                    paddingTop: 24,
                    paddingBottom: 24,
                  }}
                  initialNumToRender={12}
                  maxToRenderPerBatch={12}
                  windowSize={5}
                  renderItem={({ item }) => (
                    <Pressable
                      onPress={() => handleSelectOption(item)}
                      className="flex-row items-center px-5 py-6 bg-white active:bg-gray-50"
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
                            className={`w-5 h-5 rounded border items-center justify-center ${
                              isSelected(item.id)
                                ? "bg-pink-600 border-pink-600"
                                : "border-black bg-white"
                            }`}
                          >
                            {isSelected(item.id) && (
                              <Ionicons
                                name="checkmark"
                                size={14}
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
                                    borderWidth: 1,
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
                          !isSelected(item.id)
                            ? { color: "#000000" }
                            : undefined
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
                  <View className="bg-white px-5 py-4 gap-3 pb-6">
                    <Pressable
                      onPress={handleSave}
                      className="py-4 bg-pink-600 rounded-full items-center active:bg-pink-700"
                    >
                      <Text className="text-white font-bold text-base">
                        Save
                      </Text>
                    </Pressable>
                  </View>
                )}
              </View>
            )}
          </Animated.View>
        </View>
      </GestureHandlerRootView>
    </Modal>
  );
};

export default SearchableSelectorModal;
