import userModel from "../models/userModel.js";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
import jwt from "jsonwebtoken";

const updateUserProfile = async (req, res) => {
  try {
    console.log("Request body:", req.body);

    const { name, email, phone, address, zipcode, street } = req.body;
    const token = req.cookies.token;

    // Check if token exists
    if (!token) {
      return res.status(400).json({ success: false, message: "Token is required." });
    }

    // Decode the token to extract user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;


    if (!userId) {
      return res.status(400).json({ success: false, message: "Invalid token." });
    }

    let avatarUrl = null;
    // Upload to Cloudinary if a file is provided
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      avatarUrl = result.secure_url; // Get the secure URL of the uploaded image
      console.log(result);

      // Remove the file from local uploads
      fs.unlinkSync(req.file.path);
    }

    // Find and update the user
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      {
        name: name || undefined,
        email: email || undefined,
        phone: phone || undefined,
        address: address || undefined,
        avatar: avatarUrl || undefined, // Set avatar URL from Cloudinary
        zipcode: zipcode || undefined,
        street: street || undefined,
      },
      { new: true, omitUndefined: true } // Return the updated document and ignore undefined values
    );

    // Check if user was found and updated
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        address: updatedUser.address,
        avatar: updatedUser.avatar,
        zipcode: updatedUser.zipcode,
        street: updatedUser.street,
      },
    });
  } catch (error) {
    console.error(error.message);
    if (error.name === "JsonWebTokenError") {
      return res.status(400).json({ success: false, message: "Invalid token." });
    }
    res.status(500).json({ success: false, message: "Profile update failed." });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.body; 
    const user = await userModel.findById(userId); 

    if (!user) {
      return res.json({ success: false, msg: "User not found" });
    }

    res.json({
      success: true,
      userData: {
        name: user.name,
        email: user.email,
        isAccountVerified: user.isAccountVerified,
        phone: user.phone,
        address: user.address,
        street: user.street,
        zipcode: user.zipcode,
      },
    });
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ success: false, msg: "Failed to retrieve user profile." });
  }
};

export { updateUserProfile, getUserProfile };
