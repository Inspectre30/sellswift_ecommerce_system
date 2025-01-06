import {useState,useRef}from 'react'

const EmailVerification = () => {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const inputRefs = useRef([]);
  
    const handleOtpChange = (e, index) => {
      const value = e.target.value.replace(/\D/g, ""); // Allow only digits
      if (value.length === 1) {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
  
        // Focus on the next input
        if (index < otp.length - 1) {
          inputRefs.current[index + 1]?.focus();
        }
      }
    };
  
    const handleKeyDown = (e, index) => {
      if (e.key === "Backspace" && !otp[index]) {
        // Focus on the previous input
        if (index > 0) {
          inputRefs.current[index - 1]?.focus();
        }
      }
    };
  
    const handlePaste = (e) => {
      e.preventDefault();
      const pasteData = e.clipboardData.getData("text").replace(/\D/g, ""); // Allow only digits
      if (pasteData.length === otp.length) {
        setOtp(pasteData.split(""));
        inputRefs.current[otp.length - 1]?.focus();
      }
    };
  
    const onSubmitHandler = async (e) => {
      try {
        e.preventDefault();
        const otpCode = otp.join("");
        console.log("Entered OTP:", otpCode);
        const response = await axios.post(backendUrl + "/api/seller/send-verify-otp");
        if(response.data.success) {
          toast.success(response.data.msg)
        }
      } catch (error) {
        console.log(error.message);
        toast.error(error.message)
      }
     
    };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-300 to-blue-200">
      <form onSubmit={onSubmitHandler} className="bg-white text-black rounded-lg p-8 shadow-lg w-96">
        <h1 className="text-2xl font-semibold text-center mb-4">Email Verify OTP</h1>
        <p className="text-sm text-gray-400 text-center mb-6">
          Enter the 6-digit code sent to your email.
        </p>
        <div className="flex justify-center gap-2 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={digit}
              onInput={(e) => handleOtpChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={index === 0 ? handlePaste : null}
              className="w-12 h-12 text-center text-2xl border border-gray-600 bg-gray-700 text-white rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              required
              ref={(el) => (inputRefs.current[index] = el)}
            />
          ))}
        </div>
        <button type="submit" className="w-full py-2 bg-black text-white">
          Verify email
        </button>
      </form>
    </div>
  )
}

export default EmailVerification
