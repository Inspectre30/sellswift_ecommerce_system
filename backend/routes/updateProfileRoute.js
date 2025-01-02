import express from "express";
import multer from "multer";
import {
  updateUserProfile,
  getUserProfile,
} from "../controllers/profileController.js";
import authUser from "../middleware/auth.js";
import upload from "../middleware/multer.js";
const profileRouter = express.Router();

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// const upload = multer({ storage });


profileRouter.put("/profile-update",authUser,upload.single("avatar"), updateUserProfile);
profileRouter.get("/get-user",authUser, getUserProfile);

export default profileRouter;
