'use client';
import ChatForm from "@/components/ChatForm";
import ChatMessage from "@/components/ChatMessage";
import InitialChat from "@/components/InitialChat";
import { useRef, useEffect } from "react";
import { ChatMessage as ChatMessageType } from "@/lib/types";
import Header from "./Header";

const Chat = (
  { messageList, setMessageList }:
  { messageList: ChatMessageType[]; setMessageList: React.Dispatch<React.SetStateAction<ChatMessageType[]>> }
) => {

  // スクロール用ref
  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [messageList]);

  return (
    messageList.length != 1 ? (
      <div className="h-screen w-full flex flex-col">
        <Header />
        <div className="relative h-full flex justify-center">
          {/* チャット内容エリア */}
          <div
            className="pb-20 p-4 overflow-auto h-[calc(100vh-5rem)] w-200"
            ref={messagesEndRef}
          >
            {/* チャットメッセージ一覧 */}
            {messageList.map((item, index) => (
              <ChatMessage key={index} message={item.message} user={item.user} />
            ))}
          </div>
          {/* フォームを下部中央に固定 */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-white w-200">
            <ChatForm
              messageList={messageList}
              setMessageList={setMessageList}
            />
          </div>
        </div>
      </div>

    ) : (
      <>
        <InitialChat
          messageList={messageList}
          setMessageList={setMessageList}
        />
      </>

    )
  );
};

export default Chat;
