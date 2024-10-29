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



export const backendUrl = import.meta.env.VITE_BACKEND_URL
const App = () => {

  const [auth, setAuth] = useState(localStorage.getItem('auth') === "true");
  
  
   useEffect(() => {

    localStorage.setItem('auth', auth.toString())
    console.log(auth)
   },[auth])
  return (
    <div className="bg-gray-50 min-h-screen ">
    <ToastContainer />
      {auth === false ? <Login setAuth={setAuth}/> :
        <>
        <Navbar setAuth={setAuth}/>
        <hr />
        <div className="flex w-full">
          <Sidebar />

          <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
            <Routes>
              <Route path="/add" element={<Add auth={auth} />} />
              <Route path="/list" element={<List auth={auth} />} />
              <Route path="/orders" element={<Orders auth={auth}/>} />
            </Routes>
          </div>
        </div>
      </>
      }
      
    </div>
  );
};

export default App;
