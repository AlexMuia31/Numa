import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { ConversationResponse } from "../../utils/types";
import { Gradient } from "../gradient";

export default function SummaryScreen() {
  const { conversationId } = useLocalSearchParams();
  const [conversation, setConversation] = useState<ConversationResponse>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getSummary();
  }, []);

  async function getSummary() {
    if (loading) return;
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_BASE_URL}/api/conversations?conversationId=${conversationId}`,
      );
      const data: { conversation: ConversationResponse } =
        await response.json();
      setConversation(data.conversation);
    } catch (error) {
      console.error("Failed to fetch summary:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Gradient position="bottom" isSpeaking={false} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        className="flex-1 bg-white dark:bg-gray-900"
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 20 }}
      >
        {!conversation ? (
          // Loading state
          <View className="flex-1 items-center justify-center mt-20">
            <ActivityIndicator size="large" color="#3b82f6" />
            <Text className="text-lg text-gray-600 dark:text-gray-400 mt-4">
              Loading conversation...
            </Text>
          </View>
        ) : conversation.status !== "done" ? (
          // Processing state
          <View className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
            <Text className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              We are processing your call...
            </Text>
            <Text className="text-base text-gray-700 dark:text-gray-300 mb-4">
              This may take a few minutes depending on the length of the call
              and the current load on our servers. We will notify you once the
              summary is ready.
            </Text>
            <View className="bg-white dark:bg-gray-800 rounded-lg p-3 mb-4 flex-row justify-between items-center">
              <Text className="text-gray-600 dark:text-gray-400 font-medium">
                Current status:
              </Text>
              <Text className="text-blue-600 dark:text-blue-400 font-semibold capitalize">
                {conversation.status}
              </Text>
            </View>
            <Pressable
              onPress={getSummary}
              disabled={loading}
              className={`bg-blue-500 py-3 rounded-lg items-center ${
                loading ? "opacity-50" : ""
              }`}
            >
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text className="text-white font-semibold text-base">
                  Refresh
                </Text>
              )}
            </Pressable>
          </View>
        ) : (
          // Summary ready state
          <View className="space-y-4">
            {/* Title */}
            <Text className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
              {conversation.analysis.call_summary_title}
            </Text>

            {/* Summary text */}
            <View className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
              <Text className="text-gray-800 dark:text-gray-200 text-base leading-6">
                {conversation.analysis.transcript_summary}
              </Text>
            </View>

            {/* Metadata cards */}
            <View className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
              <Text className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
                Call Details
              </Text>
              <View className="space-y-2">
                <DetailRow
                  label="Duration"
                  value={`${Math.round(conversation.metadata.call_duration_secs / 60)} minutes`}
                />
                <DetailRow
                  label="Cost"
                  value={`$${conversation.metadata.cost.toFixed(4)}`}
                />
                <DetailRow
                  label="Call successful"
                  value={
                    conversation.analysis.call_successful === "success"
                      ? "Yes"
                      : "No"
                  }
                  valueClassName={
                    conversation.analysis.call_successful === "success"
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }
                />
              </View>
            </View>

            {/* Optional refresh button */}
            <Pressable
              onPress={getSummary}
              disabled={loading}
              className="bg-blue-500 py-3 rounded-lg items-center mt-2"
            >
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text className="text-white font-semibold text-base">
                  Refresh
                </Text>
              )}
            </Pressable>
          </View>
        )}
      </ScrollView>
    </>
  );
}

// Helper component for consistent detail rows
function DetailRow({
  label,
  value,
  valueClassName = "text-gray-900 dark:text-white",
}: {
  label: string;
  value: string;
  valueClassName?: string;
}) {
  return (
    <View className="flex-row justify-between items-center py-1">
      <Text className="text-gray-600 dark:text-gray-400 text-base">
        {label}
      </Text>
      <Text className={`font-medium text-base ${valueClassName}`}>{value}</Text>
    </View>
  );
}
