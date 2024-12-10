import validator from "validator";
import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer"
const createToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET);
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
        

          if (user.role === 'customer') {
              res.json({ success: true, role: 'customer', token });
          } else if (user.role === 'seller') {
              res.json({ success: true, role: 'seller', token });
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
  try {
    const { name, email, password, role = "customer" } = req.body;

    // Check if user already exists
    const exist = await userModel.findOne({ email });
    if (exist) {
      return res.json({ success: false, msg: "User already exists" });
    }

    // Validate email and password
    if (!validator.isEmail(email)) {
      return res.json({ success: false, msg: "Invalid email address" });
    }
    if (password.length < 8) {
      return res.json({ success: false, msg: "Password must be at least 8 characters" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user with `verified` set to false
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      role,
      verified: false,
      verificationToken,
    });

    await newUser.save();

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

    res.json({ success: true, msg: "Registration successful. Please check your email for verification." });
  } catch (err) {
    console.log(err);
    res.json({ success: false, msg: err.message });
  }
};

//route for admins

const adminLogin = async (req, res) => {
  try {
    const {email,password} = req.body 
    
    if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign(email+password, process.env.JWT_SECRET)
      res.json({success:true, token})
    }else{
      res.json({success:false, msg: "Invalid Credentials"})
    }
    
  } catch (err) {
    console.log(err);
    res.json({success: false, message: err.message})
  }
};





export { loginUser, registerUser, adminLogin};


