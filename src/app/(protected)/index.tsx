import { useRouter } from "expo-router";
import React from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { sessions } from "../../../utils/sessions";

export default function Index() {
  const router = useRouter();

  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      className="flex-1"
      style={{ backgroundColor: "#dbeafe" }}
    >
      {/* Header */}
      <View className="px-6 pt-6 pb-4">
        <Text
          className="text-xs font-semibold tracking-widest uppercase mb-1"
          style={{ color: "#3b82f6" }}
        >
          Your Library
        </Text>
        <Text
          className="text-3xl font-bold tracking-tight"
          style={{ color: "#1e3a5f" }}
        >
          Sessions
        </Text>
      </View>

      {/* List */}
      <FlatList
        data={sessions}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingVertical: 12,
          gap: 12,
        }}
        renderItem={({ item, index }) => (
          <Pressable
            key={item.id}
            onPress={() =>
              router.navigate({
                pathname: "/session",
                params: { sessionId: item.id },
              })
            }
            className="backdrop-blur-sm"
            style={({ pressed }) => ({
              backgroundColor: pressed
                ? "rgba(255,255,255,0.55)"
                : "rgba(255,255,255,0.45)",
              borderRadius: 20,
              borderWidth: 1,
              borderColor: "rgba(255,255,255,0.75)",
              overflow: "hidden",
              shadowColor: "#93c5fd",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.25,
              shadowRadius: 12,
              elevation: 3,
            })}
          >
            <View style={{ padding: 20 }}>
              {/* Index + title row */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-start",
                  gap: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 11,
                    fontWeight: "700",
                    color: "rgba(59,130,246,0.5)",
                    marginTop: 2,
                    width: 22,
                    textAlign: "right",
                  }}
                >
                  {String(index + 1).padStart(2, "0")}
                </Text>
                <Text
                  style={{
                    flex: 1,
                    fontSize: 16,
                    fontWeight: "700",
                    color: "#1e3a5f",
                    lineHeight: 22,
                  }}
                  numberOfLines={2}
                >
                  {item.title}
                </Text>
              </View>

              {/* Description */}
              <Text
                style={{
                  fontSize: 13,
                  color: "rgba(30,58,95,0.6)",
                  marginTop: 6,
                  marginLeft: 32,
                  lineHeight: 19,
                }}
                numberOfLines={2}
              >
                {item.description}
              </Text>

              {/* Footer */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginTop: 12,
                }}
              >
                <View
                  style={{
                    backgroundColor: "rgba(59,130,246,0.12)",
                    paddingHorizontal: 12,
                    paddingVertical: 5,
                    borderRadius: 20,
                    borderWidth: 1,
                    borderColor: "rgba(59,130,246,0.2)",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "600",
                      color: "#3b82f6",
                      letterSpacing: 0.3,
                    }}
                  >
                    Open →
                  </Text>
                </View>
              </View>
            </View>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}
