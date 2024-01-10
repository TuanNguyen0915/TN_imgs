import { useParams } from "react-router-dom";
import MasonryLayout from "./MasonryLayout";
import { CirclesSpinner } from "./Spinner/Spinner";
import { useEffect, useState } from "react";
import * as imageServices from "../services/image";

const Feed = () => {
  const { categoryId } = useParams();
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  useEffect(() => {
    if (categoryId === undefined) {
      const fetchData = async () => {
        const allData = await imageServices.allImages();
        setImages(allData.data);
      };
      fetchData();
      setLoading(false);
    } else {
      const fetchData = async () => {
        const allData = await imageServices.getImagesByCategory(categoryId);
        setImages(allData.data);
      };
      fetchData();
      setLoading(false);
    }
  }, [categoryId]);



  return (
    <div className="container">
      {loading ? (
        <CirclesSpinner message="We are adding new idea for your feed" />
      ) : (
        <div>
          {images.length !==0? (
            <MasonryLayout images={images}/>
          ):(
            <div className="flex w-full h-full items-center justify-center">
              <CirclesSpinner message={`We are adding new idea for ${categoryId?.toUpperCase()}`} />
            </div>
          )}
        </div>
      
      )} 
      
    </div>
  );
};

export default Feed;
