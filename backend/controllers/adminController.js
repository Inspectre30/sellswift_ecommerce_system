import userModel from "../models/userModel.js";

// Function to retrieve all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.json({ success: true, users });
  } catch (error) {
    console.log(error);
    res.json({ success: false, msg: error.message });
  }
};

// Function to remove a user by ID
export const removeUser = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.json({ success: false, msg: "User ID is required" });
    }
    
    await userModel.findByIdAndDelete(userId);
    res.json({ success: true, msg: "User removed successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, msg: error.message });
  }
};
