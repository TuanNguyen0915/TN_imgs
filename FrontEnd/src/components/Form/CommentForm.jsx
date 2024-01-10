import { useState } from "react";
import { useSelector } from "react-redux";
import * as imageServices from "../../services/image";
import { toast } from "react-toastify";

const CommentForm = () => {
  const { currentUser } = useSelector((state) => state.user);
  const user = currentUser?.user;
  const { currentImage } = useSelector((state) => state.image);
  const [formData, setFormData] = useState({
    content: "",
  });
  const comments = currentImage.comments;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    try {
      const data = await imageServices.addComment(
        currentImage._id,
        formData,
        currentUser.token,
      );
      if (!data.success) {
        toast.error(data.message);
      } else {
        toast.success(data.message);
      }
      setFormData({
        content: "",
      });
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
      <form
        className="mt-5 flex w-full flex-col gap-5 md:flex-row md:items-center"
        onSubmit={handleSubmit}
      >
        <div className="flex w-full items-center gap-2">
          <img
            src={user.avatar}
            className="h-6 w-6 rounded-full md:h-12 md:w-12 "
          />
          <input
            type="text"
            name="content"
            value={formData.content}
            className="w-full rounded-lg border border-slate-300 px-4 py-2 opacity-70 outline-none focus:opacity-100 focus:shadow-lg"
            placeholder="Add a comment"
            onChange={handleChange}
          />
        </div>
        <div className="flex w-full items-center justify-center md:w-1/6">
          <button className="btn w-1/3 md:w-full">Post</button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
