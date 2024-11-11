import { useContext, useState, useEffect } from "react";
import { assets } from "../assets/assets/frontend_assets/assets";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Profile = () => {
  // const { backendUrl, token } = useContext(ShopContext);
  // const [userData, setUserData] = useState({
  //   name: "",
  //   email: "",
  //   phone: "",
  //   address: "",
  //   avatar: "", // Cloudinary image URL
  // });
  // const [file, setFile] = useState(null);

  // useEffect(() => {
  //   // Fetch user data on component mount
  //   const fetchUserData = async () => {
  //     try {
  //       // or wherever you're storing the JWT tokenF
  //       const response = await axios.get(backendUrl + '/api/profile/get', {headers: {token}}); // Adjust to your API endpoint
        
  //       console.log(response.data.user);
      
  //     } catch (error) {
  //       toast.error(error.message);
  //       console.error("Error fetching user data:", error.message);
  //     }
  //   };
  //   fetchUserData();
  // }, []);

  // // Handle input change
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setUserData({ ...userData, [name]: value });
  //   console.log(value);
  // };

  // // Handle file selection for avatar
  // const handleFileChange = (e) => {
  //   setFile(e.target.files[0]);
  // };

  // // Submit profile updates
  // const handleUpdate = async (e) => {
  //   e.preventDefault();
  //   const formData = new FormData();
  //   formData.append("name", userData.name);
  //   formData.append("email", userData.email);
  //   formData.append("phone", userData.phone);
  //   formData.append("address", userData.address);
  //   if (file) formData.append("avatar", file); // Append file if selected

  //   try {
  //     const response = await axios.patch(
  //       backendUrl + "/api/profile/update",
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //         Authorization: `Bearer ${token}`,
  //       }
  //     );
  //     toast.success("Profile updated successfully!");
  //     setUserData(response.data.user); // Update profile display
  //   } catch (error) {
  //     console.error("Error updating profile:", error.message);
  //     toast.error("Failed to update profile.");
  //   }
  // };

  return (
    <div className="flex flex-col items-center min-h-screen py-10">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        Your Profile
      </h1>
      <form
        // onSubmit={handleUpdate}
        className="w-full max-w-md space-y-4 flex flex-col items-center"
      >
        {/* Avatar upload section */}
        <div className="relative mb-4">
          <img
            src={assets.profile_icon} // Use the avatar if available
            alt="Profile"
            className="w-36 h-36 rounded-full border-4 border-black cursor-pointer hover:opacity-80"
            onClick={() => document.getElementById("fileInput").click()}
          />
          <input
            type="file"
            id="fileInput"
            className="hidden"
            //onChange={handleFileChange} // Bind the file change handler
          />
          <div
            className="absolute bottom-3 left-24 bg-black text-white p-2 rounded-full cursor-pointer hover:bg-indigo-600 transition"
            //onClick={() => document.getElementById("fileInput").click()}
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
              name="name" // Bind name to userData
              //value={userData.name} // Use state value
              //onChange={handleChange} // Bind the change handler
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email" // Bind email to userData
              //value={userData.email} // Use state value
              //onChange={handleChange} // Bind the change handler
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="number"
              name="phone" // Bind phone to userData
             // value={userData.phone} // Use state value
              //onChange={handleChange} // Bind the change handler
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Address
            </label>
            <input
              type="text"
              name="address" // Bind address to userData
              //value={userData.address} // Use state value
              //onChange={handleChange} // Bind the change handler
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
