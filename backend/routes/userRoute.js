import express from 'express';
import { loginUser, sellerLogin, registerUser} from '../controllers/userControllers.js';


const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/seller', sellerLogin);


export default userRouter;