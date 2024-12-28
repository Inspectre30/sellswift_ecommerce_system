import { useContext, useState, useRef, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";
//CURRENT TIMESTAMP 4:37:51

//START AGAIN THE PROCESS FROM LOGIN(3:29:20), LOGOUT, VERIFY EMAIL
const EmailVerifyOtp = () => {
  axios.defaults.withCredentials = true;
  const [otp, setOtp] = useState(Array(6).fill(""));
  const { backendUrl, userData, getUserData, navigate } = useContext(ShopContext);
  const inputRefs = useRef([]);

  

  const handleOtpChange = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); // Allow only numbers
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < otp.length - 1) {
        inputRefs.current[index + 1].focus(); // Use inputRefs to focus on the next input
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRefs.current[index - 1].focus(); // Use inputRefs to focus on the previous input
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text");
    if (pastedText.length === otp.length && /^\d+$/.test(pastedText)) {
      const newOtp = pastedText.split("");
      setOtp(newOtp);
      newOtp.forEach((digit, index) => {
        inputRefs.current[index].value = digit; // Update the input values directly
        if (index < otp.length - 1) {
          inputRefs.current[index + 1].focus(); // Move focus to the next input
        }
      });
    }
  };



  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const otpArray = inputRefs.current.map((e) => e.value);
      const otp = otpArray.join("");
      const { data } = await axios.post(backendUrl + "/api/user/verify-account", {
        otp,
      });

      if(data.success) {
        toast.success(data.msg)
        navigate('/')
      }else {
        toast.error(data.msg);
      }
    } catch (error) {
      toast.error(error.message)
    }
  };
  useEffect(() => {

  },[])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-300 to-blue-200">
      <form onSubmit={onSubmitHandler} className="bg-white text-black rounded-lg p-8 shadow-lg w-96">
        <h1 className="text-2xl font-semibold text-center mb-4">
          Email Verify OTP
        </h1>
        <p className="text-sm text-gray-400 text-center mb-6">
          Enter the 6-digit code sent to your email.
        </p>
        <div className="flex justify-center gap-2 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength={1}
              value={digit}
              onInput={(e) => handleOtpChange(e, index)} // Change onChange to onInput
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={index === 0 ? handlePaste : null} // Attach onPaste to the first input
              className="w-12 h-12 text-center text-2xl border border-gray-600 bg-gray-700 text-white rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              required
              ref={(el) => (inputRefs.current[index] = el)} // Assign refs to input elements
            />
          ))}
        </div>
        <button
         
          className="w-full py-2 bg-black text-white"
        >
          Verify email
        </button>
      </form>
    </div>
  );
};

export default EmailVerifyOtp;

// import { useContext, useState, useRef } from "react";
// import { ShopContext } from "../context/ShopContext";
// import { toast } from "react-toastify";

// //FIND A WAY TO ACCESS USERID TO PASS IT INSIDE THE POST METHOD IN AXIOS
// const EmailVerifyOtp = () => {
//   const [otp, setOtp] = useState(Array(6).fill(""));
//   const {backendUrl } = useContext(ShopContext)

//   const inputRefs = useRef([])
//   const handleOtpChange = (e, index) => {
//     const value = e.target.value.replace(/[^0-9]/g, ""); // Allow only numbers
//     if (value.length <= 1) {
//       const newOtp = [...otp];
//       newOtp[index] = value;
//       setOtp(newOtp);

//       if (value && index < otp.length - 1) {
//         document.getElementById(`otp-${index + 1}`).focus();
//       }
//     }
//   };
//   const handleKeyDown =  (e, index) => {
//     if(e.key === 'Backspace' &&  e.target.value === '' & index > 0) {
//       document.getElementById(`otp-${index - 1}`).focus();
//     }
//   }

//   const handleVerifyEmail = async () => {
//     try {
//       const verify = await axios.post(backendUrl + '/api/user/verify-email', {
//         otp
//       });
//       if(verify.data.success) {
//         toast(verify.data.msg)
//       }

//     } catch (error) {
//       console.log(error.message)
//     }

//     console.log("OTP Entered:", otp.join(""));
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-300 to-blue-200">

//       <form className="bg-white text-black rounded-lg p-8 shadow-lg w-96">
//         <h1 className="text-2xl font-semibold text-center mb-4">
//           Email Verify OTP
//         </h1>
//         <p className="text-sm text-gray-400 text-center mb-6">
//           Enter the 6-digit code sent to your email.
//         </p>
//         <div className="flex justify-center gap-2 mb-6">
//           {otp.map((digit, index) => (
//             <input
//               key={index}
//               id={`otp-${index}`}
//               type="text"
//               maxLength={1}
//               value={digit}
//               onChange={(e) => handleOtpChange(e, index)}
//               className="w-12 h-12 text-center text-2xl border border-gray-600 bg-gray-700 text-white rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
//               required
//               ref={e => inputRefs.current[index] = e}
//             />
//           ))}
//         </div>
//         <button
//           onClick={handleVerifyEmail}
//           className="w-full py-2 bg-black text-white"
//         >
//           Verify email
//         </button>
//       </form>
//     </div>
//   );
// };

// export default EmailVerifyOtp;
