import { SlNote } from "react-icons/sl";

const Sidebar = () => {

  return (
    <div className="space-y-4 p-5 h-screen flex flex-col bg-gray-100">
      {/* チャットを新規作成 */}
      <button
        className="space-y-1 flex items-center cursor-pointer hover:bg-gray-300 rounded p-2 border-0 bg-transparent text-sm"
        onClick={() => window.location.reload()}
        type="button"
      >
        <SlNote className="inline-block mr-2"/>
        チャットをリセット
      </button>

    </div>
  )
}

export default Sidebar