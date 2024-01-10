// npm modules
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
// component
import ImageDetail from "../components/Images/ImageDetail";
//image service
import * as imageService from "../services/image";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  fetchImageStart,
  fetchImageFailure,
  fetchImageSuccess,
} from "../redux/image/imageSlice";

const ImageDetails = () => {
  const dispatch = useDispatch();
  const { imageId } = useParams();

  useEffect(() => {
    const fetchImage = async () => {
      try {
        dispatch(fetchImageStart());
        const data = await imageService.imageDetail(imageId);
        if (!data.success) {
          toast.error(data.message);
          dispatch(fetchImageFailure(data.message));
        } else {
          dispatch(fetchImageSuccess(data.image));
        }
      } catch (error) {
        toast.error(error.message);
        dispatch(fetchImageFailure(error.message));
      }
    };
    fetchImage();
  }, [imageId, dispatch]);

  return (
    <div>
      <ImageDetail />
    </div>
  );
};

export default ImageDetails;
