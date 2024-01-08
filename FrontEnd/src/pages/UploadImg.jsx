import UploadImage from "../components/Form/UploadImage";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
const UploadImg = () => {
  const { currentUser } = useSelector((state) => state.user);
  const user = currentUser?.user;
  return user?<UploadImage />: <Navigate to='/login' />;
};

export default UploadImg;
