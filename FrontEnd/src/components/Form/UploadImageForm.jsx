import { categoriesLink } from "../../utils/data/data";
import BarSpinner from "../Spinner/ThreeDotsSpinner";
import { useState } from "react";

const UploadImageForm = ({ user, imageUrl }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    url: imageUrl,
    category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <div className="container mt-4 flex w-full justify-center">
      <div className="container flex w-full justify-center md:w-4/5">
        <form className="flex w-full flex-col items-center justify-center gap-4">
          <input
            type="text"
            name="title"
            value={formData.title}
            placeholder="Add your title here"
            className="w-full rounded-lg bg-gray-400/20 px-4 py-1 opacity-80 outline-none focus-within:opacity-100 focus:shadow-md"
            onChange={handleChange}
          />
          <input
            type="text"
            name="decs"
            value={formData.decs}
            placeholder="Add some description"
            className="w-full rounded-lg bg-gray-400/20 px-4 py-1 opacity-80 outline-none focus-within:opacity-100 focus:shadow-md"
            onChange={handleChange}
          />
          <div className="flex w-full items-center justify-between">
            <p className="w-full font-semibold">Choose image category</p>
            <select
              name="category"
              onChange={handleChange}
              className={`${
                formData.category !== "other" ? "text-emerald-600" : ""
              } w-full rounded-lg bg-gray-400/20 px-4 py-1 font-bold  opacity-80 outline-none focus-within:opacity-100 focus:shadow-md`}
            >
              <option value="other">Select Category</option>
              {categoriesLink.map((category) => (
                <option key={category.name}>{category.name}</option>
              ))}
            </select>
          </div>
          <button disabled={loading} className={`btn uppercase ${loading?'bg-transparent border-none':''}`}>
            {loading ? (
              <div className="w-full flex">
                <BarSpinner w={100} h={40}  />
              </div>
            )  : "upload image"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadImageForm;
