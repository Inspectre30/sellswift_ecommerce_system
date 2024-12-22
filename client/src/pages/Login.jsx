import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, replace } from "react-router-dom";
//CONTINUE 3:47:25
const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const { navigate, backendUrl, setIsLoggedIn, getUserData} = useContext(ShopContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("")

  const onSubmitHandler = async (event) => {
    try {
      event.preventDefault();

      axios.defaults.withCredentials = true;
      if (currentState === "Sign Up") {
        const response = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
          phoneNumber,
          role,
        });
        if (response.data.success) {
          setCurrentState("Login");
          navigate("/verify-email", {replace:true});
          getUserData()

          const verify = await axios.post(backendUrl + "/api/user/send-verify-otp")
          console.log(verify.data.success);
          
        } else {
          toast.error(response.error.msg);
        }
      } else {
        const response = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });
        if (response.data.success) {
          setIsLoggedIn(true);
     
         
        } else {
          toast.error(response.data.msg);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

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
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Name"
          required
        />
      )}

      <input
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Email"
        required
      />

      <input
        onChange={(e) => setPhoneNumber(e.target.value)}
        type="number"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Phone Number"
        required
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Password"
        required
      />
      {currentState === "Sign Up" && (
        <div className="flex flex-col items-center">
          <p className="mb-2">Select a role</p>
          <select
            onChange={(e) => setRole(e.target.value.toLowerCase())}
            className="w-full px-3 py-2 bg-slate-100 rounded-sm"
          >
            <option value="Seller">Seller</option>
            <option value="Customer">Customer</option>
          </select>
        </div>
      )}
      <div className="w-full flex justify-between text-sm mt-[8px]">
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
      <button className="bg-black text-white font-light px-8 py-2 mt-4">
        {currentState === "Login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;
//3:21:04 https://www.youtube.com/watch?v=7BTsepZ9xp8&list=PLnOpVMdlIZbyxYQvVVkjpwNpbRS0Edzos&index=11
