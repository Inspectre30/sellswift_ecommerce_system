import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Routes, Route } from "react-router-dom";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import { useState, useEffect } from "react";
import Login from "./components/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EmailVerification from "./pages/EmailVerification";
import ResetPassword from "./pages/ResetPassword";
import { toast } from "react-toastify";


export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = "₱";
const App = () => {

  const [auth, setAuth] = useState(false)
  // Check for token in cookies on initial render


  return (
    <div className="bg-gray-50 min-h-screen ">
      <ToastContainer />
      {auth === false ? (
        <Login />
      ) : (
        <>
          <Navbar/>
          <hr />
          <div className="flex w-full">
            <Sidebar />

            <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
              <Routes>
                <Route path="/add" element={<Add />} />
                <Route path="/list" element={<List />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/verify-email" element={<EmailVerification />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/login" element={<Login />} />
                
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
