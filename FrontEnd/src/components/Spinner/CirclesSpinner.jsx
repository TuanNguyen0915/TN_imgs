import { Circles } from "react-loader-spinner";
const Spinner = ({ message }) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <Circles
        visible={true}
        height={50}
        width={50}
        color="#16a34a"
        ariaLabel="three-circles-loading"
        className="m-5"
      />

      {message && <p className="mt-10 px-2 text-center text-lg">{message}</p>}
    </div>
  );
};

export default Spinner;
