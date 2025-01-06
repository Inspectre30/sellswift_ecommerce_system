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
import { useNavigate } from "react-router-dom";
import EmailVerification from "./pages/EmailVerification";
import ResetPassword from "./pages/ResetPassword";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = "₱";
const App = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(false)
  // Check for token in cookies on initial render
  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (token) {
      setAuth(true); // Set authentication to true if token exists
      console.log(auth)
    } else {
      setAuth(false); // Set authentication to false if token does not exist
      navigate("/login"); // Redirect to login route
    }
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen ">
      <ToastContainer />
      {auth === false ? (
        <Login />
      ) : (
        <>
          <Navbar setAuth={setAuth} />
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
