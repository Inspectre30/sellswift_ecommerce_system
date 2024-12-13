import express from 'express';
import { loginUser, adminLogin, registerUser,sendVerifyOtp, verifyEmail, logout} from '../controllers/userControllers.js';
import authUser from '../middleware/auth.js';



const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/admin', adminLogin);
userRouter.post('/logout', logout);
userRouter.post('/send-verify-otp', authUser,sendVerifyOtp);
userRouter.post('/verify-account', authUser,verifyEmail);


export default userRouter;

//continue 1:52:11