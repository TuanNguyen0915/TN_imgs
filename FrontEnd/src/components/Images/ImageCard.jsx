import { Link } from "react-router-dom";
import {
  MdDownloadForOffline,
  MdOutlineImageSearch,
  MdDelete,
} from "react-icons/md";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";
import { useState } from "react";
import { saveAs } from "file-saver";
import { useSelector } from "react-redux";
import * as imageService from "../../services/image";

const ImageCard = ({ image }) => {
  const [currentImage, setCurrentImage] = useState(image);
  const { currentUser } = useSelector((state) => state.user);
  const user = currentUser?.user;
  const [postHovered, setPostHovered] = useState(false);

  // download the image
  const downloadImage = async (e) => {
    e.stopPropagation();
    saveAs(currentImage.url, `tn-img-${currentImage._id}`);
    const data = await imageService.imageSaved(user._id, currentImage._id);
    setCurrentImage(data);
  };

  return (
    <div className="flex flex-col items-center justify-center p-2">
      <div
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        // onClick={() => navigate(`/image/${currentImage._id}`)}
        className={`relative w-auto cursor-zoom-in overflow-hidden rounded-lg transition-all duration-500 ease-in-out hover:shadow-lg`}
      >
        <img
          src={currentImage.url}
          alt={currentImage.name}
          className={`${
            postHovered ? "scale-[1.2] object-center" : ""
          } w-full rounded-lg transition-all duration-300 ease-in-out hover:scale-150`}
        />
        {postHovered && (
          <div className="absolute top-0 z-20 flex h-full w-full flex-col justify-between bg-black/50 p-1 pb-2 pr-2 pt-2">
            <div className="flex items-center justify-between text-white">
              <MdDownloadForOffline
                onClick={downloadImage}
                size={32}
                className="opacity-70 outline-none transition-all duration-150 ease-in hover:ml-1 hover:scale-125 hover:opacity-100"
              />
              <div className="flex items-center justify-center rounded-lg bg-red-500 px-2 py-1 opacity-70 transition-all duration-150 ease-in hover:mr-2 hover:scale-125 hover:opacity-100">
                <button type="button" className="text-[12px]">
                  Saved: {currentImage.saved.length}
                </button>
              </div>
            </div>
            {/* show img source */}
            <div className="flex items-center justify-between gap-2 text-white">
              <div className="ml-2 flex  items-center justify-center rounded-lg bg-white p-1 opacity-70 transition-all duration-150 ease-in hover:ml-5 hover:scale-125 hover:opacity-100">
                <a
                  href={currentImage.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 px-2 text-black"
                >
                  <BsFillArrowUpRightCircleFill className="outline-none" />
                  <p className="text-[10px]">image url</p>
                </a>
              </div>
              <div className="hover: flex items-center justify-center rounded-lg bg-white p-1 opacity-70 transition-all duration-150 ease-in hover:mr-5 hover:scale-125 hover:opacity-100">
                <Link to={`/images/${currentImage._id}`} className="flex items-center justify-center gap-2 px-2 text-black">
                  <MdOutlineImageSearch /> <p className="text-[10px]">Details</p>
                </Link>
              </div>
              {/* show delete button if user = uploader photo */}
              {user?._id === currentImage.addBy._id && (
                <div className="flex items-center justify-center rounded-full bg-white p-1 text-red-700 opacity-70 transition-all duration-150 ease-in hover:scale-[1.5] hover:opacity-100">
                  <MdDelete />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      {/* uploader's name */}
      <div className="mt-2 w-full">
        <Link
          to={`/user/${currentImage.addBy._id}`}
          className="flex w-full items-center gap-2 hover:text-emerald-600"
        >
          <img
            src={currentImage.addBy.avatar}
            referrerPolicy="no-referrer"
            alt="user's photo"
            className="h-6 w-6 rounded-full"
          />
          <p className="text-sm">{currentImage.addBy.name}</p>
        </Link>
      </div>
    </div>
  );
};

export default ImageCard;
