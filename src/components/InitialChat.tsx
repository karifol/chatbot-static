import React from 'react'
import TitleLogo from './TitleLogo'
import ChatForm from './ChatForm'
import { ChatMessage } from '@/lib/types'
import ChatSuggest from './ChatSuggest';
import Header from './Header';

const InitialChat = (
  { messageList, setMessageList }:
  { messageList: ChatMessage[]; setMessageList: React.Dispatch<React.SetStateAction<ChatMessage[]>> }
) => {

  // サジェストクリック時のAPI呼び出し
  const handleSuggestClick = async (text: string) => {
    // ユーザーメッセージ追加
    setMessageList(prev => [...prev, { message: text, user: "user" }]);
    // API呼び出し
    const messages = [
      ...messageList.map(m => ({ role: m.user, content: m.message })),
      { role: "user", content: text }
    ];
    // 一時的にローディングメッセージ追加
    setMessageList(prev => [...prev, { message: "", user: "assistant", loading: true }]);
    let assistantMessage = "";
    const { callChatApiStream } = await import("@/lib/chatApi");
    await callChatApiStream(messages, (event) => {
      if (event.type === "token" || event.type === "final") {
        assistantMessage += event.content;
        setMessageList(prev => {
          // 最後のassistant(loading)を置き換え
          const updated = [...prev];
          updated[updated.length - 1] = { message: assistantMessage, user: "assistant", loading: false };
          return updated;
        });
      }
    });
  };

  return (
    <div className="h-screen w-full flex flex-col">
      <Header />
      <div className="relative h-full w-full flex justify-center items-center bg-white">
        <div className="w-150">
          <TitleLogo title="ChatBotTemplate" />
          <ChatForm
            messageList={messageList}
            setMessageList={setMessageList}
          />
          <ChatSuggest onSuggestClick={handleSuggestClick} />
        </div>
      </div>
    </div>
  )
}

export default InitialChat