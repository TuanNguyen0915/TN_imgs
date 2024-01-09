import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { NavBar, ImageDetail, Feed, Search } from "..";
import UploadImg from "../../pages/UploadImg";
import { useSelector } from "react-redux";

const Images = () => {
  const { currentUser } = useSelector((state) => state.user);
  const user = currentUser?.user;
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="px-2 md:px-5">
      <div className="bg-gray-50">
        <NavBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          user={user}
        />
      </div>
      <div className="h-full ">
        <Routes>
          <Route path="/*" element={<Feed />} />
          <Route path="/category/:categoryId" element={<Feed />} />
          <Route
            path="/images/:imageId"
            element={<ImageDetail user={user && user} />}
          />
          <Route path="/images/upload-image" element={<UploadImg />} />
          <Route
            path="/search"
            element={
              <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default Images;