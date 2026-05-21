import { useUser } from "@clerk/clerk-expo";
import { useConversation } from "@elevenlabs/react-native";
import { Redirect, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { sessions } from "../../utils/sessions";
import { Gradient } from "../gradient";

export default function SessionScreen() {
  const { user } = useUser();
  const { sessionId } = useLocalSearchParams();
  const [isConnected, setIsConnected] = useState(false);

  const session =
    sessions.find((s) => s.id === Number(sessionId)) ?? sessions[0];

  if (!sessionId) {
    return <Redirect href={"/"} />;
  }

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
          session_title: session.title,
          session_description: session.description,
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
    <>
      <Gradient
        position={isConnected ? "center" : "top"}
        isSpeaking={isConnected}
      />
      <SafeAreaView className="flex-1">
        <ScrollView
          contentContainerClassName="flex-grow justify-center items-center px-4 py-8"
          showsVerticalScrollIndicator={false}
        >
          <View className="w-full max-w-md bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg mb-8">
            <Text className="text-3xl font-bold text-center text-indigo-800 mb-4">
              {session.title}
            </Text>
            <Text className="text-base text-center text-gray-600 leading-6">
              {session.description}
            </Text>
          </View>

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
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
