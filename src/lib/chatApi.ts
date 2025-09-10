export type StreamEvent =
  | { type: "token"; content: string }
  | {
    tool_response: string;
    type: "tool_start";
    tool_name: string;
    tool_input: string;
    tool_id: string;
  }
  | {
    type: "tool_end";
    tool_name: string;
    tool_response: string;
    tool_id: string;
  }
  | { type: "final"; content: string }
  | { type: "end" };

// const CHATBOT_ENDPOINT = "https://qbevnlpi6m6clekmykiirqbngy0thisi.lambda-url.ap-northeast-1.on.aws/chat";
const CHATBOT_ENDPOINT = "http://localhost:8080/chat"; // for local test

/**
 * ストリーミングでチャットAPIを呼び出す
 * @param message ユーザーからの入力
 * @param onEvent サーバーから届いたイベントごとに呼ばれるコールバック
 */
export async function callChatApiStream(
  messages: { role: string; content: string }[],
  onEvent: (event: StreamEvent) => void
) {

  console.log("Calling chat API with messages:", messages);

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

  let buffer = ""; // 追加: 途中データを保持するバッファ

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    let lines = buffer.split("\n");

    // 最後の行が未完了の場合はバッファに残す
    buffer = lines.pop() ?? "";

    for (const line of lines) {
      if (line.startsWith("data: ")) {
        try {
          const data = JSON.parse(line.replace("data: ", ""));
          if (data.type === "tool_end") {
            console.log("Received event:", data);
          }
          onEvent(data);
        } catch (err) {
          console.error("JSON parse error:", err, line);
        }
      }
    }
  }
}
