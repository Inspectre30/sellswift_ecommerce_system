import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';

const profileAuth = async (req, res, next) => {
  try {
    const {token} = req.headers // Extract token
    if (!token) {
      return res.status(401).json({ success: false, msg: "No token, authorization denied" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id); // Get user by decoded ID
    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }

    req.user = user; // Attach user to the request object
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, msg: "Server error" });
  }
};

export default profileAuth;