import { ThreeDots } from "react-loader-spinner";

const ThreeDotsSpinner = ({w,h, color}) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <ThreeDots
        height= {`${h?h:'80'}`}
        width={`${w?w:'80'}`}
        color={`${color?color:'#4fa94d'}`}
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default ThreeDotsSpinner;
