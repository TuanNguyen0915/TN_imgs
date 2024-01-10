import { useState } from "react";

const CommentForm = ({handleSubmit,user}) => {
  const [formData, setFormData] = useState({
    content: "",
  });
  
  const handleChange  = e => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleSubmitForm = e => {
    e.preventDefault()
    handleSubmit(formData)
    setFormData({
      content: ""
    })
  }
  return (
    <form
        className="mt-5 flex w-full flex-col gap-5 md:flex-row md:items-center"
        onSubmit={handleSubmitForm}
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
  )
}

export default CommentForm


