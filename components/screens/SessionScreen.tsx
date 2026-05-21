import { useUser } from "@clerk/clerk-expo";
import { useConversation } from "@elevenlabs/react-native";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SessionScreen() {
  const { user } = useUser();
  const [isConnected, setIsConnected] = useState(false);

  const conversation = useConversation({
    onConnect: () => {
      console.log("Connected to conversation");
      setIsConnected(true);
    },
    onDisconnect: () => {
      console.log("Disconnected from conversation");
      setIsConnected(false);
    },
    onMessage: (message) => {
      console.log("Message received:", message);
    },
    onError: (error) => {
      console.error("Conversation error:", error);
    },
  });

  const startConversation = async () => {
    try {
      await conversation.startSession({
        agentId: process.env.EXPO_PUBLIC_AGENT_ID,
        dynamicVariables: {
          user_name: user?.username ?? "Alex",
          session_title: "test",
          session_description: "test",
        },
      });
    } catch (error) {
      console.error("Failed to start conversation:", error);
    }
  };

  const endConversation = async () => {
    try {
      await conversation.endSession();
    } catch (error) {
      console.error("Failed to end conversation:", error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1 justify-center items-center px-4">
        <TouchableOpacity
          onPress={isConnected ? endConversation : startConversation}
          activeOpacity={0.8}
          className={`
            w-full max-w-sm py-4 rounded-2xl shadow-lg
            ${
              isConnected
                ? "bg-red-500 active:bg-red-600"
                : "bg-indigo-600 active:bg-indigo-700"
            }
          `}
        >
          <Text className="text-white text-center text-lg font-semibold">
            {isConnected ? "End Conversation" : "Start Conversation"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
