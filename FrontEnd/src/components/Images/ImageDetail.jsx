import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as imageService from "../../services/image";
import { toast } from "react-toastify";

const ImageDetail = () => {
  const { imageId } = useParams();
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await imageService.imageDetail(imageId);
      if (!data.success) {
        toast.error(data.message);
      }
      {
        setSelectedImage(data.image);
      }
      } catch (error) {
        console.log(error.message) 
        toast.error(error.message)
      }
    };
    fetchData();
  }, [imageId]);

  console.log(selectedImage?.title)
  console.log(selectedImage?.url)


  return <div>ImageDetails</div>;
};

export default ImageDetail;
