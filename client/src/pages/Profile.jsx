import { useContext, useState, useEffect } from "react";
import { assets } from "../assets/assets/frontend_assets/assets";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
//NOW DO THE getUserData() everytime this component render to fetch the latest userData
const Profile = () => {
  const { userData, backendUrl,getUser } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    name: userData.name || "",
    email: userData.email || "",
    phone: userData.phone || "",
    address: userData.address || "",
    street: userData.street || "",
    zipcode: userData.zipcode || "",
    avatar: userData.avatar || ""
  });
  const [avatarFile, setAvatarFile] = useState(null);

  useEffect(() => {
    setFormData({
      name: userData.name || "",
      email: userData.email || "",
      phone: userData.phone || "",
      address: userData.address || "",
      street: userData.street || "",
      zipcode: userData.zipcode || "",
      avatar: userData.avatar || ""
    });
  }, [userData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setAvatarFile(e.target.files[0]);
  };

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

      const response = await axios.put(backendUrl + "/api/profile/profile-update", formDataToSend,{
        headers: {"Content-Type": "multipart/form-data"}
      });
      if(response.data.success) {
        toast.success("Profile updated successfully!");
      }else {
        toast.error(response.data.message)
      }
    
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen py-10">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Your Profile</h1>
      <form
        onSubmit={profileUpdate}
        className="w-full max-w-md space-y-4 flex flex-col items-center"
      >
        {/* Avatar upload section */}
        <div className="relative mb-4">
          <img
            src={avatarFile ? URL.createObjectURL(avatarFile) : formData.avatar || assets.profile_icon}
            alt="Profile"
            className="w-36 h-36 rounded-full border-4 border-black cursor-pointer hover:opacity-80"
            onClick={() => document.getElementById("fileInput").click()}
          />
          <input
            type="file"
            id="fileInput"
            className="hidden"
            onChange={handleFileChange}
          />
          <div
            className="absolute bottom-3 left-24 bg-black text-white p-2 rounded-full cursor-pointer hover:bg-indigo-600 transition"
            onClick={() => document.getElementById("fileInput").click()}
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
        <div className="p-6 bg-white rounded-lg shadow-2xl space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Street
            </label>
            <input
              type="text"
              name="street"
              value={formData.street}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Zip Code
            </label>
            <input
              type="text"
              name="zipcode"
              value={formData.zipcode}
              onChange={handleChange}
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
};

export default Profile;
