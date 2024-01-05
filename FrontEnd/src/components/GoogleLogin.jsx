import googleIcon from "../assets/google-icon.png";
import { app } from "../utils/firebase";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import * as AuthService from "../services/auth";

const GoogleLogin = () => {
  const handleOAuth = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const formData = {
        name: result.user.displayName,
        email: result.user.email,
        avatar: result.user.photoURL,
      };
      const data = await AuthService.Auth(formData);
      console.log(data);
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <div>
      <button
        className="flex h-[50px] w-[260px] items-center justify-between gap-2 rounded-lg bg-slate-300 px-4 py-2 shadow-2xl"
        onClick={handleOAuth}
      >
        <img
          src={googleIcon}
          alt="google icon"
          className="flex h-full items-center justify-center object-contain"
        />
        <p className="w-full">Sign in with Google</p>
      </button>
    </div>
  );
};

export default GoogleLogin;
