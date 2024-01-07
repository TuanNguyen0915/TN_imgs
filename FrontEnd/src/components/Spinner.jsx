import { ThreeCircles, Circles } from "react-loader-spinner";
const Spinner = ({ message }) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <ThreeCircles
        visible={true}
        height={100}
        width={100}
        color="#4fa94d"
        ariaLabel="three-circles-loading"
        className="m-5"
      />
      <p className="mt-10 px-2 text-center text-lg">{message}</p>
    </div>
  );
};

export default Spinner;
