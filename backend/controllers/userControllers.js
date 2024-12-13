import validator from "validator";
import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
// import nodemailer from "nodemailer";
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};
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
  const { name, email, password, role = "customer" } = req.body;
  if (!name || !email || !password) {
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

    // Create a new user with `verified` set to false
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
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
export const logout = async (req,res) => {
  try {
    res.clearCookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
     
    });
    return res.json({success: true, msg: "Successfully Logged out"})
  } catch (error) {
    return res.json({success: false, msg: error.message})
  }

}

//continue 1:06:30

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

export { loginUser, registerUser, adminLogin};
