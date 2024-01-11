import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as userServices from "../services/user";
import { toast } from "react-toastify";
import { CirclesSpinner } from "./Spinner/Spinner";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineLogout } from "react-icons/ai";
import { logOut } from "../redux/user/userSlice";

// get random banner
const randomImage =
  "https://source.unsplash.com/1600x900/?nature,photography,technogoly,car,game";

const UserProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { currentUser } = useSelector((state) => state.user);
  currentUser = currentUser?.user;
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const [text, setText] = useState("Created");
  const [activeBtn, setActiveBtn] = useState("created");

  //fetch user
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await userServices.getUserDetails(userId);
        if (!data.success) {
          toast.error(data.message);
        } else {
          setUser(data.user);
        }
      } catch (error) {
        toast.error(error.message);
        throw new Error(error);
      }
    };
    fetchData();
  }, [userId]);

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/");
  };

  if (!user) {
    return <CirclesSpinner message="Loading profile ..." />;
  }

  return (
    <div className="container relative h-full items-center justify-center pb-2">
      <div className="flex flex-col pb-5">
        <div className="relative mb-7 flex flex-col">
          {/* BANNER, AVATAR AND LOGOUT BUTTON */}
          <div className="mt-5 flex flex-col items-center justify-center">
            <img
              src={randomImage}
              className="h-[300px] w-full rounded-lg object-cover shadow-lg md:h-[400px]"
              alt="banner"
            />
            <img
              src={user.avatar}
              alt="avatar"
              className="-mt-10 h-20 w-20 rounded-full shadow-2xl shadow-black"
            />
            <h1 className="mt-5 text-center text-3xl md:text-5xl font-bold">{user.name}</h1>
            <div className="z-1 absolute right-5 top-10 p-2">
              {currentUser?._id === userId && (
                <button
                  className="rounded-lg border-red-400 bg-red-400  p-2 text-white hover:bg-red-600 transition-all duration-300 ease-in-out"
                  onClick={handleLogout}
                >
                  <AiOutlineLogout size={30} />
                </button>
              )}
            </div>
          </div>
          {/* USER INFO */}
          <div className="mb-7 text-center">
            <button
              type="button"
              onClick={(e) => {
                setText(e.target.textContent);
                setActiveBtn("created");
              }}
              // className={`${
              //   activeBtn === "created" ? activeBtnStyles : notActiveBtnStyles
              // }`}
            ></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
