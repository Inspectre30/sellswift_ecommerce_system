import React from "react";

const Navbar = () => {
  return (
    <div className="flex items-center py-2 px-[4%] justify-between">
      <div id="title">
        <h1 className="font-semibold text-5xl italic w-[max(10%,80px)]">
          SellSwift{" "}
        </h1>
        <span>Admin panel</span>
      </div>

      <button
        onClick={() => setAuth(false)}
        className="bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
