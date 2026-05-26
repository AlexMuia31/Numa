import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { ScrollView } from "react-native";
import { ConversationResponse } from "../../utils/types";
import { Gradient } from "../gradient";

export default function SummaryScreen() {
  const { conversationId } = useLocalSearchParams();
  const [conversation, setConversation] = useState<ConversationResponse>();

  console.log("converstionId", conversationId);
  return (
    <>
      {" "}
      <Gradient position="bottom" isSpeaking={false} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ paddingHorizontal: 16 }}
      ></ScrollView>
    </>
  );
}
