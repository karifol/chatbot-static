import ReactMarkdown from "react-markdown"
const AssistantMessage = ({ message }: { message: string }) => {
  return (
    <div className="flex items-start gap-2 my-2">
      <div className="markdown-body">
        <ReactMarkdown>{message}</ReactMarkdown>
      </div>
    </div>
  )
}

export default AssistantMessage