import { useState } from "react";
import { FaChessKing, FaCloudUploadAlt } from "react-icons/fa";
import { FaImage } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
// import { categoriesLink } from "../../utils/data/data";
// upload to firebase
import { app } from "../../utils/firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
//components
import Spinner from "../Spinner";
import UploadImageForm from "../Form/UploadImageForm";

const UploadImage = ({ user }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [image, setImage] = useState(null);

  const [uploadPercent, setUploadPercent] = useState(null);
  const handleChooseImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleUploadImage = () => {
    const storage = getStorage(app);
    const fileName = `${image.size}-${image.name}`;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadPercent(Math.round(progress));
      },
      (error) => {
        setUploadError(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setImageUrl(downloadURL),
        );
      },
    );
  };
  return (
    <div>
      <div className="container flex w-full items-center justify-center">
        <div className="flex w-full items-center justify-center rounded-lg bg-gray-400/20 p-3 md:w-4/5">
          <div className="flex h-[400px] w-full flex-col items-center justify-center border-2 border-dotted border-gray-400 p-3 md:h-[500px]">
            {loading && <Spinner />}

            {!previewImage ? (
              <label className="flex cursor-pointer flex-col items-center justify-center">
                <FaImage size={40} className="text-emerald-600/80" />
                <p className="text-lg">Click to upload</p>
                <p className="mt-8 text-center text-xs text-slate-400 md:text-sm">
                  Use high-quality JPG, JPEG, SVG, PNG, or GIF less than 10 MB
                </p>
                <input
                  type="file"
                  name="upload-image"
                  accept="image/png, image/jpg, image/jpeg, image/svg, image/gif"
                  onChange={handleChooseImage}
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
                <button
                  disabled={uploadPercent}
                  className={` ${
                    uploadPercent ? "opacity-50 hover:bg-emerald-600 hover:text-white cursor-not-allowed" : "opacity-100"
                  } flex w-full items-center justify-center gap-2 rounded-lg border border-emerald-600 bg-emerald-600 p-1 text-base text-slate-100 transition-all duration-500 ease-in-out hover:bg-transparent hover:text-black md:text-lg`}
                  onClick={handleUploadImage}
                >
                  {uploadPercent === null ? (
                    <>
                      <FaCloudUploadAlt /> Upload
                    </>
                  ) : uploadPercent === 100 ? (
                    <>Uploaded Done</>
                  ) : (
                    <>Uploading {uploadPercent}%</>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* UPLOAD FORM */}
      <UploadImageForm user={user} imageUrl={imageUrl} />
    </div>
  );
};

export default UploadImage;