import { useNavigate } from "react-router-dom";
import loginVideo from "../assets/login_video.mp4";
import whiteLogo from "../assets/white-logo.png";
import GoogleLogin from "../components/GoogleLogin";
const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen flex-col items-center justify-start">
      <div className="relative h-full w-full">
        <video
          src={loginVideo}
          type="video/mp4"
          loop
          muted
          autoPlay
          className="h-full w-full object-cover"
        />
        <div className="bg-blackCover absolute bottom-0 left-0 right-0 top-0 flex flex-col items-center justify-center gap-2">
          <div className="w-[300px] h-[300px]">
            <img src={whiteLogo} alt="logo" className="w-full"/>
          </div>
          <GoogleLogin />
        </div>
      </div>
    </div>
  );
};

export default Login;
