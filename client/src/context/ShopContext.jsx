import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets/frontend_assets/assets";
import { toast } from "react-toastify";
import {useNavigate} from 'react-router-dom'
export const ShopContext = createContext();
const ShopContextProvider = (props) => {
  const currency = "₱";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(true);
  const [cartItems, setCartItems] = useState({});
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
        }
      }
    }
    return totalCount;
  };

  const updateQuantity = async (itemId,size, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        setCartItems(cartData)
  }

  const getCartAmount = () => {
    let totalAmount = 0;
    for(const items in cartItems) {
        let itemInfo = products.find((product)=> product._id === items)
        for(const item in cartItems[items]) {
            try {
                if(cartItems[items][item] > 0){
                    totalAmount += itemInfo.price * cartItems[items][item];
                }
            }catch(error) {
                console.log(error)
            }
        }
    }
    return totalAmount;
  }

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
    navigate
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;

//continue: 1:08
