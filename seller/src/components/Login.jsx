import { useState } from "react";
import { backendUrl } from "../App";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { parsePhoneNumberFromString } from "libphonenumber-js";


const Login = () => {
  const [currentState, setCurrentState] = useState("Login"); // State for toggling forms
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [storeName, setStoreName] = useState("");
  const navigate = useNavigate();
  const [isPhoneValid, setIsPhoneValid] = useState(true);

  // Phone number validation function
  const validatePhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return true;
    const phoneNumberObj = parsePhoneNumberFromString(phoneNumber, "PH");
    return phoneNumberObj ? phoneNumberObj.isValid() : false;
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      axios.defaults.withCredentials = true;

      if (currentState === "Sign Up" && !validatePhoneNumber(phoneNumber)) {
        toast.error("Invalid phone number. Please enter a valid phone number.");
        return;
      }

      if (currentState === "Login") {
        const response = await axios.post(backendUrl + "/api/seller/login", {
          email,
          password,
        });

        if (response.data.success) {
          toast.success(response.data.msg);
          navigate("/add");
        } else {
          toast.error(response.data.msg);
        }
      } else if (currentState === "SignUp") {
        const response = await axios.post(backendUrl + "/api/seller/register", {
          email,
          password,
          phoneNumber,
          storename: storeName,
        });

        if (response.data.success) {
          navigate("/verify-email", { replace: true });
          toast.success(response.data.msg);
        
        } else {
          toast.error(response.data.msg);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full">
      <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
        <h1 className="text-2xl font-bold mb-4">
          {currentState === "Login" ? "Login" : "Sign Up"}
        </h1>
        <form onSubmit={onSubmitHandler}>
          {currentState === "SignUp" && (
            <>
              <div className="mb-3 min-w-72">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Store Name
                </p>
                <input
                  onChange={(e) => setStoreName(e.target.value)}
                  value={storeName}
                  className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
                  type="text"
                  placeholder="Enter your store name"
                  required
                />
              </div>
            </>
          )}
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Email Address
            </p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
              type="email"
              placeholder="your@email.com"
              required
            />
          </div>
          {currentState === "SignUp" && (
            <>
              <div className="mb-3 min-w-72">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </p>
                <input
            onChange={(e) => {
              setPhoneNumber(e.target.value);
              setIsPhoneValid(validatePhoneNumber(e.target.value));
            }}
            value={phoneNumber}
            type="text"
            className={`w-full px-3 py-2 border outline-none ${isPhoneValid ? "border-gray-300" : "border-red-500"}`}
            placeholder="Phone Number"
            required
          />
          {!isPhoneValid && (
            <p className="text-red-500 text-xs mt-2">Please enter a valid phone number</p>
          )}
              </div>
            </>
          )}
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
              type="password"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
          disabled={!isPhoneValid}
            className="mt-2 w-full py-2 px-4 rounded-md text-white bg-black"
            type="submit"
          >
            {currentState === "Login" ? "Login" : "Sign Up"}
          </button>
        </form>
        <div className="mt-4 text-center">
          {currentState === "Login" ? (
            <p className="text-sm">
              Don't have an account?{" "}
              <span
                className="text-blue-600 cursor-pointer"
                onClick={() => setCurrentState("SignUp")}
              >
                Sign Up
              </span>
            </p>
          ) : (
            <p className="text-sm">
              Already have an account?{" "}
              <span
                className="text-blue-600 cursor-pointer"
                onClick={() => setCurrentState("Login")}
              >
                Login
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;

// import { useState } from "react";
// import { backendUrl } from "../App";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();
//   const onSubmitHandler = async (e) => {
//     try {

//       e.preventDefault();
//       axios.defaults.withCredentials = true
//       const token = document.cookie
//         .split("; ")
//         .find((row) => row.startsWith("token="))
//         ?.split("=")[1];
//       if (!token) {
//         setIsLoggedIn(false);
//       } // No token found, user is not logged in return; }
//       const response = await axios.post(backendUrl + "/api/seller/login", {
//         email,
//         password,
//      });
//      if(response.data.success){
//       toast.success(response.data.msg)
//       navigate("/add")
//      }

//     } catch (error) {
//       console.log(error);
//       toast.error(response.data.msg);
//     }
//   };
//   return (
//     <div className="min-h-screen flex items-center justify-center w-full">
//       <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
//         <h1 className="text-2xl font-bold mb-4">Seller Panel</h1>
//         <form onSubmit={onSubmitHandler}>
//           <div className="mb-3 min-w-72">
//             <p className="text-sm font-medium text-gray-700 mb-2">
//               Email Address
//             </p>
//             <input
//               onChange={(e) => setEmail(e.target.value)}
//               value={email}
//               className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
//               type="email"
//               placeholder="your@email.com"
//               required
//             />
//           </div>
//           <div className="mb-3 min-w-72">
//             <p className="text-sm font-medium text-gray-700 mb-2">Password</p>
//             <input
//               onChange={(e) => setPassword(e.target.value)}
//               value={password}
//               className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
//               type="password"
//               placeholder="Enter your password"
//               required
//             />
//           </div>
//           <button
//             className="mt-2 w-full py-2 px-4 rounded-md text-white bg-black"
//             type="submit"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;
