import { useSelector } from "react-redux";
import * as imageServices from "../../services/image";
import { toast } from "react-toastify";
import FromComment from "../Form/FormComment";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchImageSuccess } from "../../redux/image/imageSlice";

const Comment = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const user = currentUser?.user;
  const { currentImage } = useSelector((state) => state.image);
  const [comments, setComments] = useState([]);
  useEffect(() => {
    setComments(currentImage.comments);
  }, [currentImage.comments, dispatch]);

  const handleSubmit = async ( formData) => {
    try {
      const data = await imageServices.addComment(
        currentImage._id,
        formData,
        currentUser.token,
      );
      if (!data.success) {
        toast.error(data.message);
      } else {
        dispatch(fetchImageSuccess(data.image))
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full">
      <h2 className="mt-3 text-2xl">Comments</h2>
      <div className="container mt-2 flex w-full flex-col gap-2 border-b border-slate-200 pb-2 md:mt-5">
        {comments.map((comment) => (
          <div key={comment._id} className="flex w-full items-center gap-4">
            <img
              src={comment.addBy.avatar}
              alt=""
              className="h-6 w-6 rounded-full"
            />
            <p>{comment.content}</p>
          </div>
        ))}
      </div>
      <FromComment handleSubmit={handleSubmit} user={user} />
    </div>
  );
};

export default Comment;
