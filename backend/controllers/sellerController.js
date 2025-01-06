import validator from "validator";
import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import transporter from "../config/nodemailer.js";
import sellerModel from "../models/sellerModel.js";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};
//register seller api
const registerSeller = async (req, res) => {
  const { email, password, phoneNumber, storename } = req.body;

  if (!email || !password || !phoneNumber || !storename) {
    return res.json({ success: false, msg: "Missing Details!" });
  }
  try {
    if (!validator.isEmail(email)) {
      return res.json({ success: false, msg: "Invalid email address" });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        msg: "Password must be at least 8 characters",
      });
    }
    const exist = await sellerModel.findOne({ email });

    if (exist) {
      return res.json({ success: false, msg: "This email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newSeller = new sellerModel({
      storeName: storename,
      email: email,
      password: hashedPassword,
      phone: phoneNumber,
    });
    await newSeller.save();

    const token = createToken(newSeller._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    //send email
    const mailOptions = {
      from: process.env.ADMIN_EMAIL,
      to: email,
      subject: "Verify Your Email",
      text: `Welcome to SellSwift website. Your account has been created with email id: ${email}`,
    };

    await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      msg: "Registration successful. Please check your email for verification.",
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, msg: error.message });
  }
};

//seller login api
//TEST THE LOGIN API
const sellerLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({ success: false, msg: "Email and password required!" });
  }
  try {
    const seller = await sellerModel.findOne({ email });

    if (!seller) {
      return res.json({ success: false, message: "User doesn't exist" });
    }

    const isMatch = await bcrypt.compare(password, seller.password);
    //password verification
    if (isMatch) {
      const token = createToken(seller._id);
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
    } else {
      res.json({ success: false, msg: "Invalid password" });
    }
    res.json({ success: true, msg: "Successfully logged in" });
  } catch (err) {
    console.log(err.message);
    res.json({ success: false, msg: err.message });
  }
};

//seller logout
const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });
    return res.json({ success: true, msg: "Successfully Logged out" });
  } catch (error) {
    return res.json({ success: false, msg: error.message });
  }
};

//seller otp verify
const sendVerifyOtp = async (req, res) => {
  try {
    const { userId } = req.body;

    const seller = await userModel.findById(userId);
    if (seller.isAccountVerified) {
      return res.json({ success: false, msg: "Account already verified." });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));

    seller.verifyOtp = otp;
    seller.verifyOtpExpireAt = Date.now() + 3 * 60 * 1000;
    await seller.save();

    const mailOption = {
      from: process.env.ADMIN_EMAIL,
      to: seller.email,
      subject: "Account Verification OTP",
      text: `Your OTP is ${otp}. Verify your account using this OTP`,
    };
    await transporter.sendMail(mailOption);
    res.json({ success: true, msg: "Verification OTP Sent on Email." });
  } catch (error) {
    return res.json({ success: false, msg: error.message });
  }
};

const verifyEmail = async (req, res) => {
  const { userId, otp } = req.body;
  if (!userId || !otp) {
    return res.json({ success: false, msg: "Missing Details" });
  }
  try {
    const seller = await sellerModel.findById(userId);
    if (!seller) {
      return res.json({ success: false, msg: "User not found" });
    }
    if (seller.verifyOtp === "" || user.verifyOtp !== otp) {
      return res.json({ success: false, msg: "Invalid Otp" });
    }
    if (seller.verifyExpireAt < Date.now()) {
      return res.json({ success: false, msg: "OTP expired" });
    }
    seller.isAccountVerified = true;
    seller.verifyOtp = "";
    seller.verifyOtpExpireAt = 0;
    await seller.save();

    return res.json({ success: true, msg: "Email verified successfully." });
  } catch (error) {
    return res.json({ success: false, msg: error.message });
  }
};
//check if seller is authenticated
const isAuthenticated = async (req, res) => {
  try {
    return res.json({ success: true , msg: "You're authenticated successfully "});
  } catch (error) {
    return res.json({ success: false, msg: error.message });
  }
};

//send password reset otp
const sendResetOtp = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.json({ success: false, msg: "Email is required" });
  }

  try {
    const seller = await userModel.findOne({ email });

    if (!seller) {
      return res.json({ success: false, msg: "User not found" });
    }
    const otp = String(Math.floor(100000 + Math.random() * 900000));

    seller.resetOtp = otp;
    seller.resetOtpExpireAt = Date.now() + 3 * 60 * 1000;
    await seller.save();

    const mailOption = {
      from: process.env.ADMIN_EMAIL,
      to: seller.email,
      subject: "Password Reset OTP",
      text: `Your OTP for resetting your password is ${otp}. Use this OTP to proceed with resetting your password.`,
    };
    await transporter.sendMail(mailOption);

    return res.json({ success: true, msg: "OTP sent to your email" });
  } catch (error) {
    return res.json({ success: false, msg: error.message });
  }
};
//reset seller password
const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  if (!email || !otp || !newPassword) {
    return res.json({
      success: false,
      msg: "Email, OTP, and new password are required.",
    });
  }

  try {
    const seller = await sellerModel.findOne({ email });
    if (!seller) {
      return res.json({ success: false, msg: "User not found" });
    }

    if (seller.resetOtp === "" || user.resetOtp !== otp) {
      return res.json({ success: false, msg: "Invalid OTP" });
    }
    if (seller.resetOtpExpireAt < Date.now()) {
      return res.json({ success: false, msg: "OTP Expired." });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    seller.password = hashedPassword;
    seller.resetOtp = "";
    seller.resetOtpExpireAt = 0;
    await user.save();

    res.json({ success: true, msg: "Password has been reset successfully." });
  } catch (error) {
    return res.json({ success: false, msg: error.message });
  }
};

export {
  registerSeller,
  sellerLogin,
  logout,
  verifyEmail,
  sendVerifyOtp,
  sendResetOtp,
  resetPassword,
  isAuthenticated,
};
