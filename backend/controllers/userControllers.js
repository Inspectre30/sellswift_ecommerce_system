import validator from "validator";
import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET,{expiresIn: '7d'});
};
//Route for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User doesn't exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = createToken(user._id);

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

    const token = createToken(newUser._id)

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production'
    })

    //continue: 47:28

    // Send verification email
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.ADMIN_EMAIL, // Your email address
        pass: process.env.ADMIN_PASSWORD, // Your email password
      },
    });

    const verificationUrl = `http://sellswift.com/verify-email?token=${verificationToken}`;

    await transporter.sendMail({
      to: email,
      subject: "Verify Your Email",
      html: `<p>Thank you for registering. Click <a href="${verificationUrl}">here</a> to verify your email.</p>`,
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

export { loginUser, registerUser, adminLogin };
