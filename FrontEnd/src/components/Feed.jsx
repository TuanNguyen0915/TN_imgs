import { useParams } from "react-router-dom";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";
import { useEffect, useState } from "react";
import * as imageServices from "../services/image";

const Feed = () => {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const { categoryId } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      const allData = await imageServices.allImages();
      setImages(allData);
    };
    fetchData();
  }, [categoryId]);
  if (loading)
    return <Spinner message="We are adding new idea for your feed" />;
  return (
    <div>
      {images && categoryId === undefined?<MasonryLayout images={images} />:categoryId}
    </div>
  );
};

export default Feed;
