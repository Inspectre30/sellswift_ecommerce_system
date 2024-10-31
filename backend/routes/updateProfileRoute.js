import express from 'express';
import { updateUserProfile } from '../controllers/profileController.js';
import roleAuth from '../middleware/roleAuth.js'

const profileRouter = express.Router();

// Update user profile route
profileRouter.patch('/update', roleAuth('customer'), updateUserProfile); // Adjust role as needed

export default profileRouter;