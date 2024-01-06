
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import {ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { store } from "./redux/store.js";
import { Provider } from "react-redux";
import "./index.css";


ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
    <ToastContainer theme="light" autoClose={3000} closeOnClick={true} pauseOnHover={true} position="top-right"/>
      <App />
    </BrowserRouter>
  </Provider>,
);
