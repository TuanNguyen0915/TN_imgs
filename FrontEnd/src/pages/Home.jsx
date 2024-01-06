import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { HiMenu } from "react-icons/hi";
import { AiFillCloseCircle } from "react-icons/ai";
import SideBar from "../components/SideBar";
import { useSelector } from "react-redux";
import UserProfile from "../components/UserProfile";
import logo from "../assets/black-logo.png";
import Images from "../components/Images";

const Home = () => {
  const scrollRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const user = currentUser?.user;
  console.log(user);
  const [toggleSidebar, setToggleSidebar] = useState(false);

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  }, []);

  return (
    <div className="transition-height flex h-screen flex-col bg-gray-50 duration-75 ease-out md:flex-row">
    {/* DESKTOP VIEW */}
      <div className="hidden h-screen flex-initial md:flex">
        <SideBar user={user && user} />
      </div>
      {/* MOBILE VIEW */}
      <div className="flex flex-row md:hidden">
        <div className="flex w-full flex-row items-center justify-between p-2 shadow-lg">
          <HiMenu
            fontSize={40}
            className="cursor-pointer"
            onClick={() => setToggleSidebar(true)}
          />
          <Link to="/">
            <img src={logo} alt="logo" className="w-[80px]" />
          </Link>
          <Link to={`user/${user?._id}`}>
            <img
              src={user?.avatar}
              alt="user-pic"
              className="h-9 w-9 rounded-full mr-4"
            />
          </Link>
        </div>
        {toggleSidebar && (
          <div className="fixed z-10 h-screen w-4/5 animate-slide-in overflow-y-auto bg-white shadow-md">
            <div className="absolute flex w-full items-center justify-end p-2">
              <AiFillCloseCircle
                fontSize={30}
                className="cursor-pointer"
                onClick={() => setToggleSidebar(false)}
              />
            </div>
            <SideBar closeToggle={setToggleSidebar} user={user && user} />
          </div>
        )}
      </div>
      <div
        className="h-screen flex-1 overflow-y-scroll pb-2"
        ref={scrollRef}
      >
        <Images user={user && user} />
      </div>
    </div>
  );
};

export default Home;
