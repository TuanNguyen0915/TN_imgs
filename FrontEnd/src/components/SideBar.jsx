import { NavLink, Link } from "react-router-dom";
import { RiHomeFill } from "react-icons/ri";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";

import logo from "../assets/white-logo.png";
import { categoriesLink } from "../data/data";
import { useState } from "react";

// SIDEBAR
const SideBar = ({ user, closeToggle }) => {
  const handleCloseSideBar = () => {
    if (closeToggle) closeToggle(false);
  };
  const [showCategories, setShowCategories] = useState(false);
  const isActiveStyle =
    "flex items-center gap-3 border-r-2 border-black px-5 font-extrabold uppercase transition-all duration-150 ease-in-out";
  const isNotActiveStyle =
    "text-slate-700/60 flex items-center gap-3 px-5 transition-all duration-150 capitalize ease-in-out hover:text-emerald-600";

  return (
    <div className="flex h-full min-w-[250px] flex-col gap-5 overflow-y-auto bg-white">
      <div className="flex flex-col rounded-br-lg bg-slate-100 shadow-xl">
        <Link
          to="/"
          className="my-6 flex w-[190px] items-center gap-2 px-5 pt-1"
          onClick={handleCloseSideBar}
        >
          <img src={logo} alt="logo" className="w-full" />
        </Link>
      </div>
      {/* NAV LINK */}
      <div className="flex flex-col gap-5">
        <NavLink
          to="/"
          className={(navClass) =>
            navClass.isActive ? isActiveStyle : isNotActiveStyle
          }
        >
          <RiHomeFill /> Home
        </NavLink>
        <div
          className="flex items-center gap-2"
          onClick={() => setShowCategories(!showCategories)}
        >
          <h3 className="mt-2 px-5 text-base 2xl:text-xl">
            Discover categories
          </h3>

          {!showCategories ? <IoIosArrowDown /> : ""}
        </div>
        <div className={`${showCategories?'animate-slide-in':'animate-slide-out translate-x-[-400px]'}`}>
          {categoriesLink.map((category) => (
            <div key={category.name} className="pl-10">
              <NavLink
                to={`/category/${category.name}`}
                className={(navClass) =>
                  navClass.isActive ? isActiveStyle : isNotActiveStyle
                }
              >
                {category.name}
              </NavLink>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
