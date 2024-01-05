import {useState } from "react";
import * as authService from "../services/auth";
import {toast} from 'react-toastify'

const LoginForm = () => {
  
  const [clicked, setClicked] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await authService.login(formData);
    if (!data.success) {
      toast.error(data.message)
    } else {
      // localStorage.setItem('token', data.token)
      toast.success(data.message)
    }
  };

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <button
        className="my-2 flex h-[50px] w-[260px] items-center justify-center gap-2 rounded-lg bg-slate-300 px-4 py-2 shadow-2xl"
        onClick={() => setClicked(!clicked)}
      >
        Login by Email
      </button>
      {clicked && (
        <div>
          <form
            className="mt-2 flex flex-col items-center justify-center gap-2 rounded-lg bg-slate-300 p-4"
            onSubmit={handleSubmit}
          >
            <h1 className="text-xl font-bold">Login</h1>
            <input
              type="text"
              name="email"
              value={formData.email}
              placeholder="Email"
              autoComplete="off"
              required
              className="rounded-md p-2"
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              placeholder="Password"
              autoComplete="off"
              required
              className="rounded-md p-2"
              onChange={handleChange}
            />
            <button className="w-full rounded-md bg-slate-600 p-2 text-white hover:opacity-80 focus:opacity-80">
              Login
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
