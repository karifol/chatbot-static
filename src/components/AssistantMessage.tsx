import ReactMarkdown from "react-markdown"
import ChatCopyButton from "@/components/ChatCopyButton";
import ChatEvaluateButton from "@/components/ChatEvaluateButton";

const AssistantMessage = ({ message }: { message: string }) => {

  return (
    <div className="flex items-start gap-2 my-2">
      <div className="markdown-body">
        <ReactMarkdown>{message}</ReactMarkdown>
        {/* 評価ボタン */}
        <div className="flex gap-2 mt-2">
          {/* コピー ボタン */}
          <ChatCopyButton message={message} />
          {/* いいね・よくないね ボタン */}
          <ChatEvaluateButton />
        </div>
      </div>
    </div>
  )
}

export default AssistantMessage