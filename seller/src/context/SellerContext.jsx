import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export const SellerContext = createContext();
const SellerContextProvider = (props) => {
  const [auth, setAuth] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [showEmailVerification, setShowEmailVerification] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);

  const navigate = useNavigate();

  // Check for token in cookies on initial render
  const getAuthState = async () => {
    try {
      axios.defaults.withCredentials = true;
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];
      if (!token) {
        setAuth(false);
      } // No token found, user is not logged in return; }

      const response = await axios.get(backendUrl + "/api/seller/is-auth");

      if (response.data.success) {
        setAuth(true);
        toast.success(response.data.msg);
        console.log(response.data.success);
      } else {
        setAuth(false);
        toast.error(response.data.msg);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getAuthState();
  }, []);

  const value = {
    getAuthState,
    auth,
    backendUrl,
    navigate,
    setAuth,
    setShowEmailVerification,
    showEmailVerification,
    showResetPassword,
    setShowResetPassword,
  };
  return (
    <SellerContext.Provider value={value}>
      {props.children}
    </SellerContext.Provider>
  );
};
export default SellerContextProvider;
