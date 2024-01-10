import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Comment from "./Comment";
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
        <Comment />
      </div>
    </div>
  );
};

export default ImageDetail;
