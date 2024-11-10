import userModel from "../models/userModel.js";
import fs from "fs";
import path from "path";
import {v2 as cloudinary} from "cloudinary";


// Controller for updating user profile, including avatar upload
 const updateUserProfile = async (req, res) => {
  try {
    // const userId = req.user._id; // Assume req.user.id is set by authentication middleware
    const {userId, name, email, phone, address } = req.body; // Optional fields for user profile update

    // Variable to hold avatar URL
    let avatarUrl = null;

    // Check if an avatar was uploaded
    if (req.file) {
      // Upload the image to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
      avatarUrl = result.secure_url; // Get the secure URL of the uploaded image
      console.log(result)

      // Optionally, delete the local file after uploading to Cloudinary
      fs.unlinkSync(req.file.path);
    }
    console.log(userId)

    // Find and update the user
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      {
        name: name || undefined,
        email: email || undefined,
        phone: phone || undefined,
        address: address || undefined,
        avatar: avatarUrl || undefined, // Set avatar URL from Cloudinary
      },
      { new: true, omitUndefined: true } // Return the updated document and ignore undefined values
    );

    // Check if user was found and updated
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        address: updatedUser.address,
        avatar: updatedUser.avatar,
      },
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, msg: "Profile update failed." });
  }
};
const getUserProfile = async (req, res) => {
  try {
    const {userId }= req.body; // Assuming user ID is set by authentication middleware
    const user = await userModel.findById(userId).select('-password'); // Exclude password field
  
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, msg: "Failed to retrieve user profile." });
  }
};

export { updateUserProfile, getUserProfile }; // Export both functions
//try this and try to fetch from the frontend using axios