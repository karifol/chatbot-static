import UserMessage from './UserMessage';
import AssistantMessage from './AssistantMessage';
import ToolMessage from './ToolMessage';
import SystemMessage from './SystemMessage';

interface ChatMessageProps {
  message: string;
  user: "assistant" | "user" | "system" | "tool";
}

const ChatMessage = ({ message, user }: ChatMessageProps) => {
  if (user === "user") {
    return <UserMessage message={message} />;
  }
  if (user === "assistant") {
    return <AssistantMessage message={message} />;
  }
  if (user === "tool") {
    return <ToolMessage message={message} />;
  }
  if (user === "system") {
    return <SystemMessage message={message} />;
  }
  return null;
};

export default ChatMessage;
