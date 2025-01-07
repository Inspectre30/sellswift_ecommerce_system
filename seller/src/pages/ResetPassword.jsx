import { useContext, useState, useRef } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { SellerContext } from "../context/SellerContext";

const ResetPassword = () => {
  axios.defaults.withCredentials = true;

  const { backendUrl, navigate,setShowResetPassword } = useContext(SellerContext);
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [joinedOtp, setJoinedOtp] = useState(""); // New state for joined OTP string
  const [newPassword, setNewPassword] = useState("");
  const inputRefs = useRef([]);

  const handleOtpChange = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < otp.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text");
    if (pastedText.length === otp.length && /^\d+$/.test(pastedText)) {
      const newOtp = pastedText.split("");
      setOtp(newOtp);
      newOtp.forEach((digit, index) => {
        inputRefs.current[index].value = digit;
        if (index < otp.length - 1) {
          inputRefs.current[index + 1].focus();
        }
      });
    }
  };

  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${backendUrl}/api/seller/send-reset-otp`, { email });
      if (data.success) {
        toast.success(data.msg);
        setStep(2);
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSubmitOtp = async (e) => {
    e.preventDefault();
    const otpArray = inputRefs.current.map(e => e.value);
    setOtp(otpArray);
    setJoinedOtp(otpArray.join('')); // Store the joined OTP in the new state
    setStep(3)
  };

  const handleSubmitNewPassword = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${backendUrl}/api/seller/reset-password`, { email, otp: joinedOtp, newPassword });
      if (data.success) {
        toast.success(data.msg);
        setShowResetPassword(false)
        navigate("/login");
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-300 to-blue-200">
      {step === 1 && (
        <form onSubmit={handleSubmitEmail} className="bg-white text-black rounded-lg p-8 shadow-lg w-96">
          <h1 className="text-2xl font-semibold text-center mb-4">Reset Password</h1>
          <p className="text-sm text-gray-400 text-center mb-6">
            Enter your email address to reset your password.
          </p>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-600 bg-gray-700 text-white rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
          <button className="w-full py-2 bg-black text-white">Submit</button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleSubmitOtp} className="bg-white text-black rounded-lg p-8 shadow-lg w-96">
          <h1 className="text-2xl font-semibold text-center mb-4">Verify OTP</h1>
          <p className="text-sm text-gray-400 text-center mb-6">
            Enter the 6-digit code sent to your email.
          </p>
          <div className="flex justify-between mb-8" onPaste={handlePaste}>
            {Array(6).fill(0).map((_, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={otp[index]}
                onInput={(e) => handleOtpChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md"
                ref={(el) => inputRefs.current[index] = el}
                required
              />
            ))}
          </div>
          <button className="w-full py-2 bg-black text-white">Verify OTP</button>
        </form>
      )}

      {step === 3 && (
        <form onSubmit={handleSubmitNewPassword} className="bg-white text-black rounded-lg p-8 shadow-lg w-96">
          <h1 className="text-2xl font-semibold text-center mb-4">New Password</h1>
          <p className="text-sm text-gray-400 text-center mb-6">
            Create a new password for your account.
          </p>
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-600 bg-gray-700 text-white rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
          <button className="w-full py-2 bg-black text-white">Set Password</button>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;