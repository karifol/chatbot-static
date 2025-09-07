export type StreamEvent =
  | { type: "token"; content: string }
  | { type: "tool_start"; tool: string }
  | { type: "tool_end"; tool: string; content: string }
  | { type: "final"; content: string }
  | { type: "end" };

const CHATBOT_ENDPOINT = "https://haq2y7hcx64ds7762cgois2o7i0djbsp.lambda-url.ap-northeast-1.on.aws/chat";
// const CHATBOT_ENDPOINT = "http://localhost:8080/chat"; // for local test

/**
 * ストリーミングでチャットAPIを呼び出す
 * @param message ユーザーからの入力
 * @param onEvent サーバーから届いたイベントごとに呼ばれるコールバック
 */
export async function callChatApiStream(
  messages: { role: string; content: string }[],
  onEvent: (event: StreamEvent) => void
) {
  const response = await fetch(CHATBOT_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ messages }),
  });

  if (!response.body) {
    throw new Error("レスポンスに body がありません");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value, { stream: true });
    const lines = chunk.split("\n");

    for (const line of lines) {
      if (line.startsWith("data: ")) {
        try {
          const data = JSON.parse(line.replace("data: ", ""));
          onEvent(data);
        } catch (err) {
          console.error("JSON parse error:", err, line);
        }
      }
    }
  }
}
