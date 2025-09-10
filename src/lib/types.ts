// チャットメッセージ
export interface ChatMessage {
  user: "assistant" | "user" | "system" | "tool_start" | "tool_end";
  message: string;
  loading?: boolean;
  tool_name: string;
  tool_input: string;
  tool_response: string;
  tool_id: string;
}

// チャットセッション
export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: number;
}
