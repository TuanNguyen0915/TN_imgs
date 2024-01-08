import { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { FaImage } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { categoriesLink } from "../../utils/data/data";
import Spinner from "../Spinner";

const UploadImage = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  // const [formData, setFormData] = useState({
  //   title: "",
  //   desc: "",
  //   url: "",
  //   category: "",
  // });

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };

  const handleUploadImage = (e) => {
    const file = e.target.files[0];
    setPreviewImage(URL.createObjectURL(file));
  };

  return (
    <div>
      UploadImage
      <p>{user._id}</p>
      <div className="container flex w-full items-center justify-center">
        <div className="flex w-full items-center justify-center rounded-lg bg-gray-400/20 p-3 md:w-4/5">
          <div className="flex h-[400px] md:h-[500px] w-full flex-col items-center justify-center border-2 border-dotted border-gray-400 p-3">
            {loading && <Spinner />}

            {!previewImage ? (
              <label className="flex cursor-pointer flex-col items-center justify-center">
                <FaImage size={40} className="text-emerald-600/80" />
                <p className="text-lg">Click to upload</p>
                <p className="mt-8 text-center text-xs text-slate-400 md:text-sm">
                  Use high-quality JPG, JPEG, SVG, PNG, or GIF less than 20 MB
                </p>
                <input
                  type="file"
                  name="upload-image"
                  accept="image/png, image/jpg, image/jpeg, image/svg, image/gif"
                  onChange={handleUploadImage}
                  hidden
                />
              </label>
            ) : (
              <div className="flex flex-col items-center justify-center gap-4">
                <div
                  className="relative mt-8 h-[200px] w-[200px] rounded-lg md:h-[300px] md:w-[300px]"
                  // onMouseEnter={() => setOnHover(true)}
                  // onMouseLeave={() => setOnHover(false)}
                >
                  <img
                    src={previewImage}
                    alt="preview"
                    className="h-full w-full rounded-lg object-cover"
                  />
                  {/* DELETE BUTTON */}
                  <div className="absolute top-0 z-20 flex h-full w-full items-end justify-end rounded-lg p-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/50 md:h-10 md:w-10">
                      <MdDelete
                        size={25}
                        className="text-[#b00000] opacity-70 hover:opacity-100"
                        onClick={() => setPreviewImage(null)}
                      />
                    </div>
                  </div>
                </div>
                <button className="duration-400 flex w-full items-center justify-center gap-2 rounded-lg border border-emerald-600 bg-emerald-600 p-1 text-slate-100 transition-all ease-in-out hover:bg-transparent hover:text-black text-base md:text-lg">
                  <FaCloudUploadAlt /> Upload
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadImage;
