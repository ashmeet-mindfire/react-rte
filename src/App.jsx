/* eslint-disable no-unused-vars */
import { useRef, useState } from "react";
import { GoDotFill } from "react-icons/go";
import "./App.css";
import { Popover } from "react-text-selection-popover";
import { css } from "@emotion/css";
import { FaChartLine } from "react-icons/fa";

export default function Home() {
  const [input, setInput] = useState("");
  const [textArr, setTextArr] = useState([]);
  const ref = useRef(null);

  const handleAdd = () => {
    setTextArr([...textArr, input]);
    setInput("");
  };

  return (
    <div className="w-full h-screen bg-gray-900 px-20 py-10 flex flex-col justify-between">
      <div>
        <h1 className="text-6xl text-white font-bold tracking-tighter mb-10">React Assignment</h1>
        <div ref={ref} className={`flex-grow pl-10 relative textContainer`}>
          {textArr.map((text, idx) => (
            <div key={idx} className="text-white text-lg flex gap-4">
              <span className="text-4xl text-green-500 -mt-2">•</span>
              {text}
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-4">
        <input
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAdd();
          }}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          value={input}
          className="bg-gray-800 text-white px-6 py-3 w-full rounded-full text-lg focus:outline-none"
        />
        <button onClick={handleAdd} className="bg-gray-800 text-white text-lg px-6 py-3 rounded-full font-semibold">
          Add
        </button>
      </div>
      <Popover
        target={ref.current}
        render={({ clientRect, isCollapsed, textContent }) => {
          if (clientRect == null || isCollapsed) return null;

          // I'm using emotion for this example but you can use anything really
          const style = css`
            position: absolute;
            left: ${clientRect.left + clientRect.width / 2}px;
            top: ${clientRect.top - 40}px;
            margin-left: -75px;
            background: #1f2937;
            font-size: 0.7em;
            text-align: center;
            color: white;
            border-radius: 3px;
            cursor: pointer;
          `;
          return (
            <div className={style} onClick={(e) => e.stopPropagation()}>
              <div className="p-4 cursor-pointer">
                <FaChartLine size={20} className="cursor-pointer" />
              </div>
            </div>
          );
        }}
      />
    </div>
  );
}
