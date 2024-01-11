import { NavLink, Link } from "react-router-dom";
import { RiHomeFill } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";
import logo from "../assets/black-logo.png";
import { categoriesLink } from "../utils/data/data";
import { useState } from "react";
import { useSelector } from "react-redux";

// SIDEBAR
const SideBar = ({ closeToggle }) => {
  const { currentUser } = useSelector((state) => state.user);
  const user = currentUser?.user;
  const handleCloseSideBar = () => {
    if (closeToggle) closeToggle(false);
  };
  const [showCategories, setShowCategories] = useState(false);
  const isActiveStyle =
    "flex items-center gap-3 border-r-2 border-black px-5 font-extrabold uppercase transition-all duration-150 ease-in-out";
  const isNotActiveStyle =
    "text-slate-700/60 flex items-center gap-3 px-5 transition-all duration-150 capitalize ease-in-out hover:text-emerald-600";

  return (
    <div className="flex h-full min-w-[300px] flex-col justify-between gap-5 overflow-y-auto bg-white">
      <div>
        <div className="flex items-center justify-center">
          <Link
            to="/"
            className="my-6 flex w-[190px] items-center gap-2 px-5 pt-1"
            onClick={handleCloseSideBar}
          >
            <img src={logo} alt="logo" className="w-full" />
          </Link>
        </div>
        {/* NAV LINK */}
        <div className="mt-10 flex flex-col gap-5">
          <NavLink
            to="/"
            className={(navClass) =>
              navClass.isActive ? isActiveStyle : isNotActiveStyle
            }
            onClick={handleCloseSideBar}
          >
            <RiHomeFill /> Home
          </NavLink>
          <div
            className="flex items-center gap-1"
            onClick={() => setShowCategories(!showCategories)}
          >
            <h3 className="mt-2 px-5 text-base hover:text-emerald-600 2xl:text-xl">
              Discover categories
            </h3>

            {!showCategories ? (
              <IoIosArrowDown fontSize={14} className="translate-y-1" />
            ) : (
              ""
            )}
          </div>
          {showCategories && (
            <div className="animate-slide-in">
              {categoriesLink.map((category) => (
                <div
                  key={category.name}
                  className="mb-1 flex items-center gap-2 pl-10"
                >
                  <NavLink
                    to={`/category/${category.name}`}
                    className={(navClass) =>
                      navClass.isActive ? isActiveStyle : isNotActiveStyle
                    }
                    onClick={handleCloseSideBar}
                  >
                    {category.name}
                  </NavLink>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {user ? (
        <Link
          to={`user/${user._id}`}
          className="mx-3 my-5 mb-3 flex items-center gap-2 rounded-lg p-2 shadow-lg"
          onClick={handleCloseSideBar}
        >
          <img
            src={user?.avatar}
            alt="user's avatar"
            className="h-10 w-10 rounded-full"
          />
          <p>{user.name}</p>
        </Link>
      ) : (
        <div className="flex w-full flex-col items-center justify-center mb-10 gap-2 px-2">
          <p>Please </p>
          <Link to="/login" className="uppercase text-emerald-600 font-semibold hover:text-slate-400">
            Login
          </Link>
          <p>to use full functionality</p>
        </div>
      )}
    </div>
  );
};

export default SideBar;
