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
      email,
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
const sellerLogin = async (req,res) => {
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
    } catch (err) {
      console.log(err.message);
      res.json({ success: false, msg: err.message });
    }
}

export { registerSeller,sellerLogin };
