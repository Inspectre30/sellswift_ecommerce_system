import express from 'express';
import { loginUser, adminLogin, registerUser,sendVerifyOtp, verifyEmail, logout,isAuthenticated,sendResetOtp,resetPassword} from '../controllers/userControllers.js';
import authUser from '../middleware/auth.js';



const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/admin', adminLogin);
userRouter.post('/logout', logout);
userRouter.post('/send-verify-otp', authUser,sendVerifyOtp);
userRouter.post('/verify-account', authUser,verifyEmail);
userRouter.get('/is-auth', authUser,isAuthenticated);
userRouter.post('/send-reset-otp',sendResetOtp);
userRouter.post('/reset-password',resetPassword);


export default userRouter;

