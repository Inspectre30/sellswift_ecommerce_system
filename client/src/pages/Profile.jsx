import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext"; // Replace with the actual path to your context
import { assets } from "../assets/assets/frontend_assets/assets";

const Profile = () => {
  const { backendUrl, userData, getUserData } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    street: "",
    zipcode: "",
    avatar: assets.profile_icon, 
  });
  const [avatarFile, setAvatarFile] = useState(null);

 
  useEffect(() => {
    // console.log(userData)
    setFormData({
      name: userData.name || "",
      email: userData.email || "",
      phone: userData.phone || "",
      address: userData.address || "",
      street: userData.street || "",
      zipcode: userData.zipcode || "",
      avatar: userData.avatar || assets.profile_icon, 
    });
    // console.log("Updated formData after setting:", formData);
  }, [userData]);

  // Handle file input change
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setFormData({ ...formData, avatar: URL.createObjectURL(file) });
    }
  };

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Profile update function
  const profileUpdate = async (e) => {
    e.preventDefault();
    try {
      axios.defaults.withCredentials = true;
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }
      if (avatarFile) {
        formDataToSend.append("avatar", avatarFile);
      }

      const response = await axios.put(
        `${backendUrl}/api/profile/profile-update`,
        formDataToSend,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.data.success) {
        toast.success("Profile updated successfully!");
        await getUserData(); // Update userData after successful profile update
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="profile-container">
      <h1 className="text-center text-2xl font-bold mb-6">My Profile</h1>
      <form onSubmit={profileUpdate} className="flex flex-col items-center">
        {/* Avatar */}
        <div className="mb-4">
          <label htmlFor="avatar-input">
            <img
              src={avatarFile ? URL.createObjectURL(avatarFile) : formData.avatar}
              alt="Profile"
              className="w-36 h-36 rounded-full border-4 border-black cursor-pointer hover:opacity-80"
            />
          </label>
          <input
            id="avatar-input"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarChange}
          />
        </div>

        {/* Form fields */}
        <div className="w-full max-w-md">
          <label className="block text-gray-700 font-bold mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />

          <label className="block text-gray-700 font-bold mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />

          <label className="block text-gray-700 font-bold mb-2">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />

          <label className="block text-gray-700 font-bold mb-2">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />

          <label className="block text-gray-700 font-bold mb-2">Street</label>
          <input
            type="text"
            name="street"
            value={formData.street}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />

          <label className="block text-gray-700 font-bold mb-2">Zipcode</label>
          <input
            type="text"
            name="zipcode"
            value={formData.zipcode}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
        </div>

        {/* Save Changes Button */}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default Profile;




