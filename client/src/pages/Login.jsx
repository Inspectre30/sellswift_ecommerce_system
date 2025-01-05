import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { parsePhoneNumberFromString } from 'libphonenumber-js';

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const { navigate, backendUrl, getUserData, setIsLoggedIn } = useContext(ShopContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isPhoneValid, setIsPhoneValid] = useState(true);

  // Phone number validation function
  const validatePhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return true;
    const phoneNumberObj = parsePhoneNumberFromString(phoneNumber, "PH");
    return phoneNumberObj ? phoneNumberObj.isValid() : false;
  };

  const onSubmitHandler = async (event) => {
    try {
      event.preventDefault();

      axios.defaults.withCredentials = true;

      if (currentState === "Sign Up" && !validatePhoneNumber(phoneNumber)) {
        toast.error("Invalid phone number. Please enter a valid phone number.");
        return;
      }

      if (currentState === "Sign Up") {
        const response = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
          phoneNumber,
        });
        if (response.data.success) {
          navigate("/verify-email", { replace: true });
          const verify = await axios.post(`${backendUrl}/api/user/send-verify-otp`);
          getUserData();
          setIsLoggedIn(true);
          toast.success(verify.data.msg);
        } else {
          toast.error(response.data.msg);
        }
      } else {
        const response = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });
        if (response.data.success) {
          getUserData();
          setIsLoggedIn(true);
          navigate("/");
        } else {
          toast.error(response.data.msg);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      {currentState === "Login" ? (
        ""
      ) : (
        <div className="w-full max-w-md">
              <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            className="w-full px-3 py-2 border border-gray-800 mb-4"
            placeholder="Name"
            required
          />
          <input
            onChange={(e) => {
              setPhoneNumber(e.target.value);
              setIsPhoneValid(validatePhoneNumber(e.target.value));
            }}
            value={phoneNumber}
            type="text"
            className={`w-full px-3 py-2 border ${isPhoneValid ? "border-gray-800" : "border-red-500"}`}
            placeholder="Phone Number"
            required
          />
          {!isPhoneValid && (
            <p className="text-red-500 text-xs mt-2">Please enter a valid number</p>
          )}
        </div>
      )}

      <div className="w-full max-w-md">
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          className="w-full px-3 py-2 border border-gray-800 mb-4"
          placeholder="Email"
          required
        />

        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="w-full px-3 py-2 border border-gray-800 mb-4"
          placeholder="Password"
          required
        />
      </div>

      <div className="w-full flex justify-between text-sm mt-[8px] max-w-md">
        <Link to="/reset-password">
          <p className="cursor-pointer">Forgot your password?</p>
        </Link>
        {currentState === "Login" ? (
          <p
            onClick={() => setCurrentState("Sign Up")}
            className="cursor-pointer"
          >
            Create Account
          </p>
        ) : (
          <p
            onClick={() => setCurrentState("Login")}
            className="cursor-pointer"
          >
            Login Here
          </p>
        )}
      </div>
      <button
        disabled={!isPhoneValid && currentState === "Sign Up"}
        className="bg-black text-white font-light px-8 py-2 mt-4 max-w-md w-full"
      >
        {currentState === "Login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;

// import { useContext, useState } from "react";
// import { ShopContext } from "../context/ShopContext";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { Link } from "react-router-dom";
// import { parsePhoneNumberFromString } from "libphonenumber-js";
// const Login = () => {
//   const [currentState, setCurrentState] = useState("Login");
//   const { navigate, backendUrl, getUserData, setIsLoggedIn } =
//     useContext(ShopContext);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [isPhoneValid, setIsPhoneValid] = useState(true);
//   // Phone number validation function
//   const validatePhoneNumber = (phoneNumber) => {
//     if (!phoneNumber) return true;
//     const phoneNumberObj = parsePhoneNumberFromString(phoneNumber, "PH");
//     return phoneNumberObj ? phoneNumberObj.isValid() : false;
//   };
//   const onSubmitHandler = async (event) => {
//     try {
//       event.preventDefault();

//       axios.defaults.withCredentials = true;

//       if (currentState === "Sign Up" && !validatePhoneNumber(phoneNumber)) {
//         toast.error("Invalid phone number. Please enter a valid phone number.");
//         return;
//       }
//       if (currentState === "Sign Up") {
//         const response = await axios.post(backendUrl + "/api/user/register", {
//           name,
//           email,
//           password,
//           phoneNumber,
//         });
//         if (response.data.success) {
//           navigate("/verify-email", { replace: true });
//           const verify = await axios.post(
//             backendUrl + "/api/user/send-verify-otp"
//           );
//           getUserData();
//           setIsLoggedIn(true);

//           toast.success(verify.data.msg);
//         } else {
//           toast.error(response.error.msg);
//         }
//       } else {
//         const response = await axios.post(backendUrl + "/api/user/login", {
//           email,
//           password,
//         });
//         if (response.data.success) {
//           getUserData();
//           setIsLoggedIn(true);
//           navigate("/");
//         } else {
//           toast.error(response.data.msg);
//         }
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//   };

//   return (
//     <form
//       onSubmit={onSubmitHandler}
//       className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
//     >
//       <div className="inline-flex items-center gap-2 mb-2 mt-10">
//         <p className="text-3xl">{currentState}</p>
//         <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
//       </div>
//       {currentState === "Login" ? (
//         ""
//       ) : (
//         <div>
//           <input
//             onChange={(e) => setName(e.target.value)}
//             value={name}
//             type="text"
//             className="w-full px-3 py-2 border border-gray-800 mb-4"
//             placeholder="Name"
//             required
//           />
//           <div>
//             {" "}
//             <input
//               onChange={(e) => {
//                 setPhoneNumber(e.target.value);
//                 setIsPhoneValid(validatePhoneNumber(e.target.value));
//               }}
//               value={phoneNumber}
//               type="text"
//               className={`w-full px-3 py-2 border ${
//                 isPhoneValid ? "border-gray-800" : "border-red-500"
//               }`}
//               placeholder="Phone Number"
//               required
//             />{" "}
//             {!isPhoneValid && (
//               <p className="text-red-500 text-xs mt-2">
//                 Please enter a valid number
//               </p>
//             )}{" "}
//           </div>
//         </div>
//       )}

//       <input
//         onChange={(e) => setEmail(e.target.value)}
//         type="email"
//         className="w-full px-3 py-2 border border-gray-800"
//         placeholder="Email"
//         required
//       />

//       <input
//         onChange={(e) => setPassword(e.target.value)}
//         type="password"
//         className="w-full px-3 py-2 border border-gray-800"
//         placeholder="Password"
//         required
//       />

//       <div className="w-full flex justify-between text-sm mt-[8px]">
//         <Link to="/reset-password">
//           <p className="cursor-pointer">Forgot your password?</p>
//         </Link>
//         {currentState === "Login" ? (
//           <p
//             onClick={() => setCurrentState("Sign Up")}
//             className="cursor-pointer"
//           >
//             Create Account
//           </p>
//         ) : (
//           <p
//             onClick={() => setCurrentState("Login")}
//             className="cursor-pointer"
//           >
//             Login Here
//           </p>
//         )}
//       </div>
//       <button
//         disabled={isPhoneValid}
//         className="bg-black text-white font-light px-8 py-2 mt-4"
//       >
//         {currentState === "Login" ? "Sign In" : "Sign Up"}
//       </button>
//     </form>
//   );
// };

// export default Login;
