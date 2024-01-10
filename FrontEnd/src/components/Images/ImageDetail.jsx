// import { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import * as imageService from "../../services/image";
// import { toast } from "react-toastify";
// import CircleSpinner from "../Spinner/CirclesSpinner";
// import { useSelector } from "react-redux";
// import CommentForm from "../Form/CommentForm";
// import * as imageServices from "../../services/image";

// const ImageDetail = () => {
//   const { imageId } = useParams();
//   const { currentUser } = useSelector((state) => state.user);
//   const userId = currentUser?.user._id;
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [publicAt, setPublicAt] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [formComment, setFormComment] = useState({
//     content: "",
//   });
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const data = await imageService.imageDetail(imageId);
//         if (!data.success) {
//           setLoading(false);
//           toast.error(data.message);
//         } else {
//           setLoading(false);
//           setSelectedImage(data.image);
//           const date = imageService.formatCreatedDate(
//             data.image.createdAt.split("T")[0],
//           );
//           setPublicAt(date);
//         }
//       } catch (error) {
//         setLoading(false);
//         toast.error(error.message);
//       }
//       setLoading(false);
//     };
//     fetchData();
//   }, [imageId, formComment]);

//   const handleSubmitComment = async (e) => {
//     e.preventDefault();
//     try {
//       const comment = await imageServices.addComment(
//         imageId,
//         formComment,
//         currentUser?.user.token,
//       );
//       if (!comment.success) {
//         toast.error(comment.message);
//       } else {
//         toast.success(comment.message);
//         setFormComment({
//           content: "",
//         });
//       }
//     } catch (error) {
//       toast.error(error.message);
//       throw new Error(error);
//     }
//   };
//   return (
//     <div className="container">
//       {loading && <CircleSpinner />}
//       {selectedImage && (
//         <div className="flex w-full flex-col items-center justify-center">
//           {/* IMAGE DETAILS */}
//           <div className="flex w-full flex-col items-center justify-center gap-2 md:flex-row md:justify-between md:gap-5">
//             <img
//               src={selectedImage.url}
//               className="w-full rounded-lg shadow-lg md:w-1/2"
//             />
//             <div className="flex w-full items-center justify-center gap-4 rounded-lg bg-white/10 p-2 drop-shadow-lg">
//               <div className="flex h-full w-full flex-col gap-2 rounded-md p-4">
//                 <p className="text-4xl font-bold">{selectedImage.title}</p>

//                 <p>
//                   <Link
//                     to={`/category/${selectedImage.category}`}
//                     className="text-slate-500 hover:text-emerald-600"
//                   >
//                     {selectedImage.category}
//                   </Link>
//                 </p>
//                 <p>
//                   <span>
//                     <a
//                       href={selectedImage.url}
//                       target="_blank"
//                       rel="noreferrer"
//                       className="text-slate-500 hover:text-emerald-600"
//                     >
//                       Open full-size
//                     </a>
//                   </span>
//                 </p>
//                 <div className="flex w-full items-center">
//                   <Link
//                     to={`/user/${selectedImage.addBy._id}`}
//                     className="flex items-center gap-4 font-semibold hover:text-emerald-600"
//                   >
//                     <img
//                       src={selectedImage.addBy.avatar}
//                       alt="uploader's avatar"
//                       className="h-8 w-8 rounded-full md:h-10 md:w-10"
//                     />{" "}
//                     {selectedImage.addBy.name}
//                   </Link>
//                 </div>
//                 <p className="text-slate-500">{publicAt}</p>
//                 {/* UPLOADER SECTION */}
//                 {userId === selectedImage.addBy._id && (
//                   <div className="flex w-full items-center justify-between gap-5">
//                     <button className="btn">
//                       <Link>Edit</Link>
//                     </button>
//                     <button className="btn border-red-600 bg-red-600">
//                       <Link to="/">Delete</Link>
//                     </button>
//                   </div>
//                 )}
//                 {/* COMMENTS SECTION */}
//                 <h2 className="mt-5 text-2xl md:mt-10">Comments</h2>
//                 <div className="container flex w-full flex-col gap-2 overflow-y-auto">
//                   {selectedImage?.comments.map((comment) => (
//                     <div key={comment._id} className="flex items-center gap-4">
//                       <p>{comment.content}</p>
//                     </div>
//                   ))}
//                   <CommentForm
//                     handleSubmit={handleSubmitComment}
//                     formComment={formComment}
//                     setFormComment={setFormComment}
//                     imageId={selectedImage}
//                     user={currentUser}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ImageDetail;

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CommentForm from "../Form/CommentForm";
import { formatCreatedDate } from "../../services/image";

const ImageDetail = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { currentImage } = useSelector((state) => state.image);
  const publicAt = formatCreatedDate(currentImage.createdAt.split("T")[0]);
  

  return (
    <div className="container flex w-full flex-col items-center gap-5 md:flex-row md:gap-10">
      <div className="w-full">
        <img
          src={currentImage.url}
          alt={currentImage.name}
          referrerPolicy="no-referrer"
          className="rounded-lg object-contain"
        />
      </div>
      <div className="container flex w-full flex-col justify-center gap-5 md:gap-8">
        <p className="text-4xl font-extrabold md:text-6xl">
          {currentImage.title}
        </p>
        <Link to={`/category/${currentImage.category}`} className="linkText">
          <p>{currentImage.category}</p>
        </Link>
        <a
          href={currentImage.url}
          alt="highest resolution"
          target="_blank"
          rel="noreferrer"
          className="linkText"
        >
          Highest resolution{" "}
        </a>
        <div className="flex flex-col justify-center gap-5 md:flex-row md:items-center md:justify-between">
          <Link
            to={`/user/${currentImage.addBy._id}`}
            className="linkText flex items-center gap-5 font-semibold text-black"
          >
            <img
              src={currentImage.addBy.avatar}
              alt="avatar"
              className="h-8 w-8 rounded-full md:h-12 md:w-12"
            />
            <p>{currentImage.addBy.name}</p>
          </Link>
          <p className="text-right text-sm italic text-slate-500">{publicAt}</p>
        </div>
        {/* IF USER IS UPLOADER */}
        {currentUser.user._id === currentImage.addBy._id && (
          <div className="flex items-center justify-between gap-5">
            <button type="button" className="btn">
              EDIT
            </button>
            <button type="button" className="btn border-red-700 bg-red-700">
              DELETE
            </button>
          </div>
        )}
        <CommentForm />
      </div>
    </div>
  );
};

export default ImageDetail;
