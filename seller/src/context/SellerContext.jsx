import { createContext, useEffect, useState } from "react";
import axios from axios
//FIX THE SELLER ISSUE IN EMAIL VERIFICATION NOT REDIRECTING 
export const SellerContext = createContext();
const SellerContextProvider = (props) => {
    const [auth, setAuth] = useState(false);


     // Check for token in cookies on initial render 
     const getAuthState = async () => {
        try {
          axios.defaults.withCredentials = true
          const token = document.cookie
            .split("; ")
            .find((row) => row.startsWith("token="))
            ?.split("=")[1];
          if (!token) {
            setAuth(false)
          
          } // No token found, user is not logged in return; }
    
          const response = await axios.get(backendUrl + "/api/seller/is-auth");
    
          if (response.data.success) {
            setAuth(true)
            console.log(response.data.success)
       
          } else {
            setAuth(false);
            toast.error
          }
        } catch (error) {
          toast.error(error.message);
        }
      };
    
      useEffect(() => {
        getAuthState();
      },[])


    const value = {
        getAuthState,
        auth,
    }
    return(
        <SellerContext.Provider value={value}>{props.children}</SellerContext.Provider>
    )
};
export default SellerContextProvider;