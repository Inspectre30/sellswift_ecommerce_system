import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Routes, Route } from "react-router-dom";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import { useState, useEffect } from "react";
import Login from './components/Login'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = "₱"
const App = () => {

  const [auth, setAuth] = useState(localStorage.getItem('auth') === "true");
  const [role, setRole] = useState('');
  
  
   useEffect(() => {

    localStorage.setItem('auth', auth.toString())
  
   },[auth])
  return (
    <div className="bg-gray-50 min-h-screen ">
    <ToastContainer />
      {auth === false ? <Login setAuth={setAuth} setRole={setRole}/> :
        <>
        <Navbar setAuth={setAuth}/>
        <hr />
        <div className="flex w-full">
          <Sidebar />

          <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
            <Routes>
              <Route path="/add" element={<Add role={role} />} />
              <Route path="/list" element={<List role={role} />} />
              <Route path="/orders" element={<Orders role={role}/>} />
            </Routes>
          </div>
        </div>
      </>
      }
      
    </div>
  );
};

export default App;
