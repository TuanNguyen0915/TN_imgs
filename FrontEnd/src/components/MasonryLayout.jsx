import Masonry from "react-masonry-css";
import ImageCard from "./Images/ImageCard";

const breakpointObj = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 3,
  1000: 2,
  500: 1,
};

const MasonryLayout = ({ images }) => {
  return (
    <Masonry className="flex animate-slide-fwd" breakpointCols={breakpointObj}>
      {images?.map((image) => (
        <ImageCard key={image._id} image={image} className="w-max" />
      ))}
    </Masonry>
  );
};

export default MasonryLayout;
