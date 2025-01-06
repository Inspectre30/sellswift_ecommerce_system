import express from 'express';
import { logout, registerSeller, sellerLogin,isAuthenticated,verifyEmail,sendVerifyOtp,sendResetOtp,resetPassword} from '../controllers/sellerController.js';
import authUser from '../middleware/auth.js';

const sellerRouter = express.Router();

sellerRouter.post('/register',registerSeller);
sellerRouter.post('/login',sellerLogin);
sellerRouter.post('/logout', logout);
sellerRouter.post('/send-verify-otp', authUser,sendVerifyOtp);
sellerRouter.get('/is-auth', authUser,isAuthenticated);
sellerRouter.post('/verify-account', authUser,verifyEmail);
sellerRouter.post('/send-reset-otp',sendResetOtp);
sellerRouter.post('/reset-password',resetPassword);



export default sellerRouter;