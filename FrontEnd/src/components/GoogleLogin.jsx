import googleIcon from '../assets/google-icon.png'
import { app } from '../utils/firebase'
import {GoogleAuthProvider, getAuth, signInWithPopup}  from 'firebase/auth'

const GoogleLogin = () => {
  const handleOAuth = async () => {
    try {
      const provider = new GoogleAuthProvider()
      const auth = getAuth(app)
      const result = await signInWithPopup(auth,provider)
      const formData ={
        name: result.user.displayName,
        email: result.user.email,
        avatar: result.user.photoURL
      }
      console.log(formData)
    } catch (error) {
      throw new Error(error)
    }
  }

  return (
    <div>
      <button 
      className='bg-slate-300 px-4 py-2 rounded-lg shadow-2xl flex items-center justify-between h-[50px] gap-2'
      onClick={handleOAuth}
      >
        <img src={googleIcon} alt="google icon" className='object-contain h-full flex items-center justify-center'/>
        <p className='w-full'>Sign in with Google</p>
      </button>  
    </div>
  )
}

export default GoogleLogin