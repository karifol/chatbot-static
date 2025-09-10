import ReactMarkdown from "react-markdown"
import ChatCopyButton from "@/components/ChatCopyButton";
import ChatEvaluateButton from "@/components/ChatEvaluateButton";
import { RiRobot3Line } from "react-icons/ri";
import { LoaderCircle } from "lucide-react";

const AssistantMessage = ({ message }: { message: string }) => {

  return (
    <div className="flex items-start gap-2 my-5">
      {/* アイコン */}
      <div className="w-15 h-15 rounded-full bg-white border-2 flex items-center justify-center mt-1">
        <RiRobot3Line className="text-3xl" />
      </div>
      {/* メッセージ */}
      <div className="markdown-body w-[calc(100%-5rem)]">
        {message === "" ? (
          <div className="flex items-center gap-2 py-4">
            <LoaderCircle className="animate-spin text-gray-400 mr-2" />
            <span className="text-gray-500 text-sm">AIの応答を待っています...</span>
          </div>
        ) : (
          <>
            <ReactMarkdown>{message}</ReactMarkdown>
            {/* 評価ボタン */}
            <div className="flex gap-2 mt-2">
              {/* コピー ボタン */}
              <ChatCopyButton message={message} />
              {/* いいね・よくないね ボタン */}
              <ChatEvaluateButton />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default AssistantMessage