import { Link, useNavigate } from "react-router-dom";
import { MdDownloadForOffline } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";
import { useState } from "react";
import { saveAs } from "file-saver";

const ImageCard = ({ image }) => {
  const [postHovered, setPostHovered] = useState(false);
  const [savingPost, setSavingPost] = useState(false);
  const downloadImage = (e) => {
    saveAs(image.url, image._id);
    e.stopPropagation();
  };
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center p-2">
      <div
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => navigate(`/image/${image._id}`)}
        className="relative w-auto cursor-zoom-in overflow-hidden rounded-lg transition-all duration-500 ease-in-out hover:shadow-lg"
      >
        <img src={image.url} alt={image.name} className="w-full rounded-lg" />
        {postHovered && (
          <div className="absolute top-0 z-20 flex h-full w-full flex-col justify-between bg-black/40 p-1 pb-2 pr-2 pt-2">
            <div className="flex items-center justify-between">
              <div className="flex gap-2 text-white">
                <MdDownloadForOffline
                  onClick={downloadImage}
                  size={32}
                  className="opacity-70 outline-none hover:opacity-100"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageCard;
