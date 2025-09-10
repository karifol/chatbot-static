import { Button } from "./ui/button";
import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const ToolMessage = (
  {tool_name, tool_input, tool_response}:
  {tool_name: string; tool_input: string; tool_response: string}
) => {

  let parsedInput: any = tool_input;
  let parsedResponse: any = tool_response;
  try {
    parsedInput = JSON.parse(tool_input);
  } catch (e) {}
  try {
    parsedResponse = JSON.parse(tool_response);
  } catch (e) {}

  const [isOpen , setIsOpen] = useState(false);

  return (
    <div className="flex flex-col items-start my-2 bg-gray-100 p-2 rounded-md border">
      <div className="flex items-start w-full">
        <div className="text-xl font-bold mb-2">{tool_name}</div>
        { isOpen ? (
          <Button className="ml-auto" size="sm" variant="outline" onClick={() => setIsOpen(false)}>
            <IoIosArrowUp />
          </Button>
        ) : (
          <Button className="ml-auto" size="sm" variant="outline" onClick={() => setIsOpen(true)}>
            <IoIosArrowDown />
          </Button>
        )}
      </div>
      { isOpen ? (
        <>
          <div className="mb-2 w-full">
            <div className="text-sm font-semibold">リクエスト</div>
            <pre className="text-xs rounded-md p-2 w-full overflow-x-auto bg-white">
              {typeof parsedInput === 'object' ? JSON.stringify(parsedInput, null, 2) : parsedInput}
            </pre>
          </div>
          <div className="mb-2 w-full">
            <div className="text-sm font-semibold">レスポンス</div>
            <pre className="text-xs rounded-md p-2 w-full overflow-x-auto bg-white">
              {typeof parsedResponse === 'object' ? JSON.stringify(parsedResponse, null, 2) : parsedResponse}
            </pre>
          </div>
          </>
        ) : (
            <></>
        )
      }
    </div>
  );
};

export default ToolMessage;