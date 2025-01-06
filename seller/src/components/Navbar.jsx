import React from "react";
import { assets } from "../assets/seller_assets/assets";

const Navbar = () => {

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.post(backendUrl + "/api/seller/logout");

      if(response.data.success) {
        navigate("/login");
      }else {
        toast.error(response.data.msg)
      }
     
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="flex items-center py-2 px-[4%] justify-between">
      <div id="title">
        <h1 className="font-semibold text-5xl italic w-[max(10%,80px)]">
          SellSwift
        </h1>
        <span>Seller panel</span>
      </div>

      <button
      onClick={logout}
       
        className="bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
