// import { signal } from "@preact-signals/safe-react";
// import { withTrackSignals } from "@preact-signals/safe-react/manual";

// const comments = signal([]);

// const commentSignal = signal(Object());

// const RenderItem = ({ commentBlockId, blockId, onClose, addCommentBlockData }) => {
//   commentSignal.value = {
//     ...Object(),
//     commentBlockId,
//     blockId,
//   };

//   const data = (value) => {
//     commentSignal.value = { ...commentSignal.value, content: value };
//   };

//   const saveComment = () => {
//     addContractCommentApi({
//       ...commentSignal.value,
//     }).then((respo) => {
//       if (respo.length > 0) {
//         const data = {
//           id: respo[0].commentBlockId,
//           count: respo.length,
//         };

//         if (addCommentBlockData) {
//           addCommentBlockData(data);
//         }
//         comments.value = respo;
//       }
//     });
//   };

//   //The commentBlockId for the current  comment section is available  to be use to query the db, depending on your logic
//   const getComments = () => {
//     if (!commentBlockId) {
//       comments.value = [];
//       return;
//     }
//     getContractCommentByIdApi(commentBlockId)
//       .then((respon) => {
//         if (respon.length > 0) {
//           addCommentBlockData({
//             id: respon[0].commentBlockId,
//             count: respon.length,
//           });
//           comments.value = respon;
//         }
//       })
//       .catch((err) => {
//         comments.value = [];
//         console.log(err);
//       });
//   };
//   getComments();

//   const ShowComments = withTrackSignals(() => {
//     return (
//       <div>
//         {comments.value.map((comment, index) => (
//           <div key={index}>
//             <div>{comment}</div>
//           </div>
//         ))}
//       </div>
//     );
//   });

//   const closeEl = () => {
//     if (!onClose) return;
//     onClose();
//   };

//   return (
//     <div style={{ zIndex: 3, position: "absolute" }} className="comment-popover">
//       <div style={{ textAlign: "right" }} onClick={closeEl}>
//         <button onClick={closeEl}>Close</button>
//       </div>
//       <div style={{ margin: 10 }}>
//         <div>{"Ashmeet"}</div>
//         <div>
//           <input className="border" label="tesv" type="text" value={commentSignal.value.content} onChange={data} />
//           <button onClick={saveComment}>Add Comment</button>
//         </div>
//         <div>
//           <ShowComments />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RenderItem;
