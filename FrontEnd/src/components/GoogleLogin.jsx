import googleIcon from '../assets/google-icon.png'

const GoogleLogin = () => {
  return (
    <div>
      <button className='bg-slate-300 px-4 py-2 rounded-lg shadow-2xl flex items-center justify-between h-[50px] gap-2'>
        <img src={googleIcon} alt="google icon" className='object-contain h-full flex items-center justify-center'/>
        <p className='w-full'>Sign in with Google</p>
      </button>  
    </div>
  )
}

export default GoogleLogin