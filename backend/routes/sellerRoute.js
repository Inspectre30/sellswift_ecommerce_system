import express from 'express';
import { registerSeller, sellerLogin} from '../controllers/sellerController.js';

const sellerRouter = express.Router();

sellerRouter.post('/register',registerSeller);
sellerRouter.post('/login',sellerLogin);


export default sellerRouter;