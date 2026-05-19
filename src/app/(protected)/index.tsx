import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SignOutButton from "../../../components/clerk/SignOutButton";

export default function Index() {
  return (
    <SafeAreaView>
      <Text>test</Text>
      <SignOutButton />
    </SafeAreaView>
  );
}
