import React from 'react'
import { assets } from '../assets/assets/frontend_assets/assets';

const Profile = () => {



  const handleUpdate = (e) => {
    e.preventDefault();
    // Implement update logic here to send data to backend
  };
  
  return (
    <div className="flex flex-col items-center min-h-screen py-10">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Your Profile</h1>
      <form onSubmit={handleUpdate} className="w-full max-w-md space-y-4 flex flex-col items-center">
        
        {/* Avatar upload section */}
        <div className="relative mb-4">
          <img
            src={assets.profile_icon}
            alt="Profile"
            className="w-36 h-36 rounded-full border-4 border-black cursor-pointer hover:opacity-80"
            onClick={() => document.getElementById('fileInput').click()}
          />
          <input
            type="file"
            id="fileInput"
            className="hidden"
            // onChange={handleAvatarChange}
          />
          <div
            className="absolute bottom-3 left-24 bg-black text-white p-2 rounded-full cursor-pointer hover:bg-indigo-600 transition"
            onClick={() => document.getElementById('fileInput').click()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 20v-8m-4 4h8"
              />
            </svg>
          </div>
        </div>

        {/* User info */}
        <div className=" p-6 bg-white rounded-lg shadow-2xl space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              // value={name}
              // onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              // value={email}
              // onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="number"
              // value={phone}
              // onChange={(e) => setPhone(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Address
            </label>
            <input
              type="text"
              // value={address}
              // onChange={(e) => setAddress(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 cursor-pointer"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default Profile