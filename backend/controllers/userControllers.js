import validator from "validator";
import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = (id) => {
  return jwt.sign({ id}, process.env.JWT_SECRET);
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



///TASK: COPY THE FOLLOWING STYLES BUT CHANGE THE "ADMIN PANEL" TO "SELLER PANEL" And also pay attention on how he fetch data.
//For example fetching based from roles: "Seller"

export { loginUser, registerUser, adminLogin};


