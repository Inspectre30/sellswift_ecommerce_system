import React from "react";
import { assets } from "../assets/assets/frontend_assets/assets";

const Footer = () => {
  return (
    <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10  mt-40 text-sm">
      <div>
        <div className="logo font-semibold lg:text-5xl italic mb-4">
          <h1>SellSwift.</h1>
        </div>
        <p className="w-full md:w-2/3 text-gray-600">
          At Sellswift, we are dedicated to helping small and medium-sized
          enterprises SMEs across Pampanga, Philippines, succeed by providing
          innovative tools and tailored solutions. Our mission is to support
          local businesses in enhancing their operations, increasing visibility,
          and staying competitive in today’s dynamic market.
        </p>
      </div>

      <div>
        <p className="text-xl font-medium mb-5">COMPANY</p>
        <ul className="flex flex-col gap-1 text-gray-600">
                <li>Home</li>
                <li>About Us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
        </ul>
      </div>

      <div>
        <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
        <ul className="flex flex-col gap-1 text-gray-600">
            <li>09913234797</li>
            <li>contact@sellswift.com</li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
