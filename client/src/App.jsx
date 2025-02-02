
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Collection from "./pages/Collection";

import Orders from "./pages/Orders";
import PlaceOrder from "./pages/PlaceOrder";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Product from "./pages/Product";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import Profile from './pages/Profile'
import Messages from "./pages/Messages";
import VerifyEmail from "./pages/VerifyEmail";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ResetPassword from "./pages/ResetPassword";
import ResetPasswordForms from "./pages/ResetPassword";
import TermsAndPrivacy from "./pages/TermsAndPrivacy";
const App = () => {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <ToastContainer />
      <Navbar />
      <SearchBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/about" element={<About />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/orders" element={<Orders />} />
        <Route path='/profile' element={<Profile  />}/>
        <Route path='/messages' element={<Messages />}/>
        <Route path='/reset-password' element={<ResetPassword />}/>
        <Route path='/verify-email' element={<VerifyEmail />}/>
        <Route path='/reset-password' element={<ResetPasswordForms />}/>
        <Route path='/terms' element={<TermsAndPrivacy />} />
      
        
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
