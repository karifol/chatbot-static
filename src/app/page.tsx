'use client';
import Chat from "@/components/Chat";
import Sidebar from "@/components/Sidebar";
import { ChatMessage } from "@/lib/chatApi";
import { useState } from "react";

const ChatTypePage = () => {

  const [MessageList, setMessageList] = useState<ChatMessage[]>([
    {
      user: "system",
      message: "あなたは親切でフレンドリーなアシスタントです。"
    },
  ]);

  return (
    <div className="flex h-full w-full">
        <div className="hidden lg:w-1/5 lg:block">
          <Sidebar></Sidebar>
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