import userModel from "../models/userModel.js";
import fs from "fs";
import path from "path";

// Controller for updating user profile, including avatar upload
export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Assume req.user.id is set by authentication middleware
    const { name, email, phone, address } = req.body; // Optional fields for user profile update

    // Retrieve the file path if an avatar was uploaded
    let avatarUrl = null;
    if (req.file) {
      avatarUrl = req.file.path; // Use file path from multer
    }

    // Find and update the user
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      {
        name: name || undefined,
        email: email || undefined,
        phone: phone || undefined,
        address: address || undefined,
        avatar: avatarUrl || undefined,
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
    console.log(error.message)
    res.json({success:false, msg: "Profile update failed." });
  }
};

///check this if this really works