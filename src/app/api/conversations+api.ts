import { ConversationResponse } from "../../../utils/types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const conversationId = searchParams.get("conversationId");

  if (!conversationId) {
    return new Response("Conversation Id is required", { status: 400 });
  }

  if (!process.env.ELEVENLABS_API_KEY) {
    return new Response("ElevenLabs API key is not configured", {
      status: 500,
    });
  }

  const response = await fetch(
    `https://api.elevenlabs.io/v1/conversations/${conversationId}`,
    {
      headers: {
        "xi-api-key": process.env.ELEVENLABS_API_KEY,
        "Content-Type": "application/json",
      },
    },
  );

  const conversation: ConversationResponse = await response.json();

  console.log("[SERVER] Conversation", conversation);

  return new Response(JSON.stringify({ conversation }), { status: 200 });
}
