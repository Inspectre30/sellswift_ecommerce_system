import validator from "validator";
import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import transporter from "../config/nodemailer.js";
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};


//ALWAYS CHECK WHICH BRANCH YOU ARE IN(AUTH-FEATURE)

//Route for user login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({ success: false, msg: "Email and password required!" });
  }
  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User doesn't exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    //password verification
    if (isMatch) {
      const token = createToken(user._id);
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      if (user.role === "customer") {
        res.json({ success: true, role: "customer", token });
      } else if (user.role === "seller") {
        res.json({ success: true, role: "seller", token });
      } else {
        res.json({ success: false, msg: "Unauthorized role" });
      }
    } else {
      res.json({ success: false, msg: "Invalid password" });
    }
  } catch (err) {
    console.log(err);
    res.json({ success: false, msg: err.message });
  }
};

//route for register
const registerUser = async (req, res) => {
  const { name, email, password, role = "customer",phoneNumber } = req.body;
  if (!name || !email || !password || !phoneNumber) {
    return res.json({ success: false, msg: "Missing Details!" });
  }
  try {
    // Validate email and password
    if (!validator.isEmail(email)) {
      return res.json({ success: false, msg: "Invalid email address" });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        msg: "Password must be at least 8 characters",
      });
    }
    // Check if user already exists

    const exist = await userModel.findOne({ email });

    if (exist) {
      return res.json({ success: false, msg: "User already exists" });
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      phone: phoneNumber,
      role,
    });

    await newUser.save();

    const token = createToken(newUser._id);

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
      subject: "Welcome to SellSwift",
      text: `Welcome to SellSwift website. Your account has been created with email id: ${email}`,
    };

    await transporter.sendMail(mailOptions);

    //1:24:36
    res.json({
      success: true,
      msg: "Registration successful. Please check your email for verification.",
    });
  } catch (err) {
    console.log(err);
    res.json({ success: false, msg: err.message });
  }
};

//logout feature
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

const sendVerifyOtp = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await userModel.findById(userId);
    if (user.isAccountVerified) {
      return res.json({ success: false, msg: "Account already verified." });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));

    user.verifyOtp = otp;
    user.verifyOtpExpireAt = Date.now() + 3 * 60 * 1000;
    await user.save();

    const mailOption = {
      from: process.env.ADMIN_EMAIL,
      to: user.email,
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
    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, msg: "User not found" });
    }
    if (user.verifyOtp === "" || user.verifyOtp !== otp) {
      return res.json({ success: false, msg: "Invalid Otp" });
    }
    if (user.verifyExpireAt < Date.now()) {
      return res.json({ success: false, msg: "OTP expired" });
    }
    user.isAccountVerified = true;
    user.verifyOtp = "";
    user.verifyOtpExpireAt = 0;
    await user.save();

    return res.json({ success: true, msg: "Email verified successfully." });
  } catch (error) {
    return res.json({ success: false, msg: error.message });
  }
};
//check if user is authenticated
const isAuthenticated = async (req, res) => {
  try {
    return res.json({ success: true });
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
    const user = await userModel.findOne({email});

    if (!user) {
      return res.json({ success: false, msg: "User not found" });
    }
    const otp = String(Math.floor(100000 + Math.random() * 900000));

    user.resetOtp = otp;
    user.resetOtpExpireAt = Date.now() + 3 * 60 * 1000;
    await user.save();

    const mailOption = {
      from: process.env.ADMIN_EMAIL,
      to: user.email,
      subject: "Password Reset OTP",
      text: `Your OTP for resetting your password is ${otp}. Use this OTP to proceed with resetting your password.`,
    };
    await transporter.sendMail(mailOption);

    return res.json({ success: true, msg: "OTP sent to your email" });
  } catch (error) {
    return res.json({ success: false, msg: error.message });
  }
};

//reset user password
const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  if (!email || !otp || !newPassword) {
    return res.json({
      success: false,
      msg: "Email, OTP, and new password are required.",
    });
  }

  try {
    const user = await userModel.findOne({email});
    if(!user) {
      return res.json({ success: false, msg: "User not found" });
    }

    if(user.resetOtp === '' || user.resetOtp !== otp) {
      return res.json({success:false, msg:"Invalid OTP"})
    }
    if(user.resetOtpExpireAt < Date.now()) {
      return res.json({success:false, msg:"OTP Expired."})
    }
    const hashedPassword = await bcrypt.hash(newPassword,10)

    user.password = hashedPassword
    user.resetOtp = ''
    user.resetOtpExpireAt = 0;
    await user.save();

    res.json({success:true, msg:"Password has been reset successfully."})
  } catch (error) {
    return res.json({ success: false, msg: error.message });
  }
};
//route for admins

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, msg: "Invalid Credentials" });
    }
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: err.message });
  }
};

export {
  loginUser,
  registerUser,
  adminLogin,
  logout,
  sendVerifyOtp, 
  verifyEmail,
  isAuthenticated,
  sendResetOtp,
  resetPassword,
};
