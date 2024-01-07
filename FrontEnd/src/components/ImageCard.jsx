

const ImageCard = ({ image }) => {
  return (
    <div className="p-2 flex flex-col items-center justify-center">
      <img src={image.url} alt={image.name} className="w-full rounded-lg" />
      <p>Add by: {image.addBy}</p>
    </div>
  );
};

export default ImageCard;
