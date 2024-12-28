import { createContext, useEffect, useState } from "react";
// import { products } from "../assets/assets/frontend_assets/assets";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const ShopContext = createContext();
const ShopContextProvider = (props) => {
  const currency = "₱";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(true);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  // const [token, setToken] = useState('');
  const [isLoggedin, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(false);
  const navigate = useNavigate();
  const addToCart = async (itemId, size) => {
    let cartData = structuredClone(cartItems);

    if (!size) {
      toast.error("Select Product size");
      return;
    }

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);
    if(token) {
      try {
        await axios.post(backendUrl + '/api/cart/add',{itemId,size}, {headers: {token}})
        
      } catch (error) {
        console.log(error) 
        toast.error(error.mesage)
        
      }
    }
  };
  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      //iterate thru the items
      for (const item in cartItems[items]) {
        // iterate to product sizes
        try {
          if (cartItems[items][item] > 0) {
            //accessing an object using bracket notations instead of dot notation
            totalCount += cartItems[items][item];
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message)
        }
      }
    }
    return totalCount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);
    if(token) {
      try {
        await axios.post(backendUrl + '/api/cart/update',{itemId, size, quantity}, {headers: {token}})
      } catch (error) {
        console.log(error);
        toast.error(error.message)
      }
    }
  };

  const getUserCart = async (token) => {
      try {
        const response = await axios.post(backendUrl + "/api/cart/get",{},{headers:{token}})
        if(response.data.success) {
          setCartItems(response.data.cartData)
        }
        
      } catch (error) {
        console.log(error);
        toast.error(error.message)
      }
  }


  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += itemInfo.price * cartItems[items][item];
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    return totalAmount;
  };
  const getProductsData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if(response.data.success) {
        setProducts(response.data.products)
      }else{
        toast.error(response.data.msg);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  };
  const getUserData = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/user/get-user')
      response.data.success ? setUserData(response.data) : toast.error(response.data.msg)
    } catch (error) {
      toast.error(error.message)
    }
  }
  // const getAuthState = async () => {
  //   try {
  //     const response = await axios.get(backendUrl + '/api/user/is-auth')

  //     if(response.data.success) {
  //       console.log(response.data);
  //     }
  //   } catch (error) {
  //     console.log(error.message)
  //   }
  // }
  

  useEffect(() => {
    getProductsData();
  }, []);
  // useEffect(() => {
  //   getAuthState()
  // },[])

  //   useEffect(() => {
  //     console.log(cartItems);
  //   }, [cartItems]);
  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    setCartItems,
    // token, setToken,
    isLoggedin,setIsLoggedIn,
    userData, setUserData, getUserData
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;

//continue: 1:08
