import { UpgradePlanSheet } from "@/components/messages/UpgradePlanSheet";
import { useConversation, useSendMessage } from "@/hooks/useMessages";
import { useSession } from "@/hooks/useSession";
import { SESSION_KEYS } from "@/types/common";
import { ChatMessageItem } from "@/types/message";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  View,
} from "react-native";
import { Text } from "@/components/ui/Text";
import { TextInput } from "@/components/ui/TextInput";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ChatScreen = () => {
  const insets = useSafeAreaInsets();
  const { other_matriId, name } = useLocalSearchParams<{
    other_matriId: string;
    name?: string;
  }>();
  const { data: sessionData } = useSession([SESSION_KEYS.MATRI_ID]);
  const myMatriId = sessionData?.[SESSION_KEYS.MATRI_ID] || "";

  const { data, isLoading } = useConversation(other_matriId ?? "");
  const sendMessage = useSendMessage(other_matriId ?? "");

  const [draft, setDraft] = useState("");

  const messages = data?.data ?? [];
  const oppositeUser = data?.opposite_user_data;
  const isOnline = oppositeUser?.logged_in === "1";

  const invertedMessages = [...messages].reverse();
  const [errorSheet, setErrorSheet] = useState<string | null>(null);

  const handleSend = () => {
    const trimmed = draft.trim();
    if (!trimmed) return;
    setDraft("");

    sendMessage.mutate(trimmed, {
      onSuccess: (response) => {
        if (response.status !== "success") {
          setErrorSheet(response.errmessage || "Please try again.");
        }
      },
      onError: () => {
        setErrorSheet("Please check your connection and try again.");
      },
    });
  };

  const renderMessage = ({ item }: { item: ChatMessageItem }) => {
    const isMine = item.sender === myMatriId;
    return (
      <View
        className={`px-4 py-2 my-1 mx-4 rounded-2xl max-w-[80%] ${
          isMine ? "bg-pink-600 self-end" : "bg-gray-100 self-start"
        }`}
      >
        <Text className={isMine ? "text-white" : "text-gray-900"}>
          {item.content}
        </Text>
        <Text
          className={`text-[10px] mt-1 ${isMine ? "text-pink-100" : "text-gray-400"}`}
        >
          {item.sent_on}
        </Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ paddingTop: insets.top }}
    >
      {/* Header */}
      <View className="flex-row items-center px-4 py-3 border-b border-gray-100">
        <Pressable onPress={() => router.back()} hitSlop={10} className="mr-3">
          <Ionicons name="chevron-back" size={24} color="#111827" />
        </Pressable>
        <View>
          <Text className="text-lg font-bold text-gray-900">
            {name ?? "Chat"}
          </Text>
          {isOnline && <Text className="text-xs text-green-600">Online</Text>}
        </View>
      </View>

      {/* Messages */}
      <FlatList
        data={invertedMessages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        inverted
        contentContainerStyle={{ paddingVertical: 12 }}
      />

      {/* Composer */}
      <View
        className="flex-row items-center px-4 py-3 border-t border-gray-100"
        style={{ paddingBottom: Math.max(insets.bottom, 12) }}
      >
        <TextInput
          value={draft}
          onChangeText={setDraft}
          placeholder="Type a message..."
          placeholderTextColor="#9ca3af"
          className="flex-1 bg-gray-100 rounded-full px-4 py-3 text-base"
          multiline
        />
        <Pressable
          onPress={handleSend}
          disabled={!draft.trim() || sendMessage.isPending}
          className="ml-3 w-11 h-11 rounded-full bg-pink-600 items-center justify-center active:opacity-80"
          style={{ opacity: !draft.trim() ? 0.5 : 1 }}
        >
          <Ionicons name="send" size={18} color="#fff" />
        </Pressable>
      </View>

      {/* Send error / plan upgrade bottom sheet */}
      <UpgradePlanSheet
        visible={!!errorSheet}
        message={errorSheet ?? ""}
        onClose={() => setErrorSheet(null)}
      />
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;
