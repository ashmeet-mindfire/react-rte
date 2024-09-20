/* eslint-disable react/prop-types */
import { forwardRef, useEffect, useLayoutEffect, useRef, useState } from "react";
import Quill from "quill";
import { MdDelete } from "react-icons/md";
import { QuillToolbarButton } from "../../DynamicQuillTools";

// Editor is an uncontrolled React component
const QuillEditor = forwardRef(({ readOnly, defaultValue, onTextChange, onSelectionChange }, ref) => {
  const containerRef = useRef(null);
  const defaultValueRef = useRef(defaultValue);
  const onTextChangeRef = useRef(onTextChange);
  const onSelectionChangeRef = useRef(onSelectionChange);
  const [comments, setComments] = useState([]);

  useLayoutEffect(() => {
    onTextChangeRef.current = onTextChange;
    onSelectionChangeRef.current = onSelectionChange;
  });

  useEffect(() => {
    ref.current?.enable(!readOnly);
  }, [ref, readOnly]);

  useEffect(() => {
    const container = containerRef.current;
    const editorContainer = container.appendChild(container.ownerDocument.createElement("div"));
    const quill = new Quill(editorContainer, {
      theme: "bubble",
      modules: {
        toolbar: ["bold", { list: "bullet" }],
      },
    });

    const undoButton = new QuillToolbarButton({
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-rotate-ccw"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>`,
    });
    undoButton.onClick = function (quill) {
      quill.history.undo();
    };
    undoButton.attach(quill);

    const redoButton = new QuillToolbarButton({
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-rotate-cw"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/></svg>`,
    });
    redoButton.onClick = function (quill) {
      quill.history.redo();
    };
    redoButton.attach(quill);

    const commentButton = new QuillToolbarButton({
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-square"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
    });
    commentButton.onClick = function (quill) {
      var prompt = window.prompt("Please enter Comment", "");
      var txt;
      if (prompt == null || prompt == "") {
        // eslint-disable-next-line no-unused-vars
        txt = "User cancelled the prompt.";
      } else {
        var range = quill.getSelection();
        if (range) {
          if (range.length == 0) {
            alert("Please select text", range.index);
          } else {
            var text = quill.getText(range.index, range.length);
            console.log("User has highlighted: ", text, range);
            setComments((prev) => [...prev, { range: range, comment: prompt }]);
            quill.formatText(range.index, range.length, {
              background: "#fff72b",
            });
          }
        } else {
          alert("User cursor is not in editor");
        }
      }
    };
    commentButton.attach(quill);

    ref.current = quill;

    if (defaultValueRef.current) {
      quill.setContents(defaultValueRef.current);
    }

    quill.on(Quill.events.TEXT_CHANGE, (...args) => {
      onTextChangeRef.current?.(...args);
    });

    quill.on(Quill.events.SELECTION_CHANGE, (...args) => {
      onSelectionChangeRef.current?.(...args);
    });

    return () => {
      ref.current = null;
      container.innerHTML = "";
    };
  }, [ref]);

  return (
    <div className="flex gap-4">
      <div
        className="flex-grow min-h-[300px] text-wrap text-xl max-w-[900px] rounded border bg-gray-900 text-white"
        ref={containerRef}
      ></div>
      <div className="w-[300px]">
        <h1 className="text-3xl font-semibold">Comments</h1>
        {comments.map((comment, idx) => (
          <div className="mt-2 flex justify-between items-center" key={idx}>
            <div
              onClick={() => ref.current.setSelection(comment.range.index, comment.range.length)}
              className="underline cursor-pointer"
            >
              {comment.comment}
            </div>
            <MdDelete
              className="cursor-pointer"
              size={25}
              onClick={(e) => {
                e.stopPropagation();
                ref.current.formatText(comment.range.index, comment.range.length, {
                  background: "#fff",
                });
                setComments((prev) => {
                  return prev.filter((prevComment) => prevComment.range.index !== comment.range.index);
                });
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
});

QuillEditor.displayName = "Editor";

export default QuillEditor;
