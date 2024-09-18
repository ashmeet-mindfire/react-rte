/* eslint-disable no-unused-vars */

import { useRef, useState } from "react";
// import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import Quill from "quill";
import QuillEditor from "./components/QuillEditor";

const Delta = Quill.import("delta");

export default function Home() {
  const [value, setValue] = useState("");
  const [range, setRange] = useState();
  const [lastChange, setLastChange] = useState();
  const [readOnly, setReadOnly] = useState(false);

  const quillRef = useRef();

  return (
    <div className="p-20">
      <h1 className="text-6xl font-black tracking-tighter">ReactJS Editor</h1>

      <div className="mt-10 ">
        {/* <div className="w-full flex justify-end gap-4 mb-2">
          <button className="px-4 py-2 rounded bg-gray-100 cursor-pointer hover:bg-gray-200" onClick={doUndo}>
            <FaUndo />
          </button>
          <button className="px-4 py-2 rounded bg-gray-100 cursor-pointer hover:bg-gray-200" onClick={doRedo}>
            <FaRedo />
          </button>
        </div> */}
        {/* <ReactQuill
          className="border rounded min-h-[300px]"
          theme="bubble"
          value={value}
          onChange={setValue}
          placeholder="Write something here..."
        /> */}
        <div className="">
          <QuillEditor
            ref={quillRef}
            readOnly={readOnly}
            defaultValue={new Delta().insert("Type something here...").insert("\n", { header: 1 })}
            onSelectionChange={setRange}
            onTextChange={setLastChange}
          />
        </div>
      </div>
    </div>
  );
}
