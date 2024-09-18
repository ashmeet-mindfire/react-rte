// import React, { useEffect, useRef } from "react";
// import EditorJS from "@editorjs/editorjs";
// import Header from "@editorjs/header";
// import Comment from "editorjs-comment";
// import RenderItem from "./RenderItem";

// const DEFAULT_INITIAL_DATA = {
//   time: new Date().getTime(),
//   blocks: [
//     {
//       type: "header",
//       data: {
//         text: "This is my awesome editor!",
//         level: 1,
//       },
//     },
//   ],
// };

// const EditorComponent = () => {
//   const ejInstance = useRef();

//   const initEditor = () => {
//     const editor = new EditorJS({
//       holder: "editorjs",
//       onReady: () => {
//         ejInstance.current = editor;
//       },
//       autofocus: true,
//       data: DEFAULT_INITIAL_DATA,
//       onChange: async () => {
//         let content = await editor.saver.save();

//         console.log(content);
//       },
//       tools: {
//         header: {
//           class: Header,
//           inlineToolbar: true,
//         },
//         comment: {
//           class: Comment,
//           inlineToolbar: true,

//           config: {
//             markerColor: "",
//             activeColor: "pink",
//             renderBody: ({ commentBlockId, blockId, onClose, addCommentBlockData }) => {
//               return RenderItem({
//                 onClose,
//                 blockId,
//                 commentId: commentBlockId,
//                 setCommentBlockData: addCommentBlockData,
//               });
//             },
//           },
//         },
//       },
//     });
//   };

//   // This will run only once
//   useEffect(() => {
//     if (ejInstance.current === null) {
//       initEditor();
//     }

//     return () => {
//       ejInstance?.current?.destroy();
//       ejInstance.current = null;
//     };
//   }, []);

//   return (
//     <>
//       <div id="editorjs"></div>
//     </>
//   );
// };

// export default EditorComponent;
