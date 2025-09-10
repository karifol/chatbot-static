'use client';
import Chat from "@/components/Chat";
import Sidebar from "@/components/Sidebar";
import { ChatMessage } from "@/lib/types";
import { useState } from "react";

const ChatTypePage = () => {
  const now = Date.now();
  const nowStr = new Date(now).toLocaleString();
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