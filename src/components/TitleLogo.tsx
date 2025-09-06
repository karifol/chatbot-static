import { RiRobot3Line } from "react-icons/ri";

const TitleLogo = ({title}: {title: string}) => {
  return (
    <div className="flex flex-col items-center">
      {/* アイコン */}
      <div className="w-20 h-20 rounded-full bg-white border flex items-center justify-center mb-2">
        <RiRobot3Line className="text-5xl" />
      </div>
      {/* タイトル */}
      <div className="text-2xl">
        { title }
      </div>
    </div>
  )
}

export default TitleLogo