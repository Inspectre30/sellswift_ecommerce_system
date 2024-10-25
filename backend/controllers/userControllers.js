import validator from "validator";
import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};
//Route for user login
const loginUser = async (req, res) => {
    try{
        const{email, password} = req.body;

        const user = await userModel.findOne({email});

        if(!user) {
            return res.json({success:false, message:"User doesn't exists"})
        }

        const isMatch = await bcrypt.compare(password, user.password); 

        if(isMatch) {
            const token = createToken(user._id)
            res.json({success:true, token})
        }
        else{
            res.json({success: false, msg:"Invalid Password"})
        }
    }catch(err) {
            console.log(err); 
            res.json({success: false, msg: err.message})
    }
};
//route for register
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role="customer"} = req.body;
    //checking user already exists or not
    const exist = await userModel.findOne({ email });
    if (exist) {
      return res.json({ success: false, msg: "User already exist" });
    }
    //validating email and strong password

    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        msg: "Please use a valid email address",
      });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        msg: "Please enter a strong password",
      });
    }
    //hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      role,
    });

    const user = await newUser.save();

    const token = createToken(user._id);

    res.json({ success: true, token });
  } catch (err) {
    console.log(err);
    res.json({success: false, message: err.message})
  }
};
//route for seller
const sellerLogin = async (req, res) => {
  
};
///TASK: HOW TO IMPLEMENT THE AUTHENTICATION FOR LOGIN AMONG CUSTOMERS AND SELLERS 6:02:04

export { loginUser, registerUser, sellerLogin };


