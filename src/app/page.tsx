'use client';
import Chat from "@/components/Chat";
import Sidebar from "@/components/Sidebar";
import { ChatMessage, ChatSession } from "@/lib/types";
import { useEffect, useState } from "react";

const ChatTypePage = () => {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [MessageList, setMessageList] = useState<ChatMessage[]>([
    {
      user: "system",
      message: "あなたは、有能なアシスタントです。"
    },
  ]);

    // 起動時に localStorage から復元
  useEffect(() => {
    const saved = localStorage.getItem("chat_sessions");
    if (saved) {
      const parsed = JSON.parse(saved) as ChatSession[];
      setSessions(parsed);
      if (parsed.length > 0) {
        setCurrentId(parsed[0].id);
      }
    }
  }, []);

  // セッション保存
  useEffect(() => {
    localStorage.setItem("chat_sessions", JSON.stringify(sessions));
  }, [sessions]);

  // 新規セッション作成
  const createNewSession = () => {
    const newSession: ChatSession = {
      id: crypto.randomUUID(),
      title: "New Chat",
      messages: [],
      createdAt: Date.now(),
    };
    setSessions((prev) => [...prev, newSession]);
    setCurrentId(newSession.id);
  };

   // メッセージ追加
  const addMessage = (sessionId: string, msg: ChatMessage) => {
    setSessions((prev) =>
      prev.map((s) =>
        s.id === sessionId
          ? { ...s, messages: [...s.messages, msg], title: s.title || msg.message.slice(0, 10) }
          : s
      )
    );
  };

  const currentSession = sessions.find((s) => s.id === currentId);

  return (
    <div className="flex h-full w-full">
        <div className="hidden lg:w-1/5 lg:block">
          <Sidebar/>
        </div>
        <main className="bg-white w-full lg:w-4/5">
          <div className="flex flex-col h-full w-full">
            <Chat
              messageList={MessageList}
              setMessageList={setMessageList}
            />
          </div>
        </main>
    </div>

  )
}

export default ChatTypePage