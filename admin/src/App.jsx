import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from "./components/Navbar";
import AdminPanel from "./components/AdminPanel";
import Login from "./components/Login";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from "../protected/ProtectedRoute";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;



const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'): '');

  useEffect(() => {
    localStorage.setItem('token', token);
  }, [token]);

  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route 
          path="/admin-login" 
          element={<Login setToken={setToken} />} 
        />
        
        <Route
          path="/admin"
          element={
            <ProtectedRoute token={token}>
              <>
                <Navbar setToken={setToken} />
                <hr />
                <AdminPanel />
              </>
            </ProtectedRoute>
          }
        />
        
        <Route 
          path="*" 
          element={<Navigate to={token ? "/admin" : "/admin-login"} />} 
        />
      </Routes>
    </Router>
  );
};

export default App;



// import Navbar from "./components/Navbar";
// import AdminPanel from "./components/AdminPanel";
// import { useEffect, useState } from "react";
// import Login from "./components/Login";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// export const backendUrl = import.meta.env.VITE_BACKEND_URL;
// const App = () => {
//   const [token, setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):'');

//   useEffect(() => {
//     localStorage.setItem('token', token)
//   },[token])
//   return (
//     <>
//     <ToastContainer />
//       {token === "" ? (
//         <Login setToken={setToken}/>
//       ) : (
//         <>
//           <Navbar setToken={setToken}/>
//           <hr />
//           <AdminPanel />{" "}
//         </>
//       )}
//     </>
//   );
// };

// export default App;
