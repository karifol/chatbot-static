'use client';
import Chat from "@/components/Chat";
import Sidebar from "@/components/Sidebar";
import { ChatMessage, ChatRawMessage } from "@/lib/types";
import { useState, useEffect } from "react";

const ChatTypePage = () => {
  const now = Date.now();
  const nowStr = new Date(now).toLocaleString();

  // メッセージリスト
  // この内容がページに表示される
  const [MessageList, setMessageList] = useState<ChatMessage[]>([
    {
      user: "system",
      message: `あなたは有能なアシスタントです。現在の日時は ${nowStr} です。WxTech5kmMeshGlobalWeatherForecastはTool start: {'input': {'latlon': '-33.4489/-70.6693'}}の形で使える。あなたはチャートを説明するアシスタントです。グラフを表示するときは generate_chart ツールを呼び出してください。- グラフのイメージをテキストや記号で描こうとしないでください。- ツール呼び出しの後は、自然言語で結果の説明だけを出力してください。グラフの線は基本は赤色で。画像をレンダリングしないで。国内は1kmメッシュ、国外は5kmメッシュを使うこと。`,
      tool_name: "",
      tool_input: "",
      tool_response: "",
      tool_id: ""
    },
  ]);

  // メッセージリストの元
  // ユーザーからチャットが送信されたらここに追加し、メッセージリストを更新する
  const [rawMessage, setRawMessage] = useState<ChatRawMessage>({
    type: "",
    content: ""
  });

  // APIからのメッセージを受け取り、MessageListを更新する
  useEffect(() => {

    // console.log("Received rawMessage:", rawMessage);
    // ----------------------------
    // AIからのメッセージ
    // ----------------------------
    if (rawMessage.type === "token"){
      // rawMessageが最初のAIからのメッセージならケツに追加する
      // 判断基準はmassgeeListの最後のメッセージがuserかどうか
      let isStart = true;
      const lastMessage = MessageList[MessageList.length - 1];
      if (lastMessage.user === "assistant") {
        isStart = false;
      }

      // 最初のメッセージならケツに箱を用意する
      if (isStart) {
        setMessageList(prev => [
          ...prev,
          {
            user: "assistant",
            message: rawMessage.content,
            tool_name: "",
            tool_input: "",
            tool_response: "",
            tool_id: ""
          }
        ]);
      }
      // 最初のメッセージでなければケツのメッセージを更新する
      else {
        setMessageList(prev => {
          const newList = [...prev];
          const lastIndex = newList.length - 1;
          const lastMessage = newList[lastIndex];
          newList[lastIndex] = {
            ...lastMessage,
            message: lastMessage.message + rawMessage.content
          };
          return newList;
        });
      }
    }

    // ----------------------------
    // ツール開始
    // ----------------------------
    else if (rawMessage.type === "tool_start") {
      setMessageList(prev => [
        ...prev,
        {
          user: "tool_start",
          message: `ツール ${rawMessage.tool_name} を実行中...`,
          tool_name: rawMessage.tool_name || "",
          tool_input: rawMessage.tool_input || "",
          tool_response: "",
          tool_id: rawMessage.tool_id || ""
        }
      ]);
    }

    // ----------------------------
    // ツール終了
    // ----------------------------
    else if (rawMessage.type === "tool_end") {
      setMessageList(prev => {
        const newList = [...prev];
        // 同じtool_idをもつtool_startを探す
        for (let i = newList.length - 1; i >= 0; i--) {
          if (newList[i].user === "tool_start" && newList[i].tool_id === rawMessage.tool_id) {
            // 見つかったらそのメッセージを更新する
            newList[i] = {
              ...newList[i],
              tool_response: rawMessage.tool_response || ""
            };
            break;
          }
        }
        return newList;
      });
    }

  }, [rawMessage]);

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
              setRawMessage={setRawMessage}
            />
          </div>
        </main>
    </div>

  )
}

export default ChatTypePage