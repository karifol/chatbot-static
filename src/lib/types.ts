// チャットメッセージ
export interface ChatMessage {
  message: string;
  user: "assistant" | "user" | "system" | "tool";
  loading?: boolean;
}

// チャットセッション
export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: number;
}
