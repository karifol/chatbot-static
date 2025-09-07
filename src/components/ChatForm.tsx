'use client';
import { useState, useRef } from 'react';
import { Textarea } from "@/components/Textarea";
import { Button } from '@/components/ui/button';
import { LoaderCircle, Send } from 'lucide-react';
import { ChatMessage } from '@/lib/chatApi';
import { callChatApiStream } from '@/lib/chatApi';

const ChatForm = ({
  messageList,
  setMessageList
}: {
  messageList: ChatMessage[];
  setMessageList: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
}) => {
  const [input, setInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = async () => {
    if (isSubmitting) return;
    const message = input.trim();
    if (!message) return;

    setIsSubmitting(true);
    setInput("");
    // TextAreaの高さをリセット
    if (textareaRef.current) {
      textareaRef.current.rows = 1;
      textareaRef.current.style.height = ""; // 自動リサイズ対応の場合
    }

    // ユーザーメッセージ + 空のAIメッセージを追加
    setMessageList((prev) => [
      ...prev,
      { message, user: "user" },
      { message: "", user: "assistant" }
    ]);

    try {
      // 履歴を生成（system/toolは除外）
      const history = messageList
        .filter(m => m.user !== "system" && m.user !== "tool")
        .map(m => ({
          role: m.user === "user" ? "user" : "assistant",
          content: m.message
        }));

      await callChatApiStream(
        [...history, { role: "user", content: message }],
        (event) => {
          setMessageList((prev) => {
            const newList = [...prev];

            // 最後に追加された assistant を対象にする
            const aiIndex = [...newList].reverse().findIndex(
              (m) => m.user === "assistant"
            );
            const realIndex =
              aiIndex === -1 ? -1 : newList.length - 1 - aiIndex;
            if (realIndex < 0) return newList;

            switch (event.type) {
              case "token":
                newList[realIndex] = {
                  ...newList[realIndex],
                  message: newList[realIndex].message + event.content
                };
                break;

              case "tool_start":
                newList.splice(realIndex, 0, {
                  message: `ツール開始: ${event.tool}`,
                  user: "tool"
                });
                break;

              case "tool_end":
                newList.splice(realIndex, 0, {
                  message: `ツール終了: ${event.tool} → ${event.content}`,
                  user: "tool"
                });
                break;

              case "final":
                newList[realIndex] = {
                  message: event.content,
                  user: "assistant"
                };
                break;
            }

            return newList;
          });
        }
      );
    } catch (error) {
      console.error(error);
      setMessageList((prev) => [
        ...prev,
        { message: "⚠️ エラーが発生しました", user: "assistant" }
      ]);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-3 w-full min-h-20">
      <div className="flex justify-between items-center gap-2 rounded-4xl p-2 border border-gray-300 shadow-sm">
        <Textarea
          ref={textareaRef}
          placeholder="メッセージを入力して下さい..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isSubmitting}
          rows={1}
        />
        <Button
          type="button"
          className="flex items-center bg-gray-400 hover:bg-gray-500 h-[44px] min-h-[44px] px-4 hover:cursor-pointer rounded-full"
          style={{
            textShadow:
              "0 1px 4px rgba(0,0,0,0.25), 0 0px 1px rgba(0,0,0,0.15)"
          }}
          onClick={handleSend}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <Send size={16} />
          )}
        </Button>

      </div>
    </div>
  );
};

export default ChatForm;
