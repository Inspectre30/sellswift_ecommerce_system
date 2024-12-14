import express from "express";
import multer from "multer";
import {
  updateUserProfile,
  getUserProfile,
} from "../controllers/profileController.js";
import profileAuth from "../middleware/profileAuth.js";
import authUser from "../middleware/auth.js";

const profileRouter = express.Router();

// Multer setup for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Temporary storage folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Route to update the user profile
profileRouter.patch("/update",profileAuth,upload.single("avatar"), updateUserProfile);
profileRouter.get("/get-user",authUser, getUserProfile);

export default profileRouter;
//continue 2:22:20