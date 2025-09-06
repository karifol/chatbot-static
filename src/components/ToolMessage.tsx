const ToolMessage = ({ message }: { message: string }) => {
  return (
      <div className="flex justify-center my-2" >
        <div className="text-xs text-blue-600 bg-blue-50 px-3 py-1 rounded-md w-200">
          {message}
        </div>
      </div>
  )
}

export default ToolMessage